import { View, Button } from "react-native";
import React, { useContext, useState } from "react";
import uuid from "react-native-uuid";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import TaskContext from "@context/tasks/TaskContext";

const TaskAddScreen = ({ navigation }) => {
  const { addTask } = useContext(TaskContext);
  const [titleText, setTitleText] = useState(null);

  // Function to handle saving to context
  const saveFormDataToContext = () => {
    const id = uuid.v4();

    const combinedData = {
      id,
      title: titleText,
      completed: false,
    };

    // Assuming your context provides a method like setFormData
    addTask(combinedData);
  };

  return (
    <View>
      <TitleInput
        placeholder="Goal Title"
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

const DescriptionInput = styled.TextInput`
  color: ${Theme.headerTextColour};
  padding: 5px 5px;
  margin: 0px 20px 10px;
  border-radius: 10px;
  background-color: #eee;
`;

export default TaskAddScreen;
