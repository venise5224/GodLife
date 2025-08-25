// stores/useActivityStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Activity } from "@/types/Activity";

interface ActivityState {
  activityList: Activity[];
  runningActivity: Activity | null;
  setRunningActivity: (activity: Activity | null) => void;
  addActivity: (activity: Activity) => void;
  updateActivity: (activity: Activity) => void;
  removeActivity: (id: string) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      activityList: [],
      runningActivity: null,

      setRunningActivity: (activity) => set({ runningActivity: activity }),

      addActivity: (activity) =>
        set((state) => ({
          activityList: [...state.activityList, activity],
        })),

      updateActivity: (activity) =>
        set((state) => ({
          activityList: state.activityList.map((a) =>
            a.id === activity.id ? activity : a
          ),
        })),

      removeActivity: (id) =>
        set((state) => ({
          activityList: state.activityList.filter((a) => a.id !== id),
        })),
    }),
    {
      name: "activity-storage", // localStorage key
    }
  )
);
