import {createContext, useContext, useState} from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({children}) => {
    const [isDark, setIsDark] = useState(!!localStorage.getItem("isDark"));
    return <ThemeContext.Provider value={{isDark, setIsDark}}>
        {children}
    </ThemeContext.Provider>
}

export const useThemeContext = () => {
    return useContext(ThemeContext);
}

