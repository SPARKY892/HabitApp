import {
  REMOVE_GOAL,
  ADD_GOAL,
  CLEAR,
  TOGGLE_COMPLETION,
  EDIT_GOAL,
  HYDRATE,
} from "./GoalTypes";
import { calcPeriods } from "./calcPeriods";

// The reducer is listening for an action, which is the type that we defined in the GoalTypes.js file
const GoalReducer = (state, action) => {
  // The switch statement is checking the type of action that is being passed in
  switch (action.type) {
    // If the action type is ADD_GOAL, we want to add the item to the goalItems array
    case ADD_GOAL:
      if (!state.goalItems.find((item) => item.id === action.payload.id)) {
        state.goalItems.push({
          ...action.payload,
        });
      }

      return {
        ...state,
        goalItems: [...state.goalItems],
      };

    case EDIT_GOAL: {
      const { id } = action.payload;
      const updatedGoals = state.goalItems.map((goal) => {
        if (goal.id === id) {
          return {
            ...goal,
            ...action.payload, // Merge the updated fields into the existing goal
          };
        }
        return goal;
      });
      return {
        ...state,
        goalItems: [...updatedGoals],
      };
    }

    // If the action type is REMOVE_GOAL, we want to remove the item from the goalItems array
    case REMOVE_GOAL:
      return {
        ...state,
        goalItems: [
          ...state.goalItems.filter((item) => item.id !== action.payload),
        ],
      };

    // If the action type is CLEAR, we want to clear the goalItems array
    case CLEAR:
      return {
        goalItems: [],
      };

    case TOGGLE_COMPLETION: {
      const goal = state.goalItems.find(
        (item) => item.id === action.payload.id
      );

      if (goal) {
        if (!goal.completions[action.payload.date]) {
          goal.completions[action.payload.date] = {
            selected: true,
            color: "blue",
          };
          console.log(
            `completion added for goal ${goal.title} on ${action.payload.date}`
          );
        } else {
          delete goal.completions[action.payload.date];
          console.log(
            `Completion removed for goal ${goal.title} on ${action.payload.date}`
          );
        }
      }
      const toggledGoals = [...state.goalItems];
      const updatedGoals = calcPeriods(toggledGoals);
      // console.log(updatedGoals[0].completions);
      return { ...state, goalItems: [...updatedGoals] };
    }

    // If the action type is HYDRATE, we want to insert the payload data from Async Storage to the state
    case HYDRATE:
      return {
        ...state,
        goalItems: action.payload,
      };

    // Return the state if the action type is not found
    default:
      return state;
  }
};

export default GoalReducer;
