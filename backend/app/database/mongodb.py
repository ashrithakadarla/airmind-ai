from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGODB_URI = os.getenv("MONGODB_URI")
DATABASE_NAME = os.getenv("DATABASE_NAME")

client = None
database = None


async def connect_to_mongodb():
    global client, database

    client = AsyncIOMotorClient(MONGODB_URI)
    database = client[DATABASE_NAME]

    print("Connected to MongoDB Atlas")


async def close_mongodb_connection():
    global client

    if client:
        client.close()
        print("MongoDB Connection Closed")


def get_database():
    return database