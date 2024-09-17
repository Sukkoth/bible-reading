import React, { createContext, useContext, useEffect, useState } from "react";

type ContextType = {
  theme: "light" | "dark";
  handleSetTheme: (theme?: "light" | "dark") => void;
};

const ThemeContext = createContext<ContextType>({
  theme: "dark",
  handleSetTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    const localTheme = localStorage.getItem("theme");
    if (localTheme === "light") {
      return "light";
    } else {
      return "dark";
    }
    // if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {}
  });

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  function handleSetTheme(theme?: "light" | "dark") {
    setTheme(theme ? theme : (prev) => (prev === "dark" ? "light" : "dark"));
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        handleSetTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("ThemeContext called outside of Provider");
  }
  return context;
}

export default ThemeProvider;
