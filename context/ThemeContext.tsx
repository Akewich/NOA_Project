// theme/ThemeContext.tsx
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

// Define theme type
export type ThemeMode = "light" | "dark" | "system";

// Define colors interface
export interface ThemeColors {
  background: string;
  card: string;
  text: string;
  subText: string;
  revertText: string;
  border: string;
  primary: string;
  accent: string;
  icon: string;
  selectedIcon: string;
  block: string;
}

// Define theme context value interface
interface ThemeContextValue {
  colors: ThemeColors;
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => Promise<void>;
  isDark: boolean;
}

// Define available themes
const lightTheme: ThemeColors = {
  background: "#EFF2FA",
  card: "#fff",
  text: "#000000",
  subText: "#555555",
  revertText: "#FFFFFF",
  border: "#2C2C2C",
  primary: "#0066CC",
  accent: "#FF6B00",
  icon: "#3FDE7F",
  selectedIcon: "#000000",
  block: "#2D2D2D",
};

const darkTheme: ThemeColors = {
  background: "#282A49",
  card: "#353666",
  text: "#FFFFFF",
  subText: "#AAAAAA",
  revertText: "#000000",
  border: "#E1E1E1",
  primary: "#4D9AFF",
  accent: "#FF9E57",
  icon: "#3FDE7F",
  selectedIcon: "#FFFFFF",
  block: "#ffffff",
};

// Create the context
const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

// Provider props interface
interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setModeState] = useState<ThemeMode>("system");
  const systemColorScheme = useColorScheme();

  // Determine if dark mode should be applied
  const isDark =
    mode === "dark" || (mode === "system" && systemColorScheme === "dark");

  // Get current theme colors
  const colors = isDark ? darkTheme : lightTheme;

  useEffect(() => {
    // Load saved theme preference
    const loadTheme = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem("themeMode");
        if (
          savedTheme &&
          (savedTheme === "light" ||
            savedTheme === "dark" ||
            savedTheme === "system")
        ) {
          setModeState(savedTheme as ThemeMode);
        }
      } catch (error) {
        console.log("Error loading theme", error);
      }
    };
    loadTheme();
  }, []);

  const setMode = async (newMode: ThemeMode): Promise<void> => {
    setModeState(newMode);
    try {
      await AsyncStorage.setItem("themeMode", newMode);
    } catch (error) {
      console.log("Error saving theme", error);
    }
  };

  // Create context value object
  const contextValue: ThemeContextValue = {
    colors,
    mode,
    setMode,
    isDark,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to use the theme context
export const useTheme = (): ThemeContextValue => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
