from fastapi import HTTPException, Query
from pydantic import BaseModel, validator
from typing import Dict,List, Any
from bson import ObjectId
import logging
from db_connection import db
from fastapi import APIRouter

router = APIRouter()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

suggestions_collection = db.suggestions

class UnstructuredInput(BaseModel):
    data: Dict[str,Any]

#Validate each key to ensure its length is no longer than 50 characters

    @validator("data")
    def validatordata(cls, value):
        for key, val in value.items():
            if len(key) > 50:
                raise ValueError(f"Key '{key}' is too long, must be 50 characters or less.")

            if isinstance(val, str) and len(val) > 100:
                raise ValueError(f"Value for key '{key}' is too long, must be 100 characters or less.")

            if isinstance(val, (int, float)) and val > 1_000:
                raise ValueError(f"Value for key '{key}' is too large number, must be 1000 or less.")

        return value

# Custom ObjectId validator for Pydantic model
class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v, field=None):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid object ID")
        return ObjectId(v)

class SuggestionsInput(BaseModel):
    user_id: str
    user_suggestions: List[Any]

class SuggestionsOutput(BaseModel):
    # id: PyObjectId
    id: str
    user_id: str
    user_suggestions: List[Any]

    class Config:
        json_encoders = {
            ObjectId: str
        }

@router.post("/add", response_model=SuggestionsOutput)
async def register_user(givenSuggestions: SuggestionsInput):
    old_suggestions = await suggestions_collection.find_one({"user_id": givenSuggestions.user_id})

    if old_suggestions is None:
        await suggestions_collection.insert_one(givenSuggestions)
        new_suggestions = await suggestions_collection.find_one({"user_id": givenSuggestions.user_id})
        return SuggestionsOutput(id=str(new_suggestions["_id"]), user_id=new_suggestions["user_id"], user_suggestions=new_suggestions["user_suggestions"])

    if len(old_suggestions["user_suggestions"]) + len(givenSuggestions.user_suggestions) > 7:
        excess = len(old_suggestions["user_suggestions"]) + len(givenSuggestions.user_suggestions) - 7
        old_suggestions["user_suggestions"] = old_suggestions["user_suggestions"][excess:]

    old_suggestions["user_suggestions"].extend(givenSuggestions.user_suggestions)
    await suggestions_collection.update_one({"user_id": old_suggestions["user_id"]}, {"$set": {"user_suggestions": old_suggestions["user_suggestions"]}})

    return SuggestionsOutput(id=str(old_suggestions["_id"]), user_id=old_suggestions["user_id"], user_suggestions=old_suggestions["user_suggestions"])


@router.get("/get-all/", response_model=SuggestionsOutput)
async def get_suggestions_by_user_id(user_id: str = Query(...)):
    user_suggestions = await suggestions_collection.find_one({"user_id": user_id})

    if user_suggestions is None:
        logger.info(f"Suggestions not found for user ID: {user_id}")
        raise HTTPException(status_code=404, detail="Suggestions not found")

    return SuggestionsOutput(id=str(user_suggestions["_id"]), user_id=user_suggestions["user_id"], user_suggestions=user_suggestions["user_suggestions"])


@router.delete("/delete/", response_model=SuggestionsOutput)
async def delete_suggestions_by_user_id(user_id: str = Query(...)):
    user_suggestions = await suggestions_collection.find_one({"user_id": user_id})

    if user_suggestions is None:
        logger.info(f"Suggestions not found for user ID: {user_id}")
        raise HTTPException(status_code=404, detail="Suggestions not found")

    await suggestions_collection.delete_one({"user_id": user_id})
    return SuggestionsOutput(id=str(user_suggestions["_id"]), user_id=user_suggestions["user_id"], user_suggestions=user_suggestions["user_suggestions"])


