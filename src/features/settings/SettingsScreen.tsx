import { View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import { Theme } from "@library/styles";

const SettingsScreen = () => {
  return (
    <View>
      <ScreenTitle>SettingsScreen</ScreenTitle>
    </View>
  );
};

const ScreenTitle = styled.Text`
  color: ${Theme.headerTextColour};
`;

export default SettingsScreen;
