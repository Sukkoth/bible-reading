import React, { createContext, useContext, useState } from "react";

type ContextType = {
  theme: "light" | "dark";
  handleSetTheme: (theme: "light" | "dark") => void;
};

const ThemeContext = createContext<ContextType>({
  theme: "dark",
  handleSetTheme: () => {},
});

function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  function handleSetTheme(theme: "light" | "dark") {
    setTheme(theme);
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
