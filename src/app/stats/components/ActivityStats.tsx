"use client";

import ActivityStatsHeader from "./ActivityStatsHeader";
import ActivityStatItem from "./ActivityStatsItem";
import useGroupedActivities from "@/hooks/useGroupedActivities";

interface ActivityStatsProps {
  source: "plan" | "log";
}

export default function ActivityStats({ source }: ActivityStatsProps) {
  const { totalMinutes, grouped } = useGroupedActivities(source);

  return (
    <div className="space-y-4">
      <ActivityStatsHeader totalMinutes={totalMinutes} source={source} />

      {grouped.map((row) => (
        <ActivityStatItem key={row.name} row={row} source={source} />
      ))}
    </div>
  );
}
