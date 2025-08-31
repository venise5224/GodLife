"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ResetHourState {
  resetHour: number;
  setResetHour: (hour: number) => void;
}

export const useResetHourStore = create<ResetHourState>()(
  persist(
    (set) => ({
      resetHour: 0,
      setResetHour: (hour: number) => set({ resetHour: hour }),
    }),
    {
      name: "reset-hour-storage",
    }
  )
);
