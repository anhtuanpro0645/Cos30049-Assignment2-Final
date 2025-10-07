import joblib
import numpy as np

model = joblib.load("../models/TunedLinearSVM.joblib")
vectorizer = joblib.load("../models/vectorizer.joblib")

def predict_email(text: str):
    X = vectorizer.transform([text])
    pred_label = model.predict(X)[0]
    
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(X)[0]
        spam_prob = probs[1] * 100  
    else:
        score = model.decision_function(X)[0]
        spam_prob = 100 / (1 + np.exp(-score))  
    
    label = "SPAM" if pred_label == 1 else "HAM"
    confidence = spam_prob if pred_label == 1 else (100 - spam_prob)
    return label, confidence

if __name__ == "__main__":
    print("Email Spam Detection Demo")
    print("Type your email message below (or 'exit' to quit):\n")

    while True:
        msg = input("Enter an email you want to check: ")
        if msg.lower() == "exit":
            print("Goodbye!")
            break

        label, confidence = predict_email(msg)
        print(f"→ Prediction Score: {label} ({confidence:.2f}% confidence)")
        print("-" * 40)
