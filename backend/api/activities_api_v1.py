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

activities_collection = db.activities

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

class ActivitiesInput(BaseModel):
    user_id: str
    user_activities: List[Any]

class ActivitiesOutput(BaseModel):
    # id: PyObjectId
    id: str
    user_id: str
    user_activities: List[Any]

    class Config:
        json_encoders = {
            ObjectId: str
        }

@router.post("/add", response_model=ActivitiesOutput)
async def register_user(givenActivities: ActivitiesInput):
    old_activities = await activities_collection.find_one({"user_id": givenActivities.user_id})

    if old_activities is None:
        await activities_collection.insert_one(givenActivities)
        new_activities = await activities_collection.find_one({"user_id": givenActivities.user_id})
        return ActivitiesOutput(id=str(new_activities["_id"]), user_id=new_activities["user_id"], user_activities=new_activities["user_activities"])

    if len(old_activities["user_activities"]) + len(givenActivities.user_activities) > 7:
        excess = len(old_activities["user_activities"]) + len(givenActivities.user_activities) - 7
        old_activities["user_activities"] = old_activities["user_activities"][excess:]

    old_activities["user_activities"].extend(givenActivities.user_activities)
    await activities_collection.update_one({"user_id": old_activities["user_id"]}, {"$set": {"user_activities": old_activities["user_activities"]}})

    return ActivitiesOutput(id=str(old_activities["_id"]), user_id=old_activities["user_id"], user_activities=old_activities["user_activities"])


@router.get("/get-all/", response_model=ActivitiesOutput)
async def get_activities_by_user_id(user_id: str = Query(...)):
    user_activities = await activities_collection.find_one({"user_id": user_id})

    if user_activities is None:
        logger.info(f"Activities not found for user ID: {user_id}")
        raise HTTPException(status_code=404, detail="Activities not found")

    return ActivitiesOutput(id=str(user_activities["_id"]), user_id=user_activities["user_id"], user_activities=user_activities["user_activities"])


@router.delete("/delete/", response_model=ActivitiesOutput)
async def delete_activities_by_user_id(user_id: str = Query(...)):
    user_activities = await activities_collection.find_one({"user_id": user_id})

    if user_activities is None:
        logger.info(f"Activities not found for user ID: {user_id}")
        raise HTTPException(status_code=404, detail="Activities not found")

    await activities_collection.delete_one({"user_id": user_id})
    return ActivitiesOutput(id=str(user_activities["_id"]), user_id=user_activities["user_id"], user_activities=user_activities["user_activities"])


