"use client";

import { useState } from "react";
import { Activity } from "@/types/Activity";
import ActionButton from "@/components/ActionButton";
import { useCurrentTime } from "@/hooks/useCurrentTime";
import { getCurrentTime } from "@/utils/time";
import { formatElapsed } from "@/utils/formatElapsed";
import { useElapsedTime } from "@/hooks/useElapsedTime";

interface ActivityLoggerProps {
  onAddActivity: (activity: Activity) => void;
}

function ActivityLogger({ onAddActivity }: ActivityLoggerProps) {
  const [activityName, setActivityName] = useState("");
  const [runningActivity, setRunningActivity] = useState<Activity | null>(null);
  const currentTime = useCurrentTime(); // 현재 시간 (HH : MM : SS)
  const elapsedSec = useElapsedTime(runningActivity); // 경과 시간(초)

  const handleStart = () => {
    if (runningActivity) return;
    if (!activityName.trim()) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      activityName,
      startTime: getCurrentTime(),
      source: "log",
    };

    onAddActivity(newActivity);
    setRunningActivity(newActivity);
  };

  const handleEnd = () => {
    if (!runningActivity) return;

    const finishedActivity: Activity = {
      ...runningActivity,
      endTime: getCurrentTime(),
    };

    onAddActivity(finishedActivity);
    setRunningActivity(null);
    setActivityName("");
  };

  // 진행 중 활동명 변경 후 제출 함수
  const handleApplyName = () => {
    if (runningActivity) {
      onAddActivity(runningActivity);
    }
  };

  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow-lg space-y-2 border-2">
      {/* 디스플레이 영역 */}
      <div className="bg-gray-800 p-4 rounded-xl text-center text-lg ">
        {runningActivity ? (
          <>
            <input
              type="text"
              className="w-full p-2 rounded-xl text-center text-white border-0 focus:outline-none"
              value={runningActivity.activityName}
              onChange={(e) =>
                setRunningActivity((prev) =>
                  prev ? { ...prev, activityName: e.target.value } : prev
                )
              }
              onKeyDown={(e) => e.key === "Enter" && handleApplyName()}
              onBlur={handleApplyName}
            />
            <div className="mt-2 text-yellow-400">
              {formatElapsed(elapsedSec)}
            </div>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="할 일을 입력하세요"
              className="w-full p-2 rounded-xl text-center text-white border-0 focus:outline-none"
              value={activityName}
              onChange={(e) => setActivityName(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleStart();
                }
              }}
            />
            <div className="mt-2 text-yellow-400">{currentTime}</div>
          </>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className="mt-4 flex gap-4 justify-around">
        <ActionButton
          text="Start"
          bgColor="bg-green-500"
          activeColor="bg-green-600"
          onClick={handleStart}
          disabled={!!runningActivity || !activityName.trim()}
        />
        <ActionButton
          text="End"
          bgColor="bg-red-500"
          activeColor="bg-red-600"
          onClick={handleEnd}
          disabled={!runningActivity}
        />
      </div>
    </div>
  );
}

export default ActivityLogger;
