import { Pressable, Text, View } from "react-native";
import React, { useState, useEffect, useContext } from "react";
import GoalContext from "@context/goals/GoalContext";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import { Calendar } from "react-native-calendars";
import { Feather } from "@expo/vector-icons";

const GoalDetailScreen = ({ navigation, route }) => {
  const { goalItems, toggleCompletion } = useContext(GoalContext);
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
    console.log("settinggoal");
    console.log(goal);
  }, [goalItems]);

  const getCompletionsForThisWeek = () => {
    const day = new Date();
    const firstDayOfWeek = new Date(day);
    const lastDayOfWeek = new Date(day);

    if (goal.completions === undefined) {
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

  const getAllCompletions = () => {
    if (goal.completions) return Object.keys(goal.completions).length;

    return 0;
  };

  return (
    <View>
      <Calendar
        onDayPress={(day) => {
          handleDayPress(day.dateString);
        }}
        minDate="1970-01-01"
        maxDate={today}
        markingType={"period"}
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
          <StatNumbers>{`${getCompletionsForThisWeek()} / 30`}</StatNumbers>
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
            <StatNumbers>10</StatNumbers>
          </View>
        </StreakBox>
        <StreakBox>
          <StyledFeather name="award" size={20} />
          <View>
            <StatText>Longest Streak</StatText>
            <StatNumbers>10</StatNumbers>
          </View>
        </StreakBox>
      </StatContainer>
    </View>
  );
};

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
