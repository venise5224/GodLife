"use client";

import { useMemo } from "react";
import { useActivityStore } from "@/stores/useActivityStore";
import { parse, differenceInMinutes } from "date-fns";
import { TIME_FMT } from "@/utils/constants";

export default function PlanVsLogStats() {
  const { activityList } = useActivityStore();

  // 계획(plan)만 필터링
  const plans = useMemo(
    () => activityList.filter((a) => a.source === "plan"),
    [activityList]
  );

  // 기록(log)만 필터링
  const logs = useMemo(
    () => activityList.filter((a) => a.source === "log" && a.endTime),
    [activityList]
  );

  // 활동별 계획 총 시간 계산
  const planMap = useMemo(() => {
    const map = new Map<string, number>();
    plans.forEach((plan) => {
      if (!plan.endTime) return;

      const mins = differenceInMinutes(
        parse(plan.endTime, TIME_FMT, new Date()),
        parse(plan.startTime, TIME_FMT, new Date())
      );
      if (mins <= 0) return;
      map.set(plan.activityName, (map.get(plan.activityName) ?? 0) + mins);
    });
    return map;
  }, [plans]);

  // 활동별 기록 총 시간 계산
  const logMap = useMemo(() => {
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
    return map;
  }, [logs]);

  // Plan 대비 Log 계산 (계획이 없는 활동 제외)
  const grouped = useMemo(() => {
    const activities = Array.from(
      new Set([...planMap.keys(), ...logMap.keys()])
    );
    return activities

      .map((name) => {
        const planMinutes = planMap.get(name) ?? 0;
        const logMinutes = logMap.get(name) ?? 0;
        const percent = (logMinutes / planMinutes) * 100;

        if (planMinutes <= 0) return null; // 계획이 없는 활동 제외

        return {
          name,
          planMinutes,
          logMinutes,
          percentOfPlan: percent,
        };
      })
      .filter(
        (
          x
        ): x is {
          name: string;
          planMinutes: number;
          logMinutes: number;
          percentOfPlan: number;
        } => !!x
      );
  }, [planMap, logMap]);

  // 달성률 색상
  const getBarColor = (percent: number) => {
    if (percent < 50) return "bg-red-500";
    if (percent < 80) return "bg-orange-500";
    if (percent <= 100) return "bg-green-500";
    return "bg-green-700";
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">계획 대비 기록</h2>

      {grouped.map((row) => (
        <div
          key={row.name}
          className="p-3 border rounded-xl shadow-sm bg-white space-y-1"
        >
          {/* 첫 줄: 이름 | 계획시간 / 실제시간 | 달성률 % */}
          <div className="flex justify-between items-center mb-1 text-sm">
            <span className="font-semibold">{row.name}</span>
            <span>
              {Math.floor(row.planMinutes / 60)}h {row.planMinutes % 60}m /{" "}
              {Math.floor(row.logMinutes / 60)}h {row.logMinutes % 60}m
            </span>
            <span className="font-medium">{row.percentOfPlan.toFixed(1)}%</span>
          </div>

          {/* 둘째 줄: 진행 바 */}
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div
              className={`h-3 ${getBarColor(row.percentOfPlan)}`}
              style={{ width: `${Math.min(row.percentOfPlan, 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
