import React, { createContext, useContext, useEffect, useMemo } from "react";
import { Platform, useColorScheme } from "react-native";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import * as NavigationBar from "expo-navigation-bar";
import { Theme } from "@library/styles";

const ThemeContext = createContext({
  currentTheme: null,
  reactNavigationTheme: {
    dark: false,
    colors: {
      primary: null,
      background: null,
      card: null,
      text: null,
      border: null,
      notification: null,
    },
  },
});

const CurrentThemeProvider = ({ children }) => {
  const { currentTheme, reactNavigationTheme } = useCurrentThemeProvider();

  const theme = useMemo(
    () => ({ currentTheme, reactNavigationTheme }),
    [currentTheme, reactNavigationTheme]
  );

  useEffect(() => {
    if (Platform.OS === "android") {
      const styledProps = { theme: { theme: currentTheme } };
      const cardColour = Theme.card(styledProps);
      NavigationBar.setBackgroundColorAsync(cardColour);
      NavigationBar.setButtonStyleAsync(
        currentTheme === "dark" ? "light" : "dark"
      );
    }
  }, [currentTheme]);

  return (
    <ThemeContext.Provider value={theme}>
      <StyledThemeProvider theme={{ theme: currentTheme }}>
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

const useCurrentThemeProvider = () => {
  const systemLevelTheme = useColorScheme();

  // Create the props structure expected by styled-components
  const styledProps = { theme: { theme: systemLevelTheme } };
  const reactNavigationTheme = {
    dark: false,
    colors: {
      primary: null,
      background: Theme.background(styledProps),
      card: Theme.card(styledProps),
      text: Theme.bodyTextColour(styledProps),
      border: null,
      notification: null,
    },
  };

  return {
    currentTheme: systemLevelTheme,
    reactNavigationTheme,
  };
};

const useCurrentTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export { CurrentThemeProvider, useCurrentTheme };
