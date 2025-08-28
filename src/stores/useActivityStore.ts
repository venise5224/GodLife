// stores/useActivityStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Activity } from "@/types/Activity";

interface ActivityState {
  activityList: Activity[]; // 모든 활동 (계획 + 기록)
  runningActivity: Activity | null; // 현재 진행 중인 활동 (실시간 기록용)
  setRunningActivity: (activity: Activity | null) => void; // 현재 활동 설정
  addActivity: (activity: Activity) => void; // 새 활동 추가
  updateActivity: (activity: Activity) => void; // 활동 업데이트
  removeActivity: (id: string) => void; // 활동 삭제
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
