import { Link, useLocation } from "react-router-dom";
import "./NavigationBar.css";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm sticky-top w-100">
      <div className="container-fluid justify-content-center flex-column">
        {/* === Brand (Logo + Title) === */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center justify-content-center mb-2"
          to="/"
        >
          <img
            src="/src/assets/logo.png"
            /* Logo by https://www.onlinewebfonts.com/icon/59405 */
            alt="Spamurai logo"
            className="img-fluid me-2"
            style={{ maxWidth: "55px", height: "auto" }}
          />
          <span className="brand-title">Spamurai</span>
        </Link>

        {/* === Mobile toggle === */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* === Nav Links === */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav custom-nav">
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
                to="/"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
                to="/history"
              >
                History
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className={`nav-link ${location.pathname === "/graphs" ? "active" : ""}`}
                to="/graphs"
              >
                Graphs
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
