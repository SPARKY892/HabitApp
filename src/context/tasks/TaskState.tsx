import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useTaskStore = create(
  persist(
    (set) => ({
      taskItems: [],
      addTask: (payload) =>
        set((state) => ({ taskItems: [...state.taskItems, payload] })),
      editTask: (payload) =>
        set((state) => {
          const updatedTasks = state.taskItems.map((task) => {
            if (task.id === payload.id) {
              return {
                ...task,
                ...payload,
              };
            }
            return task;
          });
          return { taskItems: [...updatedTasks] };
        }),
      removeTask: (payload) =>
        set((state) => ({
          taskItems: [...state.taskItems.filter((item) => item.id !== payload)],
        })),
      // TODO: clearTasks: () => set({ taskItems: [] }),
      toggleCompletion: (payload) =>
        set((state) => {
          const updatedTasks = state.taskItems.map((task) => {
            if (task.id === payload) {
              return {
                ...task,
                completed: !task.completed, // Merge the updated fields into the existing task
              };
            }
            return task;
          });

          const incompleteTasks = updatedTasks.filter(
            (task) => !task.completed
          );
          const completedTasks = updatedTasks.filter((task) => task.completed);

          return {
            taskItems: [...incompleteTasks, ...completedTasks],
          };
        }),
    }),
    {
      name: "taskItems",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useTaskStore;
