import { View } from "react-native";
import React, { useContext } from "react";
import GoalContext from "@context/goals/GoalContext";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import GoalInfoBox from "./GoalInfoBox";

const GoalHomeScreen = ({ navigation }) => {
  const { goalItems } = useContext(GoalContext);

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
            >
              <GoalInfoBox goal={item} />
            </PressableGoal>
          );
        }}
      />
    </View>
  );
};

const ScreenTitle = styled.Text`
  color: ${Theme.headerTextColour};
`;

export default GoalHomeScreen;

const ListContainer = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    padding: "3%",
  },
}))``;

const PressableGoal = styled.Pressable`
  margin-vertical: 2.5px;
`;
