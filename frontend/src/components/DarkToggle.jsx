/*https://medium.com/lets-make-something-up/creating-light-dark-mode-on-a-react-app-with-context-589a5465f639*/
/*Icon links: https://pngtree.com/element/down?id=OTAzMDA0Mw==&type=1&time=1760862792&token=ZGI4ZDI0YjZjZTljNTQzZjUyNDYyMjFjM2VjMjZiNjg=&t=0 */

/*
 * Dark/Light Theme Toggle Component
 * Handles theme switching and persists user preference in localStorage
 * Uses CSS classes to apply theme styles to the document body
 */

import { useState, useEffect } from "react";
import lightSwitch from "../assets/Light-mode.png";
import darkSwitch from "../assets/Dark-mode.png";

export default function ThemeToggle() {
  // Track current theme state (dark: true/false)
  const [dark, setDark] = useState(false);

  // On component mount, check localStorage for saved theme preference
  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    if (saved === "true") {
      document.body.classList.add("dark-mode");
      setDark(true);
    }
  }, []); // Empty dependency array means this runs once on mount

  // Handle theme toggle button clicks
  const toggleTheme = () => {
    const newMode = !dark;
    setDark(newMode);
    // Apply or remove dark mode class and save preference
    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "false");
    }
  };

  // Render toggle button with theme icon (Reference Link above)
  return (
    <button
      className="theme-toggle border-0 bg-transparent p-0"
      onClick={toggleTheme}
      aria-label="Toggle theme" // Accessibility label for screen readers
    >
      <img
        src={dark ? darkSwitch : lightSwitch} // Show different icon based on theme
        alt="Theme switch"
        className="theme-switch-img"
      />
    </button>
  );
}


