"use client";

import { useState } from "react";
import { Activity } from "@/types/Activity";
import ActionButton from "../ActionButton";
import { useActivityStore } from "@/stores/useActivityStore";
import { toHMS } from "@/utils/toHMS";

function ActivityPlanner() {
  const [activityName, setActivityName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const { addActivity } = useActivityStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityName.trim() || !startTime || !endTime) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      activityName,
      startTime: toHMS(startTime),
      endTime: toHMS(endTime),
      source: "plan", // ActivityPlanner에서 추가된 활동은 "plan"으로 설정
    };

    addActivity(newActivity);

    setActivityName("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <form className="w-full rounded-2xl space-y-2" onSubmit={handleSubmit}>
      <div className="bg-gray-800 p-4 rounded-xl text-center text-lg h-[112px]">
        <input
          type="text"
          placeholder="할 일을 입력하세요"
          className="w-full p-2 rounded-xl text-center text-white border-0 focus:outline-none"
          value={activityName}
          onChange={(e) => setActivityName(e.target.value)}
        />
        <div className="mt-2 flex gap-2 h-[30px]">
          <input
            type="time"
            placeholder="시작 시간"
            className="flex-1 p-2 border-2 border-green-500 rounded text-green-500 bg-white"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <input
            type="time"
            className="flex-1 p-2 border-2 border-red-500 rounded text-red-500 bg-white"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
          />
        </div>
      </div>
      <div className="flex pt-2">
        <ActionButton
          type="submit"
          text="저장"
          bgColor="bg-yellow-500"
          activeColor="bg-yellow-600"
          disabled={!activityName || !startTime || !endTime}
        />
      </div>
    </form>
  );
}

export default ActivityPlanner;
