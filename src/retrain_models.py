import pandas as pd
import joblib
import os
from sklearn.svm import LinearSVC
from sklearn.calibration import CalibratedClassifierCV
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, f1_score, classification_report

df = pd.read_csv("../data/processed/Preprocessed_dataset.csv")
X = df["text"]
y = df["spam"]

vectorizer = joblib.load("../models/vectorizer.joblib")

X_vec = vectorizer.transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_vec, y, test_size=0.2, random_state=42, stratify=y
)

base_svm = LinearSVC(random_state=42)
calibrated_svm = CalibratedClassifierCV(base_svm, cv=5)
calibrated_svm.fit(X_train, y_train)

y_pred = calibrated_svm.predict(X_test)
print("Accuracy:", accuracy_score(y_test, y_pred))
print("F1-score:", f1_score(y_test, y_pred))
print(classification_report(y_test, y_pred))

save_path = os.path.join("..", "models", "CalibratedSVM.joblib")
os.makedirs(os.path.dirname(save_path), exist_ok=True)
joblib.dump(calibrated_svm, save_path)
print(f"✅ Model saved at {save_path}")