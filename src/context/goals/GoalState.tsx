import React, { useEffect, useReducer, useState } from "react";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";
import calcPeriods from "./calcPeriods";

const useGoalStore = create(
  /* persist( */
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
            console.log(`Completion removed for goal ${goal.title} on ${date}`);
          }
        }
        const toggledGoals = [...state.goalItems];
        const updatedGoals = calcPeriods(toggledGoals);
        // console.log(updatedGoals[0].completions);
        return { goalItems: [...updatedGoals] };
      }),
  })
  /* {
      name: "goalItems",
      storage: createJSONStorage(() => AsyncStorage),
    }
  ) */
);

/*
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
    */

export default useGoalStore;

/*
  // Function to add/remove a date from completions
  const toggleCompletion = (id, date) => {
    dispatch({ type: "TOGGLE_COMPLETION", payload: { id, date } });
  };
*/
