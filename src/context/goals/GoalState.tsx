import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import calcPeriods from "./calcPeriods";

const useGoalStore = create(
  persist(
    (set) => ({
      goalItems: [],
      addGoal: (payload) =>
        set((state) => ({ goalItems: [...state.goalItems, payload] })),
      editGoal: (payload) =>
        set((state) => {
          const updatedGoals = state.goalItems.map((goal) => {
            if (goal.id === payload.id) {
              return {
                ...goal,
                ...payload,
              };
            }
            return goal;
          });
          return { goalItems: [...updatedGoals] };
        }),
      removeGoal: (payload) =>
        set((state) => ({
          goalItems: [...state.goalItems.filter((item) => item.id !== payload)],
        })),
      // TODO: clearGoals: () => set({ goalItems: [] }),
      toggleCompletion: (id, date) =>
        set((state) => {
          const goal = state.goalItems.find((item) => item.id === id);
          console.log("toggle firing");
          console.log(date);

          if (goal) {
            console.log("goal exists");
            if (!goal.completions[date]) {
              goal.completions[date] = {
                selected: true,
                color: "blue",
              };
              console.log(`completion added for goal ${goal.title} on ${date}`);
            } else {
              delete goal.completions[date];
              console.log(
                `Completion removed for goal ${goal.title} on ${date}`
              );
            }
          }
          const toggledGoals = [...state.goalItems];
          const updatedGoals = calcPeriods(toggledGoals);
          // console.log(updatedGoals[0].completions);
          return { goalItems: [...updatedGoals] };
        }),
    }),
    {
      name: "goalItems",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useGoalStore;
