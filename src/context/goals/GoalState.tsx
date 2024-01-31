import React, { useEffect, useReducer, useState } from "react";
import { useAsyncStorage } from "@react-native-async-storage/async-storage";
import GoalContext from "./GoalContext";
import GoalReducer from "./GoalReducer";

const GoalState = ({ children }) => {
  const [init, setInit] = useState([]);
  const { setItem, getItem } = useAsyncStorage("@goal_key");

  // Change the code above to that below to get the initial state from local storage
  const initialState = {
    goalItems: [],
  };

  // Set up the reducer
  const [state, dispatch] = useReducer(GoalReducer, initialState);

  // Function to handle when a goal is added
  const addGoal = (payload) => {
    dispatch({ type: "ADD_GOAL", payload });
  };

  // Function to handle when a goal is edited
  const editGoal = (payload) => {
    dispatch({ type: "EDIT_GOAL", payload });
  };

  // Function to remove a goal
  const removeGoal = (payload) => {
    dispatch({ type: "REMOVE_GOAL", payload });
  };

  // Function to clear the goals
  const clearGoals = () => {
    dispatch({ type: "CLEAR" });
  };

  // Function to add/remove a date from completions
  const toggleCompletion = (id, date) => {
    dispatch({ type: "TOGGLE_COMPLETION", payload: { id, date } });
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
        console.log("write to storage");
        // console.log(items);
      }
    };

    writeItemToStorage(state.goalItems);
  }, [state.goalItems]);

  return (
    // Add the above functions into the Context provider, and pass to the children
    <GoalContext.Provider
      value={{
        goalItems: state.goalItems,
        addGoal,
        editGoal,
        removeGoal,
        clearGoals,
        toggleCompletion,
        hydrate,
        // To access the total, we need to pass in the state
        ...state,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};

export default GoalState;
