import React from "react";
import { CurrentThemeProvider } from "@context/index";
import AppNavigator from "@navigation/AppNavigator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import TaskState from "@context/tasks/TaskState";
import GoalState from "@context/goals/GoalState";

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BottomSheetModalProvider>
        <CurrentThemeProvider>
          <GoalState>
            <TaskState>
              <AppNavigator />
            </TaskState>
          </GoalState>
        </CurrentThemeProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

export default App;
