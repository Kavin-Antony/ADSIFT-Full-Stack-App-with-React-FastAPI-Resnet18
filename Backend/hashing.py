import bcrypt

class PasswordManager:
    """
    A utility class to hash and verify passwords using bcrypt.
    """
    @staticmethod
    def hash_password(plain_password: str) -> str:
        """
        Hashes a plain-text password using bcrypt and returns the hashed string.
        """
        password_bytes = plain_password.encode('utf-8')
        salt = bcrypt.gensalt()
        hashed = bcrypt.hashpw(password_bytes, salt)
        return hashed.decode('utf-8') 

    @staticmethod
    def verify_password(plain_password: str, hashed_password: str) -> bool:
        """
        Verifies a plain-text password against a hashed password.
        """
        password_bytes = plain_password.encode('utf-8')
        hash_bytes = hashed_password.encode('utf-8')
        return bcrypt.checkpw(password_bytes, hash_bytes)