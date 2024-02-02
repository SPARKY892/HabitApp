import { View } from "react-native";
import React from "react";
import styled from "styled-components/native";
import useTaskStore from "@context/tasks/TaskState";
import TaskInfoBox from "./TaskInfoBox";

const TaskHomeScreen = ({ navigation }) => {
  const taskItems = useTaskStore((state) => state.taskItems);

  console.log(taskItems);

  return (
    <View>
      <ListContainer
        data={taskItems}
        keyExtractor={(task) => task.id.toString()}
        renderItem={({ item }) => {
          return (
            <PressableTask
              onPress={() => {
                navigation.navigate("TaskEditScreen", {
                  id: item.id,
                  pageTitle: item.title,
                });
              }}
            >
              <TaskInfoBox item={item} />
            </PressableTask>
          );
        }}
      />
    </View>
  );
};

const ListContainer = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    padding: "3%",
  },
}))``;

const PressableTask = styled.Pressable`
  margin-vertical: 2.5px;
`;

export default TaskHomeScreen;
