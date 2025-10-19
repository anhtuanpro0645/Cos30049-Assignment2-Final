import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/NavigationBar";
import Home from "./pages/Index";
import History from "./pages/History";
import Graphs from "./pages/Graphs";
import Footer from "./components/Footer";
import DarkToggle from "./components/DarkToggle";
import "./App.css";


ReactDOM.createRoot(document.getElementById('root')).render(<App />);


export default function App() {
  return (
    <Router>
      <div className="app-wrapper d-flex flex-column min-vh-100">
        <Navbar />
        <DarkToggle />
        <main className="flex-grow-1">
          <div className="content-wrapper">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/history" element={<History />} />
              <Route path="/graphs" element={<Graphs />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

