/*
 * Home/Index Component
 * Main landing page for spam detection application
 * Features:
 * - Text input for messages/emails
 * - Spam detection with ML backend
 * - History tracking in localStorage
 * - Loading states and error handling
 */

import { useState } from "react";
import { predictSpam } from "../api/api";
import ResultCard from "../components/ResultCard";

export default function Home() {
  // State management
  const [text, setText] = useState("");           // Input text
  const [result, setResult] = useState(null);     // Prediction result
  const [loading, setLoading] = useState(false);  // Loading state

  // Handle spam prediction
  const handlePredict = async () => {
    // Validate input
    if (!text.trim()) return alert("Please enter a message or email that you want to scan!");

    setLoading(true);
    try {
      // Call API for prediction
      const res = await predictSpam(text);
      setResult(res);

      // Save prediction to local history
      const newItem = {
        text,
        prediction: res.prediction,
        score: res.score,
        date: new Date().toLocaleString(),
      };
      const old = JSON.parse(localStorage.getItem("spamurai_history")) || [];
      localStorage.setItem("spamurai_history", JSON.stringify([...old, newItem]));
    } catch (err) {
      alert("Server error, check backend!");
    } finally {
      setLoading(false);
    }
  };

    return (
    <div className="container-fluid text-center mt-5 pt-5 pb-5 px-3">
        <div className="content-wrapper mx-auto">
        {/* Home Image */}
        <img
            src="/src/assets/Data_security_24.png" 
            /*https://www.freepik.com/free-vector/global-data-security-personal-data-security-cyber-data-security-online-concept-illustration-internet-security-information-privacy-protection_12953623.htm#fromView=keyword&page=1&position=0&uuid=b41c9a52-7c87-45c9-952b-15c53d9ea526&query=Cyber+attacks+png */
            alt="Spamurai illustration"
            className="img-fluid mb-3"
            style={{
            maxWidth: "500px",
            width: "100%",
            height: "auto",
            }}
        />

        {/* Page Title */}
        <h1 className="fw-bold mb-3">Spamurai - Website to Detect Spam</h1>

        {/* Introduction Text */}      
        <div className="intro-text mb-3">
            <p className="text-muted">
            Welcome to Spamurai Website. This tool helps you detect spam messages/emails using machine learning.
            </p>
            <p className="text-muted">
            Paste your email or message content below for spam detection.
            </p>
        </div>

        {/* Input Area */}    
        <div className="input-area">
            <textarea
            className="form-control mx-auto"
            rows="5"
            placeholder="Paste your email / messages you want to scan here..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            />
        </div>

        {/* Scan Button */}      
        <button
            onClick={handlePredict}
            className="btn btn-dark mt-3 px-4"
            disabled={loading}
        >
            {loading ? "Scanning..." : "Scan for Spam"}
        </button>

        {/* Result Display */}      
        {result && <ResultCard result={result} />}

        {/* Disclaimer */}    
        <p className="text-muted small mt-5 mb-0">
            Disclaimer: This tool cannot guarantee 100% accurate spam/ham detection.
            Please double-check your messages/emails for safety.
        </p>
        </div>
    </div>
    );


}
