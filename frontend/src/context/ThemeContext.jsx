import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setThemeState] = useState("coffee");

  useEffect(() => {
    const storedTheme = localStorage.getItem("chat-theme") || "coffee";
    setThemeState(storedTheme);
  }, []);

  const setTheme = (newTheme) => {
    localStorage.setItem("chat-theme", newTheme);
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
