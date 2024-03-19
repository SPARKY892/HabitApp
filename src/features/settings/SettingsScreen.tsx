import React from "react";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import useOnboardingStore from "@context/onboarding/onboardingState";
import SettingsButton from "./SettingsButton";

const SettingsScreen = () => {
  const setIsFirstLaunch = useOnboardingStore(
    (state) => state.setIsFirstLaunch
  );

  return (
    <SettingsView>
      <PressableSetting onPress={() => setIsFirstLaunch(true)}>
        <SettingsButton buttonText="Take the tour." />
      </PressableSetting>
    </SettingsView>
  );
};

const ScreenTitle = styled.Text`
  color: ${Theme.headerTextColour};
`;

const SettingsView = styled.View`
  padding: 3%;
`;

const PressableSetting = styled.Pressable`
  margin-vertical: 2.5px;
`;

export default SettingsScreen;
