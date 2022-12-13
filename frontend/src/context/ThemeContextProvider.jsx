import React, { useState, createContext } from "react";

export const ThemeContext = createContext();

const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("dark")
  const toggleTheme = () => {
    setTheme((curr) => (curr === "light"? "dark" : "light"))
  }
  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {props.children}
    </ThemeContext.Provider>
  );
};
export default ThemeContextProvider;
