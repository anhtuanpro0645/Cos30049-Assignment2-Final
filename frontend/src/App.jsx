/*
 * Root Application Component
 * Sets up the application structure with:
 * - Bootstrap styling
 * - React Router navigation
 * - Dark mode toggle
 * - Responsive layout
 * - Main content routing
 */

// Style and Framework imports
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Component imports
import Navbar from "./components/NavigationBar";
import Home from "./pages/Index";
import History from "./pages/History";
import Graphs from "./pages/Graphs";
import Footer from "./components/Footer";
import DarkToggle from "./components/DarkToggle";

// Custom styles
import "./App.css";

// Mount React application to DOM
ReactDOM.createRoot(document.getElementById('root')).render(<App />);

export default function App() {
  return (
    <Router>
      {/* Main app wrapper with flexbox layout */}
      <div className="app-wrapper d-flex flex-column min-vh-100">
        {/* Navigation components */}
        <Navbar />
        <DarkToggle />

        {/* Main content area */}
        <main className="flex-grow-1">
          <div className="content-wrapper">
            {/* Route configuration */}
            <Routes>
              <Route path="/" element={<Home />} />          {/* Landing page */}
              <Route path="/history" element={<History />} /> {/* Prediction history */}
              <Route path="/graphs" element={<Graphs />} />   {/* Analytics dashboard */}
            </Routes>
          </div>
        </main>

        {/* Footer component */}
        <Footer />
      </div>
    </Router>
  );
}