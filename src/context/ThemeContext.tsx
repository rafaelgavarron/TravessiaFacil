import React, {
   createContext,
   useContext,
   useState,
   useEffect,
   useCallback,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { LightTheme, DarkTheme, type ThemeColors } from "../constants/colors";

const STORAGE_KEY = "@travessia_dark_mode";

interface ThemeContextType {
   isDark: boolean;
   colors: ThemeColors;
   toggleTheme: () => void;
   setDarkMode: (value: boolean) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
   const [isDark, setIsDark] = useState(true);
   const [loaded, setLoaded] = useState(false);

   useEffect(() => {
      AsyncStorage.getItem(STORAGE_KEY).then((value) => {
         if (value !== null) {
            setIsDark(value === "true");
         }
         setLoaded(true);
      });
   }, []);

   const persistTheme = useCallback((value: boolean) => {
      AsyncStorage.setItem(STORAGE_KEY, String(value));
   }, []);

   const toggleTheme = useCallback(() => {
      setIsDark((prev) => {
         persistTheme(!prev);
         return !prev;
      });
   }, [persistTheme]);

   const setDarkMode = useCallback(
      (value: boolean) => {
         setIsDark(value);
         persistTheme(value);
      },
      [persistTheme],
   );

   if (!loaded) {
      return null;
   }

   return (
      <ThemeContext.Provider
         value={{
            isDark,
            colors: isDark ? DarkTheme : LightTheme,
            toggleTheme,
            setDarkMode,
         }}
      >
         {children}
      </ThemeContext.Provider>
   );
}

export function useTheme() {
   const context = useContext(ThemeContext);
   if (!context) {
      throw new Error("useTheme must be used within ThemeProvider");
   }
   return context;
}
