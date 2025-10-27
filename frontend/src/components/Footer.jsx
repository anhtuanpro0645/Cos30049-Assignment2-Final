/*
 * Footer Component
 * Displays copyright information and team member credits
 * Used at the bottom of every page in the application
 */

export default function Footer() {
  // Render footer with copyright info and team credits
  return (
    <footer className="app-footer py-3 mt-auto">
      <small>
        © 2025 | All rights reserved <br />
        <strong>Group 5 - Session 10</strong> <br />
        Ngoc Anh Tuan Nguyen — Student ID: 104814399 <br />
        Hung Cao Phan — Student ID: 104996307 <br />
        Tien Dat Nguyen — Student ID: 104473172 <br />
        <em>Assignment 3 — Spamurai: Spam Detection Website with Trained ML Model</em>
      </small>
    </footer>
  );
}

