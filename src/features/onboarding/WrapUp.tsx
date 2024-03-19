import { Text, Dimensions } from "react-native";
import React from "react";
import styled from "styled-components/native";

const screenWidth = Dimensions.get("window").width;

const WrapUp = () => {
  return (
    <Container width={screenWidth}>
      <Text>WrapUp</Text>
    </Container>
  );
};

const Container = styled.View`
  justify-content: center;
  align-items: center;
  border: 1px solid red;
  width: ${({ width }) => width};
`;

export default WrapUp;
