import React, { useState, useEffect, useReducer } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import TaskContext from "./TaskContext";
import TaskReducer from "./TaskReducer";

const TaskState = ({ children }) => {
  const [init, setInit] = useState([]);
  const { setItem, getItem } = useAsyncStorage("@task_key");

  // Change the code above to that below to get the initial state from local storage
  const initialState = {
    taskItems: [],
  };

  // Set up the reducer
  const [state, dispatch] = useReducer(TaskReducer, initialState);

  // Function to handle when a task is added
  const addTask = (payload) => {
    dispatch({ type: "ADD_TASK", payload });
  };

  // Function to handle when a task is editedbr
  const editTask = (payload) => {
    dispatch({ type: "EDIT_TASK", payload });
  };

  // Function to remove a task
  const removeTask = (payload) => {
    dispatch({ type: "REMOVE_TASK", payload });
  };

  // Function to clear the tasks
  const clearTasks = () => {
    dispatch({ type: "CLEAR" });
  };

  // Function to add/remove a date from completions
  const toggleCompletion = (payload) => {
    dispatch({ type: "TOGGLE_COMPLETION", payload });
  };

  // Function to hydrate state with data from async storage
  const hydrate = (payload) => {
    dispatch({ type: "HYDRATE", payload });
  };

  useEffect(() => {
    getItem().then((item) => {
      if (item) {
        hydrate(JSON.parse(item));
        setInit(JSON.parse(item));
      }
    });
  }, []);

  useEffect(() => {
    const writeItemToStorage = async (items) => {
      if (items && items !== init) {
        const valueJSON = JSON.stringify(items.length > 0 ? items : []);
        await setItem(valueJSON);
        setInit(items);
      }
    };

    writeItemToStorage(state.taskItems);
  }, [state.taskItems]);

  return (
    // Add the above functions into the Context provider, and pass to the children
    <TaskContext.Provider
      value={{
        taskItems: state.taskItems,
        addTask,
        editTask,
        removeTask,
        clearTasks,
        toggleCompletion,
        hydrate,
        // To access the total, we need to pass in the state
        ...state,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export default TaskState;
