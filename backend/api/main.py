from fastapi import FastAPI
from user_api_v1 import router as user_router
from suggestion_api_v1 import router as suggestion_router
from activities_api_v1 import router as activities_router
from extractor_api_v1 import router as extractor_router

app = FastAPI()

# Include the user API
app.include_router(user_router, prefix="/user")

# Include the suggestion API
app.include_router(suggestion_router, prefix="/suggestion")

# Include the activities API
app.include_router(activities_router, prefix="/activities")

# Include the extractor API
app.include_router(extractor_router, prefix="/extractor")

@app.get("/")
async def read_root():
    return {"message": "Welcome to the GenAI Application"}