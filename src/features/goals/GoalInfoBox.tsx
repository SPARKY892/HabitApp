import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import GoalContext from "@context/goals/GoalContext";

const GoalInfoBox = ({ goal }) => {
  const { toggleCompletion } = useContext(GoalContext);
  const { id, title, description, completions, targetDays } = goal;
  const today = new Date().toJSON().slice(0, 10);

  const getCompletionsForThisWeek = () => {
    const day = new Date();
    const firstDayOfWeek = new Date(day);
    const lastDayOfWeek = new Date(day);

    // Set first day of the week (Monday)
    firstDayOfWeek.setDate(
      day.getDate() - day.getDay() + (day.getDay() === 0 ? -6 : 1)
    );

    // Set last day of the week (Sunday)
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);

    const startOfWeek = firstDayOfWeek.toJSON().slice(0, 10);
    const endOfWeek = lastDayOfWeek.toJSON().slice(0, 10);

    // Filter completions for the current week
    const completionsThisWeek = Object.keys(completions).filter(
      (date) => date >= startOfWeek && date <= endOfWeek
    );

    return completionsThisWeek.length;
  };

  return (
    <Container>
      <LeftSection>
        <IconWrapper
          onPress={() => {
            toggleCompletion(id, today);
          }}
        >
          <Feather
            name={
              !(completions && completions[today]) ? "circle" : "check-circle"
            }
            size={24}
            color="#333"
          />
        </IconWrapper>
        <View>
          <Title>{title}</Title>
          <Description>{description}</Description>
          <CompletionInfo>{`${targetDays} days per week (${getCompletionsForThisWeek()}/${targetDays})`}</CompletionInfo>
        </View>
      </LeftSection>
      <Feather name="chevron-right" size={24} color="#333" />
    </Container>
  );
};

const Container = styled.View`
  background-color: #fff;
  border-radius: 10px;
  padding: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LeftSection = styled.View`
  flex-direction: row;
  align-items: center;
`;

const IconWrapper = styled.Pressable`
  margin-right: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const Description = styled.Text`
  font-size: 14px;
  color: #777;
`;

const CompletionInfo = styled.Text`
  font-size: 12px;
  color: #999;
`;

export default GoalInfoBox;
