"use client";

import React, { useEffect, useState } from "react";
import Lottie from "lottie-react";
import running from "../../../public/lottie/running.json";
import whiteRunning from "../../../public/lottie/running-white.json";
import { polarToCartesian } from "@/utils/timeLine";

interface TimelineRunnerProps {
  currentMinutes: number;
  cx: number;
  cy: number;
  r: number;
}

const TimelineRunner = ({ currentMinutes, cx, cy, r }: TimelineRunnerProps) => {
  const runnerPosition = polarToCartesian(cx, cy, currentMinutes, r + 15);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // 클라이언트에서 localStorage 접근
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark");
  }, []);

  return (
    <g
      className="pointer-events-none"
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
        <Lottie animationData={isDark ? whiteRunning : running} loop />
      </foreignObject>
    </g>
  );
};

export default TimelineRunner;
