"use client";

import React from "react";
import Lottie from "lottie-react";
import running from "../../../public/lottie/running.json";
import { polarToCartesian } from "@/utils/timeLine";

interface TimelineRunnerProps {
  currentMinutes: number;
  cx: number;
  cy: number;
  r: number;
}

export default function TimelineRunner({
  currentMinutes,
  cx,
  cy,
  r,
}: TimelineRunnerProps) {
  const runnerPosition = polarToCartesian(cx, cy, currentMinutes, r + 15);

  return (
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
  );
}
