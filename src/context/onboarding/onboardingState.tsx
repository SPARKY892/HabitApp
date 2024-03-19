import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useOnboardingStore = create(
  persist(
    (set) => ({
      isFirstLaunch: true,
      setIsFirstLaunch: (payload) => set(() => ({ isFirstLaunch: payload })),
    }),
    {
      name: "onboardingStatus",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useOnboardingStore;
