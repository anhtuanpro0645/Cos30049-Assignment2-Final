export default function ResultCard({ result }) {
  const isSpam = result.prediction === "Spam";
  const color = isSpam ? "bg-danger-subtle" : "bg-success-subtle";

  return (
    <div className={`card mt-5 mx-auto w-75 shadow-sm ${color}`}>
      <div className="card-body text-center">
        <h3 className="card-title fw-bold">
          {isSpam ? "Spam Detected!" : "Safe Message"}
        </h3>
        <p className="card-text">
          Confidence Score: {(result.score * 100).toFixed(1)}%
        </p>
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
