"use client";

import React from "react";
import { parseTime } from "@/utils/parseTime";
import { describeArc, polarToCartesian } from "@/utils/timeLine";
import { Activity } from "@/types/Activity";

interface TimelineActivityProps {
  activity: Activity;
  cx: number;
  cy: number;
  r: number;
  hovered: boolean;
  onHover: (id: string | null) => void;
  currentMinutes: number | null;
}

export default function TimelineActivity({
  activity,
  cx,
  cy,
  r,
  hovered,
  onHover,
  currentMinutes,
}: TimelineActivityProps) {
  const start = parseTime(activity.startTime);
  const end =
    activity.source === "log" && !activity.endTime && currentMinutes !== null
      ? currentMinutes
      : parseTime(activity.endTime || activity.startTime);
  const mid = (start + end) / 2;
  const textPos = polarToCartesian(cx, cy, mid, r * 0.6);

  const fillColor =
    activity.source === "plan"
      ? "rgba(234, 179, 8, 1)"
      : "rgba(34, 197, 94, 1)";

  const strokeDasharray =
    activity.source === "log" && !activity.endTime ? "4 4" : undefined;

  const radius = r + (hovered ? 10 : 0);
  const arcPath = describeArc(cx, cy, start, end, radius);

  const textLength = activity.activityName.length * 9;
  const textHeight = 14;

  return (
    <g
      onMouseEnter={() => onHover(activity.id)}
      onMouseLeave={() => onHover(null)}
    >
      <path
        d={arcPath}
        fill={fillColor}
        stroke="rgba(0,0,0,1)"
        strokeWidth={1}
        strokeDasharray={strokeDasharray}
      />

      <clipPath id={`clip-${activity.id}`}>
        <path d={arcPath} />
      </clipPath>

      {hovered && (
        <rect
          x={textPos.x - textLength / 2 - 2}
          y={textPos.y - textHeight / 2}
          width={textLength + 4}
          height={textHeight}
          fill="rgba(255,255,255,0.8)"
          rx={2}
        />
      )}

      <text
        clipPath={hovered ? undefined : `url(#clip-${activity.id})`}
        x={textPos.x}
        y={textPos.y}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="12"
        fill="#333"
      >
        {activity.activityName}
      </text>
    </g>
  );
}
