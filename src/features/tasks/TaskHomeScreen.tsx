import { View } from "react-native";
import React, { useContext, useEffect, useState } from "react";
import TaskContext from "@context/tasks/TaskContext";
import styled from "styled-components/native";
import { Theme } from "@library/styles";
import TaskInfoBox from "./TaskInfoBox";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";

const TaskHomeScreen = ({ navigation }) => {
  const { taskItems } = useContext(TaskContext);
  const { getItem } = useAsyncStorage("@task_key");

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

const ScreenTitle = styled.Text`
  color: ${Theme.headerTextColour};
`;

const ListContainer = styled.FlatList.attrs(() => ({
  contentContainerStyle: {
    padding: "3%",
  },
}))``;

const PressableTask = styled.Pressable`
  margin-vertical: 2.5px;
`;

export default TaskHomeScreen;
