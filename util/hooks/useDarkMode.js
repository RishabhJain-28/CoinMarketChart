import { useState, useEffect } from "react";
import { useCookieState } from "use-cookie-state";

export default function useDarkMode() {
  const [check, setCheck] = useState(false);
  const [darkMode, setDarkMode] = useCookieState("darkMode", false);
  useEffect(() => setCheck(true), []);
  if (typeof darkMode === "string") setDarkMode(darkMode == "true");
  return { isDarkModeSet: check, darkMode, setDarkMode };
}
