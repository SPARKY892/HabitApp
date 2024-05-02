import React, { useState } from "react";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import useOnboardingStore from "@context/onboarding/onboardingState";
import useGoalStore from "@context/goals/GoalState";
import useTaskStore from "@context/tasks/TaskState";
import SettingsButton from "./SettingsButton";
import { opacity } from "react-native-reanimated/lib/typescript/reanimated2/Colors";

const SettingsScreen = () => {
  const [taskModalVisible, setTaskModalVisible] = useState(false);
  const [goalModalVisible, setGoalModalVisible] = useState(false);

  const setIsFirstLaunch = useOnboardingStore(
    (state) => state.setIsFirstLaunch
  );

  const clearGoals = useGoalStore((state) => state.clearGoals);
  const clearTasks = useTaskStore((state) => state.clearTasks);

  const confirmClearGoals = () => {
    clearGoals();
    setGoalModalVisible(false);
  };

  const confirmClearTasks = () => {
    clearTasks();
    setTaskModalVisible(false);
  };

  return (
    <>
      <SettingsView>
        <PressableSetting
          onPress={() => setIsFirstLaunch(true)}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <SettingsButton buttonText="Take the tour" />
        </PressableSetting>
        <PressableSetting
          onPress={() => setTaskModalVisible(true)}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <SettingsButton buttonText="Delete all tasks" />
        </PressableSetting>
        <PressableSetting
          onPress={() => setGoalModalVisible(true)}
          style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
        >
          <SettingsButton buttonText="Delete all goals" />
        </PressableSetting>
      </SettingsView>
      <TaskDeleteModal
        animationType="slide"
        transparent
        visible={taskModalVisible}
      >
        <ModalView>
          <ModalCard>
            <TextContainer>
              <DeleteHeaderText>Delete all tasks?</DeleteHeaderText>
              <DeleteText>
                Are you sure you want to remove all tasks? This action cannot be
                undone.
              </DeleteText>
            </TextContainer>
            <ButtonContainer>
              <CancelPressable
                onPress={() => setTaskModalVisible(false)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <ButtonText>Cancel</ButtonText>
              </CancelPressable>
              <DeletePressable
                onPress={() => confirmClearTasks()}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <ButtonText>Confirm</ButtonText>
              </DeletePressable>
            </ButtonContainer>
          </ModalCard>
        </ModalView>
      </TaskDeleteModal>
      <GoalDeleteModal
        animationType="slide"
        transparent
        visible={goalModalVisible}
      >
        <ModalView>
          <ModalCard>
            <TextContainer>
              <DeleteHeaderText>Delete all goals?</DeleteHeaderText>
              <DeleteText>
                Are you sure you want to remove all goals? This action cannot be
                undone.
              </DeleteText>
            </TextContainer>
            <ButtonContainer>
              <CancelPressable
                onPress={() => setGoalModalVisible(false)}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <ButtonText>Cancel</ButtonText>
              </CancelPressable>
              <DeletePressable
                onPress={() => confirmClearGoals()}
                style={({ pressed }) => [{ opacity: pressed ? 0.7 : 1 }]}
              >
                <ButtonText>Confirm</ButtonText>
              </DeletePressable>
            </ButtonContainer>
          </ModalCard>
        </ModalView>
      </GoalDeleteModal>
    </>
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

const TaskDeleteModal = styled.Modal``;

const ModalView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const ModalCard = styled.View`
  background-color: white;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  elevation: 3;
`;

const DeleteHeaderText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

const DeleteText = styled.Text`
  padding: 5px;
  max-width: 80%;
  text-align: center;
`;

const GoalDeleteModal = styled.Modal``;

const ButtonContainer = styled.View`
  flex-direction: row;
`;

const TextContainer = styled.View`
  justify-content: center;
  align-items: center;
  margin-vertical: 10px;
`;

const CancelPressable = styled.Pressable`
  padding: 10px;
  margin: 7.5px;
  background-color: #ccc;
  elevation: 3;
`;

const DeletePressable = styled.Pressable`
  padding: 10px;
  margin: 7.5px;
  background-color: red;
  elevation: 3;
`;

const ButtonText = styled.Text`
  color: white;
`;

export default SettingsScreen;
