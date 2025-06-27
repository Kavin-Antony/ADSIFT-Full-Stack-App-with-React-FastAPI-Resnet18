# 🎧 ADSIFT Frontend — React Interface for Real-Time Audio Classification

This is the **React.js frontend** for the [ADSIFT Full Stack App](https://github.com/Kavin-Antony/ADSIFT-Full-Stack-App-with-React-FastAPI-Resnet18), an intelligent FM radio web application that classifies audio in real-time using a deep learning backend. It allows users to log in, listen to FM stations, and automatically skip advertisements.

## 🌐 Live Demo 

> 🔗 Frontend: [React Preview](https://kavin-antony.github.io/ADSIFT-Full-Stack-App-with-React-FastAPI-Resnet18/)
>> [Welcome Page](https://kavin-antony.github.io/ADSIFT-Full-Stack-App-with-React-FastAPI-Resnet18/)
>> [Login Page](https://kavin-antony.github.io/ADSIFT-Full-Stack-App-with-React-FastAPI-Resnet18/#/login)
>> [Signup Page](https://kavin-antony.github.io/ADSIFT-Full-Stack-App-with-React-FastAPI-Resnet18/#/signup)
>> [Home Page](https://kavin-antony.github.io/ADSIFT-Full-Stack-App-with-React-FastAPI-Resnet18/#/home-ad)

---

## ⚙️ Features

- 🎛️ Interactive Audio Player (Ad-Skipper & Normal)
- 🔐 JWT-Based User Authentication (Signup/Login)
- 📊 Classification-Aware UI (Music / Advertisement)
- 🧭 Sidebar & Category Filtering
- 🎨 Responsive UI with CSS modules
- ⚡ Powered by Vite for ultra-fast dev experience

---

## 📁 Folder Structure

```bash
Frontend/
│
├── assets/               # App images/icons
├── node_modules/         # Dependencies
├── public/               # Static files (index.html)
├── src/
│   ├── components/       # All JSX UI components
│   │   ├── AudioPlayer.jsx / _AD.jsx
│   │   ├── Home.jsx / _AD.jsx
│   │   ├── Login.jsx, Signup.jsx, Splash.jsx
│   │   ├── Sidebar.jsx, Header.jsx, Categories.jsx
│   ├── styles/           # Component-wise CSS styles
│   ├── App.jsx           # Root component
│   ├── main.jsx          # React entry point
│   └── main.css          # Global styles
│
├── index.html
├── vite.config.js        # Vite dev config
├── eslint.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### 1. 📥 Clone the Repo

```bash
git clone https://github.com/Kavin-Antony/ADSIFT-Full-Stack-App-with-React-FastAPI-Resnet18.git
cd ADSIFT-Full-Stack-App-with-React-FastAPI-Resnet18/Frontend
```

### 2. 📦 Install Dependencies

```bash
npm install
```

### 3. 🔥 Run the App

```bash
npm run dev
```
Access at: http://localhost:5173

---

### 🧪 Pages
#### •	/login – Sign in to your account
#### •	/signup – Register as a new user
#### •	/home – Stream FM with classification without Ad
#### •	/home_ad – Ad-included version
#### •	/splash – Intro screen

---

### ⚒️ Tech Stack

| Area       | Tech Used                        |
|------------|----------------------------------|
| 🧠 Backend | FastAPI, MongoDB, PyTorch        |
| 🎧 Audio   | FFmpeg, Librosa, ResNet18        |
| 🧩 Frontend| React.js, Vite, CSS Modules      |
| 🛡️ Auth    | JWT (python-jose) with bcryt     |
| 🌐 API     | RESTful APIs with CORS support   |

---

### 📄 License

Licensed under the [MIT License](../LICENSE) © 2025 Kavin Antony
