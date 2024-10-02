from fastapi import FastAPI, HTTPException, UploadFile, File, Body, APIRouter
from pydantic import BaseModel, validator
from typing import Dict, List, Any, Optional
from bson import ObjectId
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image
import openai
import io
import logging
import os
from langchain.prompts import PromptTemplate
from langchain.chat_models import ChatOpenAI
from langchain_core.output_parsers.json import JsonOutputParser
from datetime import datetime
from dotenv import load_dotenv
from db_connection import db
import torch  # Ensure PyTorch is imported

load_dotenv()

router = APIRouter()

openai.api_key = os.getenv("OPENAI_API_KEY")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("uvicorn.error")

blip_processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
blip_model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, field=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid ObjectId")
        return ObjectId(v)

class UserInput(BaseModel):
    user_data: Dict[str, Any]

class UserOutput(BaseModel):
    id: str
    user_data: Dict[str, Any]

    class Config:
        json_encoders = {
            ObjectId: str
        }
        populate_by_name = True

def extract_text_from_image(image_bytes):
    try:
        image = Image.open(io.BytesIO(image_bytes)).convert("RGB")
        inputs = blip_processor(image, return_tensors="pt")
        output = blip_model.generate(**inputs)
        caption = blip_processor.decode(output[0], skip_special_tokens=True)
        return caption
    except Exception as e:
        logger.error(f"Error processing image: {e}")
        raise HTTPException(status_code=500, detail="Failed to extract text from image")

def extract_text_from_audio(audio_bytes, content_type):
    try:
        audio_file = io.BytesIO(audio_bytes)
        extension = content_type.split('/')[-1]
        audio_file.name = f"audio_file.{extension}"
        response = openai.Audio.transcribe(
            model="whisper-1",
            file=audio_file,
        )
        return response['text']
    except Exception as e:
        logger.error(f"Error processing audio: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to extract text from audio: {str(e)}")

def get_attributes_from_text(input_text: str):
    template = """From the input {input_text} extract the food items. Give me it as the dictionary with key being food_item which would be output. Don't add any other details other than the key and avoid adding anything Python related."""
    output_parser = JsonOutputParser()
    model = ChatOpenAI(model="gpt-4o", temperature=0.0, request_timeout=720)
    prompt = PromptTemplate.from_template(template)
    prompt = prompt.format(input_text=input_text)
    chain = model | output_parser
    return chain.invoke(prompt)

@router.post("/extract")
async def upload_file(
        file: Optional[UploadFile] = File(None),
        text: Optional[str] = Body(None)
):
    if file:
        file_bytes = await file.read()
        file_type = file.content_type
        logger.info(f"Received file type: {file_type}")

        try:
            if 'image' in file_type:
                extracted_text = extract_text_from_image(file_bytes)
                logger.info(f"Extracted text from image: {extracted_text}")
            elif 'audio' in file_type:
                extracted_text = extract_text_from_audio(file_bytes, file_type)
                logger.info(f"Extracted text from audio: {extracted_text}")
            else:
                raise HTTPException(status_code=400, detail="Unsupported file type")

            attributes = get_attributes_from_text(extracted_text)
            food_item = attributes.get("food_item")

            return {
                "request_suggestion": {
                    "date": datetime.now().strftime("%Y-%m-%d"),
                    "user_request": extracted_text,
                    "food_item": food_item
                }
            }

        except Exception as e:
            logger.error(f"Error processing uploaded file: {e}")
            raise HTTPException(status_code=500, detail="Internal Server Error")

    elif text:
        logger.info(f"Received text input: {text}")
        attributes = get_attributes_from_text(text)
        food_item = attributes.get("food_item")

        return {
            "request_suggestion": {
                "date": datetime.now().strftime("%Y-%m-%d"),
                "user_request": text,
                "food_item": food_item
            }
        }

    else:
        raise HTTPException(status_code=400, detail="Please provide either a file or text input.")