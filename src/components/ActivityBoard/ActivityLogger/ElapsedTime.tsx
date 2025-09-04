"use client";

import useElapsedTime from "@/hooks/useElapsedTime";
import { formatElapsed } from "@/utils/formatElapsed";
import { Activity } from "@/types/Activity";

interface ElapsedTimeProps {
  runningActivity: Activity | null;
}

const ElapsedTime = ({ runningActivity }: ElapsedTimeProps) => {
  const elapsedSec = useElapsedTime(runningActivity); // 경과 시간(초)

  return (
    <div className="mt-1 sm:mt-2 text-sm sm:text-lg text-yellow-400">
      {formatElapsed(elapsedSec)}
    </div>
  );
};

export default ElapsedTime;
