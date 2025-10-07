# Email Spam Detection using Machine Learning

This repository contains the implementation for **Assignment 2**  
of the unit **COS30049(Swinburne University)**.

---

## Assignment 2 Overview

This project focuses on developing a machine learning model to detect spam emails using text-based features.  
The process includes data cleaning, preprocessing, TF-IDF feature extraction, training baseline models,  
hyperparameter optimization, and evaluating multiple models to select the best performer.


## Project Structure
Project/
│
├── data/
│ ├── raw/ # Original datasets
│ └── processed/ # Complete dataset used for training models (Preprocessed_dataset.csv)
│
├── src/
│ ├── Data_process.ipynb # Data Collection, cleanning and Preprocessing - Explore EDA
│ └── Train_models.ipynb # Model training, evaluation, and tuning
│
├── models/
│ ├── TunedLinearSVM.joblib # Final trained model
│ ├── vectorizer.joblib # TF-IDF vectorizer
│ └── final_info.json # Model metadata
│
├── requirements.txt
└── README.md

## Instructions
Step 1: 
1. Ensure Python 3.10+ is installed  
2. Install required libraries:
```bash
pip install -r requirements.txt
```

Step 2:
1. Open src/Data_process.ipynb
2. Run all cells 
3. Output: data/processed/Preprocessed_dataset.csv will be generated automatically

Step 3:
1. Open src/Train_models.ipynb
2. Run all cells sequentially
3. The notebook will:
  - Train baseline and tuned models
  - Display evaluation metrics and visualizations
  - Save final model and TF-IDF vectorizer into the models/ folder

Optional:
If you want to test the trained model interactively:
``` bash 
python src/demo.py
```

