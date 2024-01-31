import React, { useContext } from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { Feather } from "@expo/vector-icons";
import TaskContext from "@context/tasks/TaskContext";

const TaskInfoBox = ({ item }) => {
  const { id, title, completed } = item;
  const { toggleCompletion } = useContext(TaskContext);

  return (
    <Container>
      <LeftSection>
        <IconWrapper
          onPress={() => {
            toggleCompletion(id);
          }}
        >
          <Feather
            name={!completed ? "circle" : "check-circle"}
            size={24}
            color="#333"
          />
        </IconWrapper>
        <View>
          <Title completed={completed}>{title}</Title>
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

const IconWrapper = styled.Pressable`
  margin-right: 10px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${(props) => (props.completed ? "#ccc" : "#000")};
`;

export default TaskInfoBox;
