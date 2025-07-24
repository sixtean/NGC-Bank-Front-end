// src/contexts/ThemeContext.tsx
import { createContext, useContext, useState, useEffect, type ReactNode } from "react";


type ThemeContextType = {
  lightTheme: boolean;
  themeStatus: string;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [lightTheme, setLightTheme] = useState(false);
  const [themeStatus, setThemeStatus] = useState("");

  const toggleTheme = () => {
    const newTheme = !lightTheme;
    setLightTheme(newTheme);

    // Adiciona/remover classe no <html>
    const root = document.documentElement;
    if (newTheme) {
      root.classList.add("light");
      setThemeStatus("active");
    } else {
      root.classList.remove("light");
      setThemeStatus("");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("lightTheme");
    if (savedTheme === "true") {
      setLightTheme(true);
      setThemeStatus("active");
      document.documentElement.classList.add("light");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("lightTheme", String(lightTheme));
  }, [lightTheme]);

  return (
    <ThemeContext.Provider value={{ lightTheme, themeStatus, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme deve ser usado dentro de ThemeProvider");
  }
  return context;
};
