import { useMemo } from "react";
import { parse, differenceInMinutes } from "date-fns";
import { DAY_MINUTES, TIME_FMT } from "@/utils/constants";
import useTodayActivities from "./useTodayActivities";

const useGroupedActivities = (source: "plan" | "log") => {
  const activityList = useTodayActivities();

  return useMemo(() => {
    const filtered = activityList.filter(
      (a) => a.source === source && a.endTime
    );

    const map = new Map<string, number>();
    filtered.forEach((a) => {
      const mins = differenceInMinutes(
        parse(a.endTime!, TIME_FMT, new Date()),
        parse(a.startTime, TIME_FMT, new Date())
      );
      if (mins > 0)
        map.set(a.activityName, (map.get(a.activityName) ?? 0) + mins);
    });

    const totalMinutes = [...map.values()].reduce((acc, v) => acc + v, 0);
    const grouped = [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, minutes]) => ({
        name,
        minutes,
        percentOfDay: (minutes / DAY_MINUTES) * 100,
        percentOfTotal: totalMinutes ? (minutes / totalMinutes) * 100 : 0,
      }));

    return {
      totalMinutes,
      grouped,
    };
  }, [activityList, source]);
};

export default useGroupedActivities;
