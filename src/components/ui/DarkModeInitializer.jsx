import { useEffect } from "react";
import { useSelector } from "react-redux";

/**
 * Applique la classe "dark" au HTML root si activé dans Redux.
 */
const DarkModeInitializer = () => {
  const isDark = useSelector((state) => state.ui.darkMode);

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [isDark]);

  return null;
};

export default DarkModeInitializer;
