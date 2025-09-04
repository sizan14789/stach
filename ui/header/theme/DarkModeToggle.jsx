"use client";

import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";

export default function DarkModeToggle() {
  const [localTheme, setLocalTheme] = useState(null);

  useEffect(() => {
    let theme = Cookies.get("theme");
    setLocalTheme(theme);
  }, []);

  const handleToggle = () => {
    let theme = Cookies.get("theme");
    if (theme === "dark") theme = "light";
    else theme = "dark";
    Cookies.set("theme", theme, {
      path: "/",
    });
    setLocalTheme(theme);
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);
  };

  if (localTheme)
    return (
      <div onClick={handleToggle} className="cursor-pointer p-1">
        {localTheme == "dark" ? (
          <CiDark className="text-3xl" />
        ) : (
          <CiLight className="text-3xl" />
        )}
      </div>
    );
}
