from pymongo import MongoClient
from urllib.parse import quote_plus
from pymongo.server_api import ServerApi
import json
import os
from hashing import PasswordManager
from dotenv import load_dotenv
load_dotenv(dotenv_path=".env")
hash = PasswordManager()

username = quote_plus(os.getenv("MONGODB_USERNAME"))
password = quote_plus(os.getenv("MONGODB_PASSWORD"))
cluster = os.getenv("MONGODB_CLUSTER")
uri = f"mongodb+srv://{username}:{password}@{cluster}/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[os.getenv("MONGODB_DB")]
collection = db[os.getenv("MONGODB_COLLECTION")]

# USER_FILE = "users.json"
# with open(USER_FILE, "r") as file:
#     data =  json.load(file)
# for i in data:
#     user_email = i
#     user_name = data[i]['username']
#     password = data[i]['password']
#     hashed_password = hash.hash_password(password)
#     collection.insert_one({"user_email": user_email, "user_name": user_name, "password": hashed_password})

for doc in collection.find():
    print(doc)