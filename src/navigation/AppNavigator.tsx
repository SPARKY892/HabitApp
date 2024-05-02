/* eslint-disable react/no-unstable-nested-components */
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useCurrentTheme } from "@context/index";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";
import { Colours } from "@library/styles";
import { ActivityIndicator, Platform, Pressable } from "react-native";
import GoalAddScreen from "@features/goals/GoalAddScreen";
import GoalEditScreen from "@features/goals/GoalEditScreen";
import TaskAddScreen from "@features/tasks/TaskAddScreen";
import TaskEditScreen from "@features/tasks/TaskEditScreen";
import OnboardingScreen from "@features/onboarding/OnboardingScreen";
import useOnboardingStore from "@context/onboarding/onboardingState";
import SettingsScreen from "../features/settings/SettingsScreen";
import TaskHomeScreen from "../features/tasks/TaskHomeScreen";
import GoalHomeScreen from "../features/goals/GoalHomeScreen";
import GoalDetailScreen from "../features/goals/GoalDetailScreen";

const Tab = createBottomTabNavigator();

const TaskNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TaskHomeScreen"
        component={TaskHomeScreen}
        options={({ navigation }) => {
          return {
            title: "Tasks",
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("TaskAddScreen")}
                style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }]}
              >
                <Feather name="plus-circle" size={24} />
              </Pressable>
            ),
          };
        }}
      />
      <Stack.Screen
        name="TaskAddScreen"
        component={TaskAddScreen}
        options={{
          title: "Add a new Task",
        }}
      />
      <Stack.Screen
        name="TaskEditScreen"
        component={TaskEditScreen}
        options={{
          title: "Edit Task",
        }}
      />
    </Stack.Navigator>
  );
};

const GoalNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="GoalHomeScreen"
        component={GoalHomeScreen}
        options={({ navigation }) => {
          return {
            title: "Goals",
            headerRight: () => (
              <Pressable
                onPress={() => navigation.navigate("GoalAddScreen")}
                style={({ pressed }) => [{ opacity: pressed ? 0.4 : 1 }]}
              >
                <Feather name="plus-circle" size={24} />
              </Pressable>
            ),
          };
        }}
      />
      <Stack.Screen
        name="GoalDetailScreen"
        component={GoalDetailScreen}
        options={({ navigation }) => {
          return {
            headerRight: () => (
              <Pressable>
                <Feather name="edit" size={24} />
              </Pressable>
            ),
          };
        }}
      />
      <Stack.Screen
        name="GoalAddScreen"
        component={GoalAddScreen}
        options={{
          title: "Add a new Goal",
        }}
      />
      <Stack.Screen
        name="GoalEditScreen"
        component={GoalEditScreen}
        options={{
          title: "Edit Goal",
        }}
      />
    </Stack.Navigator>
  );
};

const OnboardingNavigator = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="OnboardingScreen" component={OnboardingScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const { reactNavigationTheme } = useCurrentTheme();
  const isFirstLaunch = useOnboardingStore((state) => state.isFirstLaunch);
  // const setIsFirstLaunch = useOnboardingStore(
  //   (state) => state.setIsFirstLaunch
  // );

  console.log(isFirstLaunch);

  if (isFirstLaunch === null) {
    return (
      // Render a loading indicator until isFirstLaunch is determined
      <ActivityIndicator size="large" color="#4e94fd" />
    );
  }

  // if (isFirstLaunch === false) {
  //   setIsFirstLaunch(true);
  // }

  return (
    <NavigationContainer theme={reactNavigationTheme}>
      <StatusBar animated style="auto" />
      {isFirstLaunch ? (
        <OnboardingNavigator />
      ) : (
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: Colours.secondary,
            tabBarLabelStyle: {
              fontWeight: "bold",
              fontSize: 12,
            },
            tabBarStyle: {
              borderTopWidth: 0,
              ...(Platform.OS === "android" && { height: 60 }),
            },
          }}
        >
          <Tab.Screen
            name="Tasks"
            component={TaskNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="list" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Goals"
            component={GoalNavigator}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="target" color={color} size={size} />
              ),
              headerShown: false,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: ({ color, size }) => (
                <Feather name="settings" color={color} size={size} />
              ),
            }}
          />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
};

export default AppNavigator;
