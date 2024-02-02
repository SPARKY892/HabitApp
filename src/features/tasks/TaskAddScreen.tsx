import { View, Button } from "react-native";
import React, { useState } from "react";
import uuid from "react-native-uuid";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import useTaskStore from "@context/tasks/TaskState";

const TaskAddScreen = ({ navigation }) => {
  const addTask = useTaskStore((state) => state.addTask);
  const taskItems = useTaskStore((state) => state.taskItems);
  const [titleText, setTitleText] = useState(null);

  // Function to handle saving to context
  const saveFormDataToContext = () => {
    const id = uuid.v4();

    const combinedData = {
      id,
      title: titleText,
      completed: false,
    };

    while (taskItems.some((task) => task.id === combinedData.id)) {
      combinedData.id = uuid.v4();
    }

    console.log(combinedData);

    addTask(combinedData);
  };

  return (
    <View>
      <TitleInput
        placeholder="Task Title"
        onChangeText={(newText) => setTitleText(newText)}
        defaultValue={titleText}
      />
      <Button
        title="Save"
        disabled={titleText === "" || titleText === null}
        onPress={() => {
          saveFormDataToContext();
          navigation.navigate("TaskHomeScreen");
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

export default TaskAddScreen;
