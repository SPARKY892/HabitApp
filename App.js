import React from "react";
import { CurrentThemeProvider } from "@context/index";
import AppNavigator from "@navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <CurrentThemeProvider>
          <AppNavigator />
        </CurrentThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
