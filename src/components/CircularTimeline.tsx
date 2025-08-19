"use client";

import { useEffect, useState } from "react";
import { Activity } from "@/types/Activity";

interface CircularTimelineProps {
  activityList: Activity[];
}

const CircularTimeline = ({ activityList }: CircularTimelineProps) => {
  const size = 400; // SVG 크기
  const r = 150; // 반지름
  const cx = size / 2;
  const cy = size / 2;

  const [currentMinutes, setCurrentMinutes] = useState(getMinutes(new Date()));

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentMinutes(getMinutes(new Date()));
    }, 60 * 1000); // 1분마다 업데이트
    return () => clearInterval(timer);
  }, []);

  // 시간 -> 분
  function getMinutes(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
  }

  // "HH:MM" -> 분
  function parseTime(t: string) {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  }

  // 분 -> 좌표
  function polarToCartesian(minutes: number, radius: number) {
    const angle = ((minutes / 1440) * 360 - 90) * (Math.PI / 180);
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  // 부채꼴 Path
  function describeArc(start: number, end: number, radius: number) {
    const startCoord = polarToCartesian(start, radius);
    const endCoord = polarToCartesian(end, radius);
    const largeArc = end - start > 720 ? 1 : 0;

    return [
      `M ${cx},${cy}`,
      `L ${startCoord.x},${startCoord.y}`,
      `A ${radius},${radius} 0 ${largeArc},1 ${endCoord.x},${endCoord.y}`,
      "Z",
    ].join(" ");
  }

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${size} ${size}`}>
      {/* 배경 원 */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#f8f9fa"
        stroke="#ccc"
        strokeWidth="2"
      />

      {/* 활동 영역 */}
      {activityList.map((activity) => {
        const start = parseTime(activity.startTime);
        const end = parseTime(activity.endTime);
        const mid = (start + end) / 2;
        const textPos = polarToCartesian(mid, r * 0.6);

        return (
          <g key={activity.id}>
            <path d={describeArc(start, end, r)} fill="rgba(100,150,250,0.5)" />
            <text
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
      })}

      {/* 시간 눈금 */}
      {Array.from({ length: 24 }).map((_, i) => {
        const pos = polarToCartesian(i * 60, r + 20);
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="10"
            fill="#666"
          >
            {i}
          </text>
        );
      })}

      {/* 현재 시간 표시 */}
      <line
        x1={cx}
        y1={cy}
        x2={polarToCartesian(currentMinutes, r).x}
        y2={polarToCartesian(currentMinutes, r).y}
        stroke="red"
        strokeWidth="2"
      />
    </svg>
  );
};

export default CircularTimeline;
