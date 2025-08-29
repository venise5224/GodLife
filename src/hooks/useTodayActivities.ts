import { useActivityStore } from "@/stores/useActivityStore";

const useTodayActivities = () => {
  const activityList = useActivityStore((s) => s.activityList);
  const todayKey = new Date().toISOString().split("T")[0];

  return activityList.filter((a) => a.date === todayKey);
};

export default useTodayActivities;
