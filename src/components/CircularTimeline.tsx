"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import running from "../../public/lottie/running.json";
import { useActivityStore } from "@/stores/useActivityStore";
import { parseTime } from "@/utils/parseTime";

const SIZE = 500; // SVG 크기
const r = SIZE / 2 - 50; // 반지름
const cx = SIZE / 2;
const cy = SIZE / 2;

const CircularTimeline = () => {
  const [currentMinutes, setCurrentMinutes] = useState<number | null>(null);
  const { activityList } = useActivityStore();
  const runnerPosition =
    currentMinutes !== null ? polarToCartesian(currentMinutes, r + 15) : null;

  useEffect(() => {
    // 시간 -> 분
    function getMinutes(date: Date) {
      return date.getHours() * 60 + date.getMinutes();
    }
    setCurrentMinutes(getMinutes(new Date()));

    const timer = setInterval(() => {
      setCurrentMinutes(getMinutes(new Date()));
    }, 60 * 1000); // 1분마다 업데이트

    return () => clearInterval(timer);
  }, []);

  // 분 -> 좌표
  function polarToCartesian(minutes: number, radius: number) {
    const angle = ((minutes / 1440) * 360 - 90) * (Math.PI / 180);

    const x = cx + radius * Math.cos(angle);
    const y = cy + radius * Math.sin(angle);

    return {
      x: Number(x.toFixed(4)),
      y: Number(y.toFixed(4)),
      angle,
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
      {activityList.map((activity) => {
        const start = parseTime(activity.startTime);
        const end =
          activity.source === "log" &&
          !activity.endTime &&
          currentMinutes !== null
            ? currentMinutes
            : parseTime(activity.endTime || activity.startTime);
        const mid = (start + end) / 2;
        const textPos = polarToCartesian(mid, r * 0.6);

        // 색상/스타일 구분
        let fillColor = "transparent";
        let strokeDasharray: string | undefined;

        if (activity.source === "plan") {
          fillColor = "rgba(234, 179, 8, 0.3)"; // 연노랑
        }

        if (activity.source === "log") {
          fillColor = "rgba(34, 197, 94, 1)"; // 초록
          if (!activity.endTime) {
            strokeDasharray = "4 4";
          }
        }

        return (
          <g key={activity.id}>
            <path
              d={describeArc(start, end, r)}
              fill={fillColor}
              stroke={`rgba(0,0,0,1)`}
              strokeWidth={1}
              strokeDasharray={strokeDasharray}
            />
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
            fill="#000"
          >
            {i}
          </text>
        );
      })}

      {/* 현재 시간 표시 */}
      {runnerPosition && (
        <g
          transform={`rotate(${(runnerPosition.angle * 180) / Math.PI + 90}, ${
            runnerPosition.x
          }, ${runnerPosition.y})`}
        >
          <foreignObject
            x={runnerPosition.x - 30}
            y={runnerPosition.y - 30}
            width={60}
            height={60}
          >
            <Lottie animationData={running} loop />
          </foreignObject>
        </g>
      )}
    </svg>
  );
};

export default CircularTimeline;
