import { Text, Dimensions } from "react-native";
import React from "react";
import styled from "styled-components/native";

const screenWidth = Dimensions.get("window").width;

const GoalIntro = () => {
  return (
    <Container width={screenWidth}>
      <Text>GoalIntro</Text>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: ${({ width }) => width};
`;

export default GoalIntro;
