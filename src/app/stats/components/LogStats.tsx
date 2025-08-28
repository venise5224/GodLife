"use client";

import { useMemo } from "react";
import { useActivityStore } from "@/stores/useActivityStore";
import { parse, differenceInMinutes } from "date-fns";
import { DAY_MINUTES, TIME_FMT } from "@/utils/constants";

export default function LogStats() {
  const { activityList } = useActivityStore();

  const logs = useMemo(
    () => activityList.filter((a) => a.source === "log" && !!a.endTime),
    [activityList]
  );

  const totalMinutes = useMemo(
    () =>
      logs.reduce((acc, cur) => {
        if (!cur.endTime) return acc;

        const s = parse(cur.startTime, TIME_FMT, new Date());
        const e = parse(cur.endTime, TIME_FMT, new Date());

        return acc + differenceInMinutes(e, s);
      }, 0),
    [logs]
  );

  const grouped = useMemo(() => {
    const map = new Map<string, number>();
    logs.forEach((log) => {
      if (!log.endTime) return;

      const mins = differenceInMinutes(
        parse(log.endTime, TIME_FMT, new Date()),
        parse(log.startTime, TIME_FMT, new Date())
      );
      if (mins <= 0) return;
      map.set(log.activityName, (map.get(log.activityName) ?? 0) + mins);
    });

    return [...map.entries()]
      .sort((a, b) => b[1] - a[1])
      .map(([name, minutes]) => ({
        name,
        minutes,
        percentOfDay: (minutes / DAY_MINUTES) * 100,
        percentOfTotal: totalMinutes ? (minutes / totalMinutes) * 100 : 0,
      }));
  }, [logs, totalMinutes]);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">기록 통계</h2>

      <div className="text-gray-700 font-medium mb-2">
        총 사용 시간: {Math.floor(totalMinutes / 60)}시간 {totalMinutes % 60}분
      </div>

      {grouped.map((row) => (
        <div
          key={row.name}
          className="p-3 border rounded-xl shadow-sm bg-white space-y-1"
        >
          {/* 첫 줄: 이름 + 총 시간 */}
          <div className="flex justify-between items-center mb-1">
            <span className="font-semibold">{row.name}</span>
            <span className="text-sm text-gray-500">
              {Math.floor(row.minutes / 60)}시간 {row.minutes % 60}분
            </span>
          </div>

          {/* 둘째 줄: 24시간 대비 */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-blue-500 w-24">24시간 대비</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-blue-500"
                style={{ width: `${row.percentOfDay}%` }}
              />
            </div>
            <span className="text-xs text-blue-500 w-12 text-right">
              {row.percentOfDay.toFixed(1)}%
            </span>
          </div>

          {/* 셋째 줄: 전체 기록 대비 */}
          <div className="flex items-center space-x-2">
            <span className="text-xs text-green-500 w-24">전체 기록 대비</span>
            <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-3 bg-green-500"
                style={{ width: `${row.percentOfTotal}%` }}
              />
            </div>
            <span className="text-xs text-green-500 w-12 text-right">
              {row.percentOfTotal.toFixed(1)}%
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
