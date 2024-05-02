import { View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import useGoalStore from "@context/goals/GoalState";
import GoalInfoBox from "./GoalInfoBox";

const GoalHomeScreen = ({ navigation }) => {
  const goalItems = useGoalStore((state) => state.goalItems);

  return (
    <View>
      <ListContainer
        data={goalItems}
        keyExtractor={(goal) => goal.id.toString()}
        renderItem={({ item }) => {
          return (
            <PressableGoal
              onPress={() => {
                navigation.navigate("GoalDetailScreen", {
                  id: item.id,
                });
              }}
              style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
            >
              <GoalInfoBox goal={item} />
            </PressableGoal>
          );
        }}
      />
    </View>
  );
};

export default GoalHomeScreen;

const ListContainer = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    padding: "3%",
  },
}))``;

const PressableGoal = styled.Pressable`
  margin-vertical: 2.5px;
`;
