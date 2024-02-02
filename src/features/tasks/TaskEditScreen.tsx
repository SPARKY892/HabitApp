import { Button, View } from "react-native";
import React, { useContext, useState } from "react";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import useTaskStore from "@context/tasks/TaskState";

const TaskEditScreen = ({ navigation, route }) => {
  const { id } = route.params;
  const taskItems = useTaskStore((state) => state.taskItems);
  const editTask = useTaskStore((state) => state.editTask);
  const removeTask = useTaskStore((state) => state.removeTask);
  const task = taskItems.find((item) => item.id === id);
  const [titleText, setTitleText] = useState(task.title);

  // Function to handle saving to context
  const saveFormDataToContext = () => {
    const combinedData = {
      id,
      title: titleText,
    };

    // console.log(combinedData);
    editTask(combinedData);
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
      <Button
        title="Delete Task"
        onPress={() => {
          removeTask(id);
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

export default TaskEditScreen;
