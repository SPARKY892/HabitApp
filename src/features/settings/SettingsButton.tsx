import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";

const SettingsButton = ({ buttonText }) => {
  return (
    <Container>
      <LeftSection>
        <View>
          <Title>{buttonText}</Title>
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

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.completed ? "#ccc" : "#000")};
`;

export default SettingsButton;
