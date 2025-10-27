/*
 * History Component
 * Displays a table of past spam detection results
 * Features:
 * - Loads prediction history from localStorage
 * - Shows message previews, predictions, confidence scores, and dates
 * - Responsive table layout
 */

import { useState, useEffect } from "react";

export default function History() {
  // State to store prediction history
  const [history, setHistory] = useState([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("spamurai_history")) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Prediction History</h2>
      <p className="text-center mb-5">
        <strong>Below is the list of your past spam detection results:</strong>
      </p>

      {/* Conditional rendering based on history existence */}
      {history.length === 0 ? (
        <p className="text-center text-muted">No history yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            {/* Table Header */}
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Message/Email</th>
                <th>Verdict</th>
                <th>Confidence Score</th>
                <th>Date</th>
              </tr>
            </thead>

            {/* Table Body - Map through history entries */}
            <tbody>
              {history.map((h, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{h.text.slice(0, 40)}...</td> {/* Show first 40 chars */}
                  <td>{h.prediction}</td>
                  <td>{(h.score * 100).toFixed(1)}%</td>
                  <td>{h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
