from fastapi import HTTPException
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

users_collection = db.users

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

class UserInput(BaseModel):
    user_data: Dict[str, Any]


class UserOutput(BaseModel):
    # id: PyObjectId
    id: str
    user_data: Dict[str, Any]

    class Config:
        json_encoders = {
            ObjectId: str
        }

@router.post("/add", response_model=UserOutput)
async def register_user(user: UserInput):
    # Insert user data into MongoDB with two fields: _id and user_data
    user_doc = {"user_data": user.user_data}
    result = await users_collection.insert_one(user_doc)
    new_user = await users_collection.find_one({"_id": result.inserted_id})

    # Return the newly created user with the MongoDB ID
    return UserOutput(id=str(new_user["_id"]), user_data=new_user["user_data"])

@router.get("/get/{user_id}", response_model=UserOutput)
async def get_user(user_id: str):
    try:
        object_id = ObjectId(user_id)
    except Exception as e:
        logger.error(f"Invalid ObjectId format for user_id: {user_id}, Error: {e}")
        raise HTTPException(status_code=400, detail="Invalid ObjectId format")

    user = await users_collection.find_one({"_id": object_id})
    if user is None:
        logger.info(f"User not found for ID: {user_id}")
        raise HTTPException(status_code=404, detail="User not found")

    return UserOutput(id=str(user["_id"]), user_data=user["user_data"])

@router.get("/get-all/", response_model=List[UserOutput])
async def get_all_users_v1():
    try:
        users = await users_collection.find().to_list(length=None)  # Fetch all users
        return [UserOutput(id=str(user["_id"]), user_data=user["user_data"]) for user in users]
    except Exception as e:
        logger.error(f"Error fetching all users: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


