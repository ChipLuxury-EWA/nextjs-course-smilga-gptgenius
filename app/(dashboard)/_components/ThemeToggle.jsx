"use client";
import { useState } from "react";
import { BsMoonFill, BsSunFill } from "react-icons/bs";

const themes = { garden: "garden", synthwave: "synthwave" };
const buttonIconClass = "h-4 w-4";
const ThemeToggle = () => {
  const [theme, setTheme] = useState(themes.synthwave);
  const toggleTheme = () => {
    const newTheme = theme === themes.garden ? themes.synthwave : themes.garden;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };

  return (
    <button className="btn btn-outline btn-sm" onClick={toggleTheme}>
      {theme === themes.synthwave ? <BsSunFill className={buttonIconClass} /> : <BsMoonFill className={buttonIconClass} />}
    </button>
  );
};
export default ThemeToggle;
