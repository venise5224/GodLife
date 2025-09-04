import { useEffect, useState } from "react";
import { useActivityStore } from "@/stores/useActivityStore";
import { getTodayKey } from "@/utils/getTodayKey";
import { useResetHourStore } from "@/stores/useResetHourStore";

const useTodayActivities = () => {
  const { resetHour } = useResetHourStore();
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
