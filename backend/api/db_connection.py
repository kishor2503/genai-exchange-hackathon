from motor.motor_asyncio import AsyncIOMotorClient

#Mongodb Connections
client = AsyncIOMotorClient("mongodb://localhost:27017")
db = client.health