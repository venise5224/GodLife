"use client";

import { useState } from "react";
import { Activity } from "@/types/Activity";
import { getCurrentTime } from "@/utils/currentTime";
import { useActivityStore } from "@/stores/useActivityStore";
import ActionButton from "@/components/ActivityBoard/ActionButton";
import CurrentTime from "./CurrentTime";
import ElapsedTime from "./ElapsedTime";

const ActivityLogger = () => {
  const [activityName, setActivityName] = useState("");
  const { runningActivity, setRunningActivity, addActivity, updateActivity } =
    useActivityStore();

  const handleStart = () => {
    if (runningActivity) return;
    if (!activityName.trim()) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      activityName,
      startTime: getCurrentTime(),
      date: new Date().toISOString().split("T")[0], // 현재 날짜 (YYYY-MM-DD)
      source: "log",
    };

    addActivity(newActivity);
    setRunningActivity(newActivity);
  };

  const handleEnd = () => {
    if (!runningActivity) return;

    const finishedActivity: Activity = {
      ...runningActivity,
      endTime: getCurrentTime(),
    };

    updateActivity(finishedActivity);
    setRunningActivity(null);
    setActivityName("");
  };

  // 진행 중 활동 이름 변경
  const handleChangeActivityName = () => {
    if (runningActivity) {
      updateActivity(runningActivity);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl space-y-2">
      {/* 디스플레이 영역 */}
      <div className="bg-gray-800 p-4 rounded-xl text-center text-lg h-[112px]">
        {runningActivity ? (
          <>
            <input
              type="text"
              className="w-full p-2 rounded-xl text-center text-white border-0 focus:outline-none"
              value={runningActivity.activityName}
              onChange={(e) =>
                setRunningActivity({
                  ...runningActivity,
                  activityName: e.target.value,
                })
              }
              onKeyDown={(e) => e.key === "Enter" && handleChangeActivityName()}
              onBlur={handleChangeActivityName}
            />
            <ElapsedTime runningActivity={runningActivity} />
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
            <CurrentTime />
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
};

export default ActivityLogger;
