/*https://medium.com/lets-make-something-up/creating-light-dark-mode-on-a-react-app-with-context-589a5465f639*/
/*Icon links: https://pngtree.com/element/down?id=OTAzMDA0Mw==&type=1&time=1760862792&token=ZGI4ZDI0YjZjZTljNTQzZjUyNDYyMjFjM2VjMjZiNjg=&t=0 */
import { useState, useEffect } from "react";
import lightSwitch from "../assets/Light-mode.png";
import darkSwitch from "../assets/Dark-mode.png";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("dark-mode");
    if (saved === "true") {
      document.body.classList.add("dark-mode");
      setDark(true);
    }
  }, []);

  const toggleTheme = () => {
    const newMode = !dark;
    setDark(newMode);

    if (newMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("dark-mode", "true");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("dark-mode", "false");
    }
  };

  return (
    <button
      className="theme-toggle border-0 bg-transparent p-0"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <img
        src={dark ? darkSwitch : lightSwitch}
        alt="Theme switch"
        className="theme-switch-img"
      />
    </button>
  );
}


