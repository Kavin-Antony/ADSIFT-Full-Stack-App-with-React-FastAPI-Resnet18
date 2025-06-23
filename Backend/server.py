""" gunicorn -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000 server:app """
""" ngrok http 8000 --domain=goshawk-musical-liger.ngrok-free.app """

from fastapi import FastAPI, HTTPException, Form, Header
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from pymongo import MongoClient
from pymongo.server_api import ServerApi
from urllib.parse import quote_plus
from hashing import PasswordManager
from JWT_manager import JWTManager
from datetime import datetime
import os
import json

# Load environment variables from .env file
from dotenv import load_dotenv
load_dotenv(dotenv_path=".env")

# Password Hasher
hasher = PasswordManager()

# JWT Manager
jwt_manager = JWTManager()

# MongoDB Atlas Connection
username = quote_plus(os.getenv("MONGODB_USERNAME"))
password = quote_plus(os.getenv("MONGODB_PASSWORD"))
cluster = os.getenv("MONGODB_CLUSTER")
uri = f"mongodb+srv://{username}:{password}@{cluster}/?retryWrites=true&w=majority"
client = MongoClient(uri, server_api=ServerApi('1'))
db = client[os.getenv("MONGODB_DB")]
collection = db[os.getenv("MONGODB_COLLECTION")]

# FastAPI App Setup
app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Route: /fm
@app.get("/fm")
def deliver():
    file_path = "output.txt"
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    try:
        with open(file_path, "r") as file:
            data = json.load(file) 
        return data
    except json.JSONDecodeError:
        raise HTTPException(status_code=500, detail="Invalid JSON format in file")


# Route: /signup/
@app.post("/signup/")
def signup(user_email: str = Form(...), user_name: str = Form(...), password: str = Form(...)):
    if collection.find_one({"user_email": user_email}):
        return {"success": False, "message": "User already exists."}

    hashed_password = hasher.hash_password(password)
    collection.insert_one({
        "user_email": user_email,
        "user_name": user_name,
        "password": hashed_password
    })

    return {"success": True, "message": "User registered successfully."}


# Route: /login/
@app.post("/login/")
def login(user_email: str = Form(...), password: str = Form(...)):
    user = collection.find_one({"user_email": user_email})

    if not user or not hasher.verify_password(password, user["password"]):
        return JSONResponse(status_code=401, content={
            "success": False,
            "message": "Incorrect email or password."
        })

    token, expiry = jwt_manager.create_token(user_email)
    
    collection.update_one(
        {"user_email": user_email},
        {"$set": {"jwt": token, "jwt_expiry": expiry}}
    )

    return JSONResponse(content={
        "success": True,
        "message": "Login successful.",
        "token": token
    })

# Route: /jwt_login/
@app.post("/jwt_login/")
def jwt_login(Authorization: str = Form(...)):
    token = Authorization

    try:
        user_email = jwt_manager.verify_token(token)
        user = collection.find_one({"user_email": user_email})

        if not user or user.get("jwt") != token:
            raise HTTPException(status_code=401, detail="Invalid or mismatched token.")

        expiry = user.get("jwt_expiry")
        if not expiry or datetime.utcnow() > expiry:
            raise HTTPException(status_code=401, detail="Token has expired.")

        return {"success": True, "message": "JWT is valid.", "user_email": user_email}

    except ValueError as e:
        raise HTTPException(status_code=401, detail=str(e))



























# otp_store: dict[str, str] = {}

# @app.post("/send-otp/")
# def send_otp(user_id: str):
#     otp = "123456"  
#     otp_store[user_id] = otp
#     print(otp_store)
#     return {"message": "OTP sent successfully."}

# @app.post("/verify-otp/")
# def verify_otp(request: OTPRequest):
#     saved_otp = otp_store.get(request.user_id)
#     if not saved_otp:
#         raise HTTPException(status_code=404, detail="OTP not found or expired")

#     if request.otp != saved_otp:
#         raise HTTPException(status_code=400, detail="Invalid OTP")

#     del otp_store[request.user_id]

#     return {"message": "OTP verified successfully"}



# Entry point for running with Uvicorn
# if __name__ == "__main__":
#     import uvicorn
#     uvicorn.run(app, host="0.0.0.0", port=8000)
