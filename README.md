# 🎧 ADSIFT – Intelligent FM Audio Classifier Web App

ADSIFT is a full-stack application that enables real-time FM audio classification to **detect and skip advertisements** while streaming music. The system combines a deep learning backend with a modern React frontend for seamless user interaction.

## 🌐 Project Overview

- 🎛️ **Frontend (React + Vite)**  
  Interactive web interface to stream FM radio, log in, and view live classification of audio (Music / Advertisement).

- 🧠 **Backend (FastAPI + PyTorch)**  
  Deep learning server using ResNet-18 to classify FM audio in real time, handle authentication, and stream processing.

---

## 📁 Folder Structure
```
ADSIFT/
├── Backend/       # FastAPI server + ResNet18 classifier
│   ├── server.py, model files, etc.
│   └── .env, requirements.txt, record.py, etc.
│
├── Frontend/      # React app for FM interface and UI
│   ├── src/components/, App.jsx, styles/
│   └── vite.config.js, index.html, etc.
│
└── README.md      # Main README (you are here)
```

---

## 🚀 How to Run the Project

### 🔹 1. Backend Setup
👉 [View Backend Installation Setup](./Backend/README.md)

### 🔹 2. Frontend Setup
👉 [View Frontend Installation Setup](./Frontend//README.md)

## ⚙️ Technologies Used

| **Layer**   | **Stack**                              |
|-------------|-----------------------------------------|
| Frontend    | React.js, Vite, CSS Modules             |
| Backend     | FastAPI, PyTorch, Uvicorn, Gunicorn     |
| Audio       | FFmpeg, Librosa                         |
| Model       | ResNet-18 (Binary Classifier)           |
| Database    | MongoDB Atlas (via PyMongo)             |
| Auth        | JWT (python-jose) + bcrypt              |

---

📜 License

This project is licensed under the [MIT License](./LICENSE) © 2025 Kavin Antony
