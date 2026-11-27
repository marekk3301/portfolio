import { useEffect, useState } from "react";

// Dark / light / auto theme shared by the index-style pages (Landing, Odyssey).
// Stored per browser; "auto" follows the system setting.
const THEME_KEY = "idx-theme";

const readTheme = () => {
    try {
        return localStorage.getItem(THEME_KEY) || "dark";
    } catch (e) {
        return "dark";
    }
};

const useIndexTheme = () => {
    const [theme, setTheme] = useState(readTheme);

    useEffect(() => {
        try {
            localStorage.setItem(THEME_KEY, theme);
        } catch (e) {}
    }, [theme]);

    // Value for the data-theme attribute on the page wrapper
    const themeAttr = theme === "auto" ? undefined : theme;

    return [theme, setTheme, themeAttr];
};

export default useIndexTheme;
