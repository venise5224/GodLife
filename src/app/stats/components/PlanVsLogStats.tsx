"use client";

import useGroupedActivities from "@/hooks/useGroupedActivities";
import PlanVsLogStatsHeader from "./PlanVsLogStatsHeader";

export default function PlanVsLogStats() {
  const { grouped: planGrouped } = useGroupedActivities("plan");
  const { grouped: logGrouped } = useGroupedActivities("log");

  // 계획에 있는 활동들을 기준으로 삼음
  const activities = planGrouped.map((a) => a.name);

  // 계획과 기록을 합침
  const grouped = activities.map((name) => {
    const planMinutes = planGrouped.find((a) => a.name === name)?.minutes ?? 0;
    const logMinutes = logGrouped.find((a) => a.name === name)?.minutes ?? 0;

    return {
      name,
      planMinutes,
      logMinutes,
      percentOfPlan: (logMinutes / planMinutes) * 100,
    };
  });

  // 달성률 색상
  const getBarColor = (percent: number) => {
    if (percent < 50) return "bg-red-500";
    if (percent < 80) return "bg-orange-500";
    if (percent <= 100) return "bg-green-500";
    return "bg-green-700";
  };

  return (
    <div className="space-y-4">
      <PlanVsLogStatsHeader />

      {grouped.length > 0 ? (
        grouped.map((row) => (
          <div
            key={row.name}
            className="p-3 border rounded-xl text-xs sm:text-sm shadow-sm  space-y-1"
          >
            {/* 첫 줄: 이름 | 계획시간 / 실제시간 | 달성률 % */}
            <div className="grid grid-cols-3 mb-1 text-sm">
              <span className="text-xs sm:text-sm text-left font-semibold">
                {row.name}
              </span>
              <span className="text-xs sm:text-sm text-center">
                {Math.floor(row.planMinutes / 60)}h {row.planMinutes % 60}m /{" "}
                {Math.floor(row.logMinutes / 60)}h {row.logMinutes % 60}m
              </span>
              <span
                className={`text-xs sm:text-sm text-right font-medium ${getBarColor(
                  row.percentOfPlan
                ).replace("bg-", "text-")}`}
              >
                {row.percentOfPlan.toFixed(1)}%
              </span>
            </div>

            {/* 둘째 줄: 진행 바 */}
            <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-3 ${getBarColor(row.percentOfPlan)}`}
                style={{ width: `${Math.min(row.percentOfPlan, 100)}%` }}
              />
            </div>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">활동 계획이 없습니다.</p>
      )}
    </div>
  );
}
