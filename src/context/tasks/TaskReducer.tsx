import {
  REMOVE_TASK,
  ADD_TASK,
  CLEAR,
  TOGGLE_COMPLETION,
  EDIT_TASK,
  HYDRATE,
} from "./TaskTypes";

// The reducer is listening for an action, which is the type that we defined in the TaskTypes.js file
const TaskReducer = (state, action) => {
  // The switch statement is checking the type of action that is being passed in
  switch (action.type) {
    // If the action type is ADD_TASK, we want to add the item to the taskItems array
    case ADD_TASK:
      if (!state.taskItems.find((item) => item.id === action.payload.id)) {
        state.taskItems.push({
          ...action.payload,
        });
      }

      return {
        ...state,
        taskItems: [...state.taskItems],
      };

    case EDIT_TASK: {
      const { id } = action.payload;
      const updatedTasks = state.taskItems.map((task) => {
        if (task.id === id) {
          return {
            ...task,
            ...action.payload, // Merge the updated fields into the existing task
          };
        }
        return task;
      });
      return {
        ...state,
        taskItems: [...updatedTasks],
      };
    }

    // If the action type is REMOVE_TASK, we want to remove the item from the taskItems array
    case REMOVE_TASK:
      return {
        ...state,
        taskItems: [
          ...state.taskItems.filter((item) => item.id !== action.payload),
        ],
      };

    // If the action type is CLEAR, we want to clear the taskItems array
    case CLEAR:
      return {
        taskItems: [],
      };

    case TOGGLE_COMPLETION: {
      const updatedTasks = state.taskItems.map((task) => {
        if (task.id === action.payload) {
          return {
            ...task,
            completed: !task.completed, // Merge the updated fields into the existing task
          };
        }
        return task;
      });

      const incompleteTasks = updatedTasks.filter((task) => !task.completed);
      const completedTasks = updatedTasks.filter((task) => task.completed);

      return {
        ...state,
        taskItems: [...incompleteTasks, ...completedTasks],
      };
    }

    // If the action type is HYDRATE, we want to insert the payload data from Async Storage to the state
    case HYDRATE:
      return {
        ...state,
        taskItems: action.payload,
      };

    // Return the state if the action type is not found
    default:
      return state;
  }
};

export default TaskReducer;
