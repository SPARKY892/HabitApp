import { Button, View, Text } from "react-native";
import React, { useState } from "react";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Picker } from "@react-native-picker/picker";
import useGoalStore from "@context/goals/GoalState";

const GoalEditScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const goalItems = useGoalStore((state) => state.goalItems);
  const editGoal = useGoalStore((state) => state.editGoal);
  const removeGoal = useGoalStore((state) => state.removeGoal);
  const goal = goalItems.find((item) => item.id === id);
  const [titleText, setTitleText] = useState(goal.title);
  const [descriptionText, setDescriptionText] = useState(goal.description);
  const [pickedFrequency, setPickedFrequency] = useState(goal.pickedFrequency);
  const [pickedNumber, setPickedNumber] = useState(goal.pickedNumber);
  const [checkedDays, setCheckedDays] = useState(goal.checkedDays);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const CheckboxGroup = () =>
    daysOfWeek.map((day) => (
      <BouncyCheckbox
        key={day}
        text={day}
        textStyle={{ textDecorationLine: "none" }}
        isChecked={checkedDays.includes(day)}
        onPress={() => toggleDayOfWeek(day)}
      />
    ));

  function toggleDayOfWeek(day) {
    const index = checkedDays.indexOf(day);
    const updatedDays = [...checkedDays];

    if (index === -1) {
      updatedDays.push(day);
    } else {
      updatedDays.splice(index, 1);
    }
    setCheckedDays(updatedDays);
  }

  // Function to calculate number of days per week being targeted
  const getTargetDays = () => {
    if (pickedFrequency === "Daily") {
      return checkedDays.length;
    }
    if (pickedFrequency === "Weekly") {
      return pickedNumber;
    }
    return null;
  };

  // Function to handle saving to context
  const saveFormDataToContext = () => {
    const targetDays = getTargetDays();

    const combinedData = {
      id,
      title: titleText,
      description: descriptionText,
      pickedFrequency,
      pickedNumber,
      checkedDays,
      targetDays,
    };
    editGoal(combinedData);
  };

  const frequencyDisplay = (pickFreq) => {
    let content = null;

    if (pickFreq === "Daily") {
      content = (
        <>
          <Text>
            Please select the days you would like to perform this goal:
          </Text>
          <CheckboxGroup />
        </>
      );
    }
    if (pickFreq === "Weekly") {
      content = (
        <>
          <Text>
            How many days per week would you like to perform this goal?
          </Text>
          <Picker
            selectedValue={pickedNumber}
            onValueChange={(itemValue) => setPickedNumber(itemValue)}
            dropdownIconRippleColor="aliceblue"
            mode="dropdown"
          >
            <Picker.Item label="1" value={1} />
            <Picker.Item label="2" value={2} />
            <Picker.Item label="3" value={3} />
            <Picker.Item label="4" value={4} />
            <Picker.Item label="5" value={5} />
            <Picker.Item label="6" value={6} />
            <Picker.Item label="7" value={7} />
          </Picker>
        </>
      );
    }

    return content;
  };

  return (
    <View>
      <TitleInput
        placeholder="Goal Title"
        onChangeText={(newText) => setTitleText(newText)}
        defaultValue={titleText}
      />
      <DescriptionInput
        placeholder="Goal Description"
        onChangeText={(newText) => setDescriptionText(newText)}
        defaultValue={descriptionText}
        multiline
        numberOfLines={3}
        textAlignVertical="top"
      />
      <Text>Would you like to complete this goal daily or weekly?</Text>
      <Picker
        selectedValue={pickedFrequency}
        onValueChange={(itemValue) => setPickedFrequency(itemValue)}
        dropdownIconRippleColor="aliceblue"
        mode="dropdown"
      >
        <Picker.Item label="Daily" value="Daily" />
        <Picker.Item label="Weekly" value="Weekly" />
      </Picker>
      {frequencyDisplay(pickedFrequency)}
      <Button
        title="Save"
        disabled={titleText === "" || titleText === null}
        onPress={() => {
          saveFormDataToContext();
          navigation.navigate("GoalHomeScreen");
        }}
      />
      <Button
        title="Delete Goal"
        onPress={() => {
          removeGoal(id);
          navigation.navigate("GoalHomeScreen");
        }}
      />
    </View>
  );
};

const TitleInput = styled.TextInput`
  color: ${Theme.headerTextColour};
  padding: 5px 5px;
  margin: 10px 20px;
  border-radius: 10px;
  background-color: #eee;
`;

const DescriptionInput = styled.TextInput`
  color: ${Theme.headerTextColour};
  padding: 5px 5px;
  margin: 0px 20px 10px;
  border-radius: 10px;
  background-color: #eee;
`;

export default GoalEditScreen;
