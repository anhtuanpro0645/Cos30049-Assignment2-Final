import { useState, useEffect } from "react";

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("spamurai_history")) || [];
    setHistory(stored);
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-3">Prediction History</h2>
      <p className="text-center mb-5"><strong>Below is the list of your past spam detection results:</strong></p>
      {history.length === 0 ? (
        <p className="text-center text-muted">No history yet.</p>
      ) : (
        <div className="table-responsive">
            <table className="table table-bordered table-striped">
            <thead className="table-dark">
                <tr>
                <th>#</th>
                <th>Message/Email</th>
                <th>Verdict</th>
                <th>Confidence Score</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>
                {history.map((h, i) => (
                <tr key={i}>
                    <td>{i + 1}</td>
                    <td>{h.text.slice(0, 40)}...</td>
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
