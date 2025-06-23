from jose import jwt, JWTError
from datetime import datetime, timedelta
import os
from dotenv import load_dotenv

# Load .env file
load_dotenv(dotenv_path=".env")

class JWTManager:
    def __init__(self):
        self.secret = os.getenv("JWT_SECRET", "mysecret")
        self.algorithm = os.getenv("JWT_ALGORITHM", "HS256")
        self.expire_minutes = int(os.getenv("JWT_EXPIRY_MINUTES", "30"))

    def create_token(self, user_email: str):
        expire = datetime.utcnow() + timedelta(minutes=self.expire_minutes)
        payload = {
            "sub": user_email,
            "exp": expire
        }
        token = jwt.encode(payload, self.secret, algorithm=self.algorithm)
        return token, expire

    def verify_token(self, token: str):
        try:
            payload = jwt.decode(token, self.secret, algorithms=[self.algorithm])
            user_email = payload.get("sub")
            if not user_email:
                raise ValueError("Invalid token payload.")

            exp = payload.get("exp")
            if exp and datetime.utcnow() > datetime.utcfromtimestamp(exp):
                raise ValueError("Token has expired.")

            return user_email
        except JWTError:
            raise ValueError("Invalid token.")