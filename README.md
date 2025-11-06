# Spamurai — Spam Detection Web App using Machine Learning
**COS30049 — Full-Stack Web Development for AI Application in Cybersecurity Scenarios**
Developed by Group 5 — Session 10

Spamurai is a web-based tool that predicts whether a given email or text message is Spam or Ham using a TF-IDF + CalibratedSVM.
The system demonstrates the integration of AI, backend, and frontend using FastAPI and React.js, with interactive data visualization and responsive UI/UX design.

---

## Assignment 3 Overview
Spamurai allows users to input any message or email, sends it to a FastAPI server that loads a new trained model (CalibratedSVM),
and returns a prediction along with confidence.
The results are displayed dynamically on the web interface built with React.js, featuring interactive charts, dark/light mode, and prediction history tracking.

## System Architecture
Frontend (React.js) ──▶ FastAPI Backend ──▶ Machine Learning Model (SVM)
        ▲                                          │
        │                                          ▼
   Chart.js + localStorage          Pretrained TF-IDF + CalibratedSVM.joblib
- Frontend (React.js + Chart.js + Bootstrap)
  - Provides UI for user input, prediction, and visualization
  - Includes dark/light theme and localStorage for prediction history
- Backend (FastAPI)
  - Manages RESTful API requests
  - Loads pre-trained model and vectorizer
  - Handles input validation, preprocessing, and prediction
- Machine Learning Model

## Project Structure
```
Project/
├── backend/
│ └── router/
│     ├── __init__.py
│     ├── info.py
│     └── predict.py
│
│ └── schemas/
│     ├── __init__.py
│     └── request_response.py
│
│ └── utils/
│     ├── __init__.py
│     └── preprocess.py
│
│ └── main.py
│ └── requirements.txt
│
├── frontend/
│ ├── pulic/ 
│ └── src/
│     └── api/
│         └── api.js
│
│     └── assets/
│         ├── Dark-mode.png
│         ├── Data_security_24.jpg
│         ├── Data_security_24.png
│         ├── Light-mode.png
│         ├── logo.png
│         └── react.svg
│ 
│     └── components/
│         ├── DarkToggle.jsx
│         ├── Footer.jsx
│         ├── NavigationBar.css
│         ├── NavigationBar.jsx
│         └── ResultCard.jsx
│   
│     └── pages/
│         ├── Graphs.jsx
│         ├── History.jsx
│         └── Index.jsx
│ 
│     ├── App.css
│     ├── App.jsx
│     ├── index.css
│     └── index.html
│
├── data/
│ ├── raw/ # Original datasets
│ └── processed/ # Complete dataset used for training models (Preprocessed_dataset.csv)
│
├── src/
│ ├── Data_process.ipynb # Data Collection, cleanning and Preprocessing - Explore EDA
│ └── Train_models.ipynb # Model training, evaluation, and tuning
│ └── demo.py # Demo to test models 
│
├── models/
│ ├── TunedLinearSVM.joblib # Final trained model
│ ├── vectorizer.joblib # TF-IDF vectorizer
│ └── final_info.json # Model metadata
│
├── requirements.txt
└── README.md
```
## Instructions

### Step 1 — Setup Environment
1. cd backend
2. Create and activate a virtual environment:
   ```bash
   python -m venv venv
   venv\Scripts\activate        # On Windows
   # or
   source venv/bin/activate     # On macOS/Linux
   ```
3. Install required dependencies:
  ```bash
  pip install -r requirements.txt
  ```
4. Start FastAPI server:
  ```bash
  uvicorn main:app --reload
  ```
5. Open your browser and go to:
  ```bash
  http://127.0.0.1:8000/docs
  ```
### Step 2:
1. Start new terminatal (Use Ctrl + Shift + ` or click "+")
2. Move to frontend directory:
  ```bash
  cd frontend
  ```
3. Install required packages
  ```bash
  npm install
  ```
4. Start the React app:
  ```bash
  npm run dev
  ```
5. Open your browser:
  ```bash
  http://localhost:5173
  
  ```

## Frontend - Key Features:
- Built using React.js + Vite
- Data visualization using Chart.js
- Responsive UI with Bootstrap 5
- Custom dark/light mode theme
- Fully modularized (components, pages, assets separated)

## Backend Features
- Built using FastAPI
- Organized with routers, schemas, and utilities
- Loads model and vectorizer with joblib
- Implements Pydantic validation for request/response
- Handles text preprocessing (lowercase, punctuation removal, etc.)
- Returns JSON response with prediction and confidence

Ensure the models directory is in the correct relative path (../models) so FastAPI can locate the CalibratedSVM.joblib and vectorizer.joblib

## Developed by - Group 5 - Session 10
| Name                 | Student ID |
| -------------------- | ---------- |
| Ngoc Anh Tuan Nguyen | 104814399  |
| Hung Cao Phan        | 104996307  |
| Tien Dat Nguyen      | 104473172  |


## Image Resources:
https://www.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_12953623.htm#fromView=keyword&page=1&position=0&uuid=b41c9a52-7c87-45c9-952b-15c53d9ea526&query=Cyber+attacks+png 

https://www.onlinewebfonts.com/icon/59405

https://medium.com/lets-make-something-up/creating-light-dark-mode-on-a-react-app-with-context-589a5465f639
Icon links: https://pngtree.com/element/down?id=OTAzMDA0Mw==&type=1&time=1760862792&token=ZGI4ZDI0YjZjZTljNTQzZjUyNDYyMjFjM2VjMjZiNjg=&t=0 

https://www.onlinewebfonts.com/icon/59405

