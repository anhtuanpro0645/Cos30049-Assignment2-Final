/*
 * Result Card Component
 * Displays the spam detection result with visual feedback
 * Features:
 * - Color-coded background based on result (red for spam, green for safe)
 * - Confidence score display
 * - Quick scan again button
 */

export default function ResultCard({ result }) {
  // Determine if message is spam and set appropriate styling
  const isSpam = result.prediction === "Spam";
  const color = isSpam ? "bg-danger-subtle" : "bg-success-subtle";

  return (
    <div className={`card mt-5 mx-auto w-75 shadow-sm ${color}`}>
      <div className="card-body text-center">
        {/* Display result header */}
        <h3 className="card-title fw-bold">
          {isSpam ? "Spam Detected!" : "Safe Message"}
        </h3>
        {/* Show confidence score as percentage */}
        <p className="card-text">
          Confidence Score: {(result.score * 100).toFixed(1)}%
        </p>
        {/* Reset button to start new scan */}
        <button
          onClick={() => window.location.reload()}
          className="btn btn-outline-dark mt-3"
        >
          Scan again
        </button>
      </div>
    </div>
  );
}
