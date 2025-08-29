import { useEffect, useState } from "react";
import { useActivityStore } from "@/stores/useActivityStore";
import { useResetHour } from "./useResetHour";
import { getTodayKey } from "@/utils/getTodayKey";

const useTodayActivities = () => {
  const { resetHour } = useResetHour();
  const activityList = useActivityStore((s) => s.activityList);
  const [todayKey, setTodayKey] = useState(getTodayKey(resetHour));

  useEffect(() => {
    setTodayKey(getTodayKey(resetHour));

    const interval = setInterval(() => {
      setTodayKey(getTodayKey(resetHour));
    }, 60 * 1000); // 1분마다 체크
    return () => clearInterval(interval);
  }, [resetHour]);

  return activityList.filter((a) => a.date === todayKey);
};

export default useTodayActivities;

// setTimeout 방식
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { useActivityStore } from "@/stores/useActivityStore";
// import { useResetHour } from "./useResetHour";
// import { getTodayKey } from "@/utils/getTodayKey";

// const useTodayActivities = () => {
//   const { resetHour } = useResetHour();
//   const activityList = useActivityStore((s) => s.activityList);

//   // 초기 todayKey
//   const [todayKey, setTodayKey] = useState(getTodayKey(resetHour));
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   useEffect(() => {
//     function scheduleNextReset() {
//       // 남은 시간 계산
//       const now = new Date();
//       const nextReset = new Date(now);
//       nextReset.setHours(resetHour, 0, 0, 0);

//       if (nextReset <= now) {
//         // 이미 resetHour가 지났다면 내일로
//         nextReset.setDate(nextReset.getDate() + 1);
//       }

//       const delay = nextReset.getTime() - now.getTime();

//       // 예약
//       timeoutRef.current = setTimeout(() => {
//         setTodayKey(getTodayKey(resetHour));
//         scheduleNextReset(); // 다음 날도 예약
//       }, delay);
//     }

//     scheduleNextReset();

//     return () => {
//       if (timeoutRef.current) clearTimeout(timeoutRef.current);
//     };
//   }, [resetHour]);

//   return activityList.filter((a) => a.date === todayKey);
// };

// export default useTodayActivities;
