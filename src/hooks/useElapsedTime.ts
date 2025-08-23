"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types/Activity";

// Activity의 startTime을 받아서 경과 시간(초)을 반환
export const useElapsedTime = (activity: Activity | null) => {
  const [elapsedSec, setElapsedSec] = useState(0);

  useEffect(() => {
    if (!activity) {
      setElapsedSec(0);
      return;
    }

    const [h, m, s] = activity.startTime.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m, s, 0);

    const tick = () => {
      const now = new Date();
      const diffSec = Math.floor((now.getTime() - start.getTime()) / 1000);
      setElapsedSec(diffSec);
    };

    tick(); // 즉시 계산
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [activity]);

  return elapsedSec;
};
