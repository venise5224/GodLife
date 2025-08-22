"use client";

import { useState, useEffect } from "react";
import { Activity } from "@/types/Activity";
import ActionButton from "./ActionButton";
import { useCurrentTime } from "@/hooks/useCurrentTime";

interface ActivityLoggerProps {
  onAddActivity: (activity: Activity) => void;
}

function ActivityLogger({ onAddActivity }: ActivityLoggerProps) {
  const [activityName, setActivityName] = useState("");
  const [runningActivity, setRunningActivity] = useState<Activity | null>(null);
  const [elapsedSec, setElapsedSec] = useState(0);
  const currentTime = useCurrentTime();

  // 현재 진행 중인 활동의 경과 시간 업데이트
  useEffect(() => {
    if (!runningActivity) return;

    const [h, m, s] = runningActivity.startTime.split(":").map(Number);
    const start = new Date();
    start.setHours(h, m, s, 0);

    const tick = () => {
      const now = new Date();
      const diffSec = Math.floor((now.getTime() - start.getTime()) / 1000);
      setElapsedSec(diffSec);
    };

    tick(); // 시작하자마자 즉시 계산
    const timer = setInterval(tick, 1000);

    return () => clearInterval(timer);
  }, [runningActivity]);

  // 경과 시간 포맷 함수
  const formatElapsed = (sec: number): string => {
    if (sec < 60) {
      return `${sec}초 진행 중`;
    }

    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;

    if (h > 0) {
      return `${h}시간 ${m}분 ${s}초 진행 중`;
    }
    return `${m}분 ${s}초 진행 중`;
  };

  const getCurrentTime = (): string => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, "0");
    const m = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  const handleStart = () => {
    if (runningActivity) return;
    if (!activityName.trim()) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      activityName,
      startTime: getCurrentTime(),
      source: "log",
    };

    setRunningActivity(newActivity);
    setElapsedSec(0);
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
    setElapsedSec(0);
  };

  return (
    <div className="w-full bg-white p-4 rounded-2xl shadow-lg space-y-2 border-2">
      {/* 디스플레이 영역 */}
      <div className="bg-gray-800 p-4 rounded-xl text-center text-lg ">
        {runningActivity ? (
          <>
            <div className="w-full p-2 text-white border-0">
              {runningActivity.activityName}
            </div>
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

      {/* 조이스틱 버튼 영역 */}
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
