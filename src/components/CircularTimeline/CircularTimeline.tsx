"use client";

import { useEffect, useState } from "react";
import { useActivityStore } from "@/stores/useActivityStore";
import TimelineActivity from "./TimelineActivity";
import TimelineRunner from "./TimelineRunner";
import { polarToCartesian } from "@/utils/timeLine";

const SIZE = 500; // SVG 크기
const r = SIZE / 2 - 50; // 반지름
const cx = SIZE / 2;
const cy = SIZE / 2;

const CircularTimeline = () => {
  const [currentMinutes, setCurrentMinutes] = useState<number | null>(null);
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const { activityList } = useActivityStore();

  useEffect(() => {
    function getMinutes(date: Date) {
      return date.getHours() * 60 + date.getMinutes();
    }
    setCurrentMinutes(getMinutes(new Date()));

    const timer = setInterval(() => {
      setCurrentMinutes(getMinutes(new Date()));
    }, 60 * 1000); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, []);

  const sortedActivities = [...activityList];
  if (hoveredPath) {
    const idx = sortedActivities.findIndex((a) => a.id === hoveredPath);
    if (idx !== -1) {
      const [hovered] = sortedActivities.splice(idx, 1);
      sortedActivities.push(hovered); // 맨 뒤로 이동
    }
  }

  return (
    <svg className="w-full h-full" viewBox={`0 0 ${SIZE} ${SIZE}`}>
      {/* 배경 원 */}
      <circle
        cx={cx}
        cy={cy}
        r={r}
        fill="#f8f9fa"
        stroke="#1e2939"
        strokeWidth="2"
      />

      {/* 활동 영역 */}
      {sortedActivities.map((activity) => (
        <TimelineActivity
          key={activity.id}
          activity={activity}
          cx={cx}
          cy={cy}
          r={r}
          hovered={hoveredPath === activity.id}
          onHover={setHoveredPath}
          currentMinutes={currentMinutes}
        />
      ))}

      {/* 시간 눈금 */}
      {Array.from({ length: 24 }).map((_, i) => {
        const pos = polarToCartesian(cx, cy, i * 60, r + 20);
        return (
          <text
            key={i}
            x={pos.x}
            y={pos.y}
            textAnchor="middle"
            alignmentBaseline="middle"
            fontSize="10"
            fill="#000"
          >
            {i}
          </text>
        );
      })}

      {/* 현재 시간 표시 */}
      {currentMinutes !== null && (
        <TimelineRunner currentMinutes={currentMinutes} cx={cx} cy={cy} r={r} />
      )}
    </svg>
  );
};

export default CircularTimeline;
