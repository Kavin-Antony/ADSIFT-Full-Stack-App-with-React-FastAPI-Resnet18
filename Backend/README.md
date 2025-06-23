# 🎧 ADSIFT Server: Intelligent Audio Classifier Backend

This is the **backend server** of the ADSIFT system — an intelligent audio classifier that enables seamless FM radio listening by automatically detecting and skipping advertisements in real time. Built using **FastAPI**, this backend uses a **ResNet-18** deep learning model for accurate, real-time audio classification.

## 🚀 Features

- 🎵 Real-time classification of FM audio (Music / Advertisement)
- 📡 FM stream analysis and auto-switching logic
- 🔐 Secure login/signup with password hashing and JWT authentication
- 🔄 REST API interface for frontend integration
- 🚀 Production-ready with Gunicorn, Uvicorn, and Ngrok

## 📂 Backend Project Structure Overview

Backend/
├── pycache/                     # Auto-generated Python bytecode files
├── macos/                           # Python virtual environment folder (named “macos”)
├── Recordings/                      # Directory to store recorded FM audio files
├── .env                             # Environment variables (JWT secret, MongoDB credentials, etc.)
├── hashing.py                       # Utility for hashing and verifying passwords using bcrypt
├── JWT_manager.py                   # JWT token generation and validation logic
├── main.py                          # (Optional) Main script for testing or launching components
├── mel_spectrogram_conversion.py    # Converts audio to mel spectrograms for model input
├── Mongo_DB Testing.py              # Script for testing MongoDB connections and queries
├── output.txt                       # Stores output data (e.g., FM classification results)
├── prediction.py                    # Loads and uses the ResNet18 model to classify spectrograms
├── README.md                        # Project documentation file (you are currently reading this 😉)
├── record.py                        # Records 5-second audio chunks for classification
├── requirements.txt                 # Python dependencies needed to run the project
├── resnet18_audio_classification.py # ResNet-18 model definition and training utilities
├── server.py                        # FastAPI server with routes for signup, login, FM analysis, etc.

## 🧰 Libraries & Frameworks Used

The ADSIFT backend uses a variety of powerful libraries for deep learning, audio processing, web backend development, and database interaction.

### 🔢 Core Libraries
| Library        | Purpose                                 |
|----------------|------------------------------------------|
| `numpy`        | Numerical operations and array handling  |
| `matplotlib`   | Visualizing mel spectrograms and results |
| `torch`        | Core PyTorch deep learning framework     |
| `torchvision`  | Includes ResNet and image transforms     |

### 🎧 Audio Processing
| Library     | Purpose                                              |
|-------------|-------------------------------------------------------|
| `librosa`   | Audio feature extraction (e.g., mel spectrograms)     |
| `ffmpeg`    | Audio stream conversion, slicing, and format handling |

> ℹ️ Note: `ffmpeg` is a system dependency and must be [installed separately](https://ffmpeg.org/download.html) on your machine.

### ⚡ Web Server & API (FastAPI)
| Library       | Purpose                                   |
|---------------|--------------------------------------------|
| `fastapi`     | Fast and modern API framework              |
| `uvicorn`     | ASGI server for development                |
| `gunicorn`    | Production-grade WSGI/ASGI server          |

### 🌐 Web Support & Networking
| Library           | Purpose                                |
|-------------------|-----------------------------------------|
| `aiofiles`        | Async file handling (used by FastAPI)   |
| `python-multipart`| Form-data parsing in FastAPI            |
| `httpx`           | HTTP client for async requests          |
| `requests`        | Standard HTTP requests (sync)           |

### 🔐 Authentication & Security
| Library    | Purpose                                |
|------------|-----------------------------------------|
| `bcrypt`   | Secure password hashing and checking    |
| `python-jose` | JWT creation and verification         |

### ☁️ Database - MongoDB
| Library            | Purpose                                       |
|--------------------|-----------------------------------------------|
| `pymongo`          | Python driver to interact with MongoDB        |
| `pymongo[srv]`     | Enables MongoDB Atlas SRV URI connections     |
| `pymongo.server_api` | Enables MongoDB Server API versioning       |

### ⚙️ Environment Management
| Library         | Purpose                                        |
|-----------------|------------------------------------------------|
| `python-dotenv` | Load environment variables from `.env` file    |

All dependencies are listed in [`requirements.txt`](./requirements.txt).  
Run `pip install -r requirements.txt` after activating your virtual environment to install them.

## ⚙️ Setup Instructions

### 🛠️ 0. FFmpeg Installation (Required for Audio Processing)

ADSIFT uses FFmpeg for slicing, converting, and handling audio streams (e.g., for generating mel-spectrograms in real-time).

#### 📦 Install FFmpeg on your system:

##### 🔹 macOS (using Homebrew)
```bash
brew install ffmpeg
```

##### 🔹 Ubuntu / Debian
```bash
sudo apt update
sudo apt install ffmpeg
```

##### 🔹 Windows
1.	Download FFmpeg from the official website: https://ffmpeg.org/download.html
2.	Extract and add the bin/ folder path to your system’s Environment Variables → Path.
3.	Verify installation:
```bash
ffmpeg -version
```

### 📦 1. Create and Activate a Virtual Environment

```bash
python3 -m venv venv
source venv/bin/activate      # Mac/Linux
# OR
venv\Scripts\activate         # Windows
```

### 📥 2. Install Dependencies

```bash
pip install -r requirements.txt
```

### 🍃 3. MongoDB Atlas Setup (For Beginners)
	1.	Go to https://www.mongodb.com/cloud/atlas
	2.	Create an account and select Free Shared Cluster
	3.	Create a new cluster
	4.	Go to Database Access → Add a new database user
	5.	Under Network Access, allow IP 0.0.0.0/0 (for development)
	6.	Get your connection string:
		mongodb+srv://<user>:<password>@<cluster>/?retryWrites=true&w=majority
	7.	Replace <user>, <password>, and <cluster> in .env accordingly

### 🔐 .4 Add and Configure Environment Variables

Create a .env file inside the backend folder:
```bash
# .env
JWT_SECRET=myverysecurekey
JWT_ALGORITHM=HS256
JWT_EXPIRY_MINUTES=30

MONGODB_USER=your_username
MONGODB_PASSWORD=your_password
MONGODB_CLUSTER=cluster_name
MONGODB_DB=db_name
MONGODB_COLLECTION=collection_name
```

### 🧠 5. Run the Server
Using Gunicorn + Uvicorn:
```bash
gunicorn -k uvicorn.workers.UvicornWorker -w 4 -b 0.0.0.0:8000 server:app
```

### 🌐 6. Expose Backend with Ngrok
```bash
ngrok http 8000 --domain=your_domain_name
(Replace your_domain_name with the actual domain name from Ngrok or other providers)

Once started, your server will be accessible at:
https://your_domain_name
```

### 🧠 7. Model File: resnet18_ad_classifier.pth

This file contains the trained weights of a ResNet-18 model for classifying FM audio into:
	•	🎵 Music
	•	📢 Advertisement

The model uses mel-spectrograms as input and is trained for binary classification.

📥 https://drive.google.com/file/d/1cLq90s1vhNtHhbLI_iTmKjiqzamzo1TD/view?usp=share_link

Make sure this file is in the correct path as used in your backend Folder.

### 📬 8. API Usage

After starting the server and exposing with Ngrok, access interactive documentation at:
https://your_domain_name/docs
(eg.)https://goshawk-musical-liger.ngrok-free.app/docs

Use REST clients like Postman, browser fetch(), or requests in Python to interact with endpoints like:
	•	POST /signup/
	•	POST /login/
	•	POST /jwt_login/
	•	GET /fm

📄 License
This project is licensed under the MIT License © 2025 Kavin Antony.