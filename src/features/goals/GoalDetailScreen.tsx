import { Pressable, View, ScrollView } from "react-native";
import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import { Calendar } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";
import useGoalStore from "@context/goals/GoalState";
import GoalTargetInfo from "./GoalTargetInfo";

const GoalDetailScreen = ({ navigation, route }) => {
  const goalItems = useGoalStore((state) => state.goalItems);
  const toggleCompletion = useGoalStore((state) => state.toggleCompletion);
  const { id } = route.params;
  const [goal, setGoal] = useState({});
  const today = new Date().toJSON().slice(0, 10);

  const handleDayPress = (day) => {
    toggleCompletion(id, day);
    console.log(day);
  };

  useEffect(() => {
    navigation.setOptions({
      title: `${goal.title}`,
      // eslint-disable-next-line react/no-unstable-nested-components
      headerRight: () => (
        <Pressable
          onPress={() => navigation.navigate("GoalEditScreen", { id })}
        >
          <Feather name="edit" size={24} />
        </Pressable>
      ),
    });
  }, [navigation, goal.title, id]);

  useEffect(() => {
    setGoal(goalItems.find((item) => item.id === id));
  }, [goalItems]);

  const getCompletionsForThisWeek = () => {
    const day = new Date();
    const firstDayOfWeek = new Date(day);
    const lastDayOfWeek = new Date(day);

    if (
      goal.completions === undefined ||
      Object.keys(goal.completions).length === 0
    ) {
      return 0;
    }

    // Set first day of the week (Monday)
    firstDayOfWeek.setDate(
      day.getDate() - day.getDay() + (day.getDay() === 0 ? -6 : 1)
    );

    // Set last day of the week (Sunday)
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    const startOfWeek = firstDayOfWeek.toJSON().slice(0, 10);
    const endOfWeek = lastDayOfWeek.toJSON().slice(0, 10);

    // Filter completions for the current week
    const completionsThisWeek = Object.keys(goal.completions).filter(
      (date) => date >= startOfWeek && date <= endOfWeek
    );

    return completionsThisWeek.length;
  };

  // Function to count completions in last 30 days
  const countLast30Days = () => {
    if (goal) {
      // Completions does not exist on render unitl useeffect kicks in
      if (
        goal.completions === undefined ||
        Object.keys(goal.completions).length === 0
      ) {
        return 0;
      }

      const completionDates = Object.keys(goal.completions).sort();
      const currentDate = new Date();
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

      let count = 0;

      for (let i = completionDates.length - 1; i >= 0; i -= 1) {
        const completionDate = new Date(completionDates[i]);

        if (
          completionDate >= thirtyDaysAgo &&
          completionDate <= currentDate &&
          goal.completions[completionDate.toISOString().split("T")[0]]?.selected
        ) {
          count += 1;
        } else if (completionDate < thirtyDaysAgo) {
          // No need to continue checking older dates
          break;
        }
      }
      return count;
    }
    return 0;
  };

  // Function to get current streak
  const getCurrentStreak = () => {
    if (goal) {
      // Completions does not exist on render unitl useeffect kicks in
      if (
        goal.completions === undefined ||
        Object.keys(goal.completions).length === 0
      ) {
        return 0;
      }

      const completionDates = Object.keys(goal.completions).sort();
      let currentStreak = 0;
      let currentDate = new Date(completionDates[completionDates.length - 1]);

      while (
        goal.completions[currentDate.toISOString().split("T")[0]]?.selected
      ) {
        currentStreak += 1;
        currentDate.setDate(currentDate.getDate() - 1);
      }
      return currentStreak;
    }
    return 0;
  };

  // Function to find longest streak
  const findLongestStreak = () => {
    if (goal) {
      // Completions does not exist on render unitl useeffect kicks in
      if (
        goal.completions === undefined ||
        Object.keys(goal.completions).length === 0
      ) {
        return 0;
      }
      const dates = Object.keys(goal.completions).sort();
      let currentStreak = 0;
      let longestStreak = 0;

      for (let i = 0; i < dates.length - 1; i += 1) {
        const currentDate = new Date(dates[i]);
        const nextDate = new Date(dates[i + 1]);

        const isConsecutive =
          (nextDate - currentDate) / (1000 * 60 * 60 * 24) === 1;

        if (isConsecutive) {
          currentStreak += 1;
        } else {
          currentStreak = 0;
        }

        if (currentStreak > longestStreak) {
          longestStreak = currentStreak;
        }
      }
      return longestStreak + 1;
    }
    return 0;
  };

  const getAllCompletions = () => {
    if (goal.completions) return Object.keys(goal.completions).length;

    return 0;
  };

  return (
    <ScrollView>
      <GoalDescription>{goal.description}</GoalDescription>
      <GoalTargetInfo
        checkedDays={goal.checkedDays}
        pickedNumber={goal.pickedNumber}
        pickedFrequency={goal.pickedFrequency}
      />
      <Calendar
        onDayPress={(day) => {
          handleDayPress(day.dateString);
        }}
        minDate="1970-01-01"
        maxDate={today}
        markingType="period"
        firstDay={1}
        enableSwipeMonths
        markedDates={
          goal.completions ? JSON.parse(JSON.stringify(goal.completions)) : null
        }
      />
      <SectionTitle>Completion Stats</SectionTitle>
      <StatContainer>
        <StatBox>
          <StatText>This Week</StatText>
          <StatNumbers>{`${getCompletionsForThisWeek()} / ${
            goal.targetDays
          }`}</StatNumbers>
        </StatBox>
        <StatBox>
          <StatText>Last 30 Days</StatText>
          <StatNumbers>{`${countLast30Days()} / 30`}</StatNumbers>
        </StatBox>
        <StatBox>
          <StatText>All Time</StatText>
          <StatNumbers>{`${getAllCompletions()}`}</StatNumbers>
        </StatBox>
      </StatContainer>
      <SectionTitle>Streak</SectionTitle>
      <StatContainer>
        <StreakBox>
          <StyledFeather name="trending-up" size={20} />
          <View>
            <StatText>Current Streak</StatText>
            <StatNumbers>{getCurrentStreak()}</StatNumbers>
          </View>
        </StreakBox>
        <StreakBox>
          <StyledFeather name="award" size={20} />
          <View>
            <StatText>Longest Streak</StatText>
            <StatNumbers>{findLongestStreak()}</StatNumbers>
          </View>
        </StreakBox>
      </StatContainer>
    </ScrollView>
  );
};

const GoalDescription = styled.Text`
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 10px;
  margin-left: 20px;
  margin-right: 20px;
`;

const SectionTitle = styled.Text`
  padding: 5px 10px;
  font-size: 20px;
  font-weight: bold;
`;

const StatContainer = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
`;

const StatBox = styled.View`
  border: 2px solid #3498db; /* Border color */
  border-radius: 10px; /* Rounded corners */
  padding: 10px; /* Padding around the content */
  margin: 5px; /* Margin between boxes */
  flex: 1;
`;

const StreakBox = styled.View`
  border: 2px solid #3498db; /* Border color */
  border-radius: 10px; /* Rounded corners */
  padding: 10px; /* Padding around the content */
  margin: 5px; /* Margin between boxes */
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const StyledFeather = styled(Feather)`
  margin: 5px;
  color: #333;
`;

const StatText = styled.Text`
  color: ${Theme.headerTextColour};
  align-self: center;
`;

const StatNumbers = styled.Text`
  color: ${Theme.headerTextColour};
  align-self: center;
`;

export default GoalDetailScreen;
