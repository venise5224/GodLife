"use client";

import { useState } from "react";
import { Activity } from "@/types/Activity";

interface ActivityPlannerProps {
  onAddActivity: (activity: Activity) => void;
}

function ActivityPlanner({ onAddActivity }: ActivityPlannerProps) {
  const [activityName, setActivityName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activityName.trim() || !startTime || !endTime) return;

    const newActivity: Activity = {
      id: Date.now().toString(),
      activityName,
      startTime,
      endTime,
      source: "plan", // ActivityPlanner에서 추가된 활동은 "plan"으로 설정
    };

    onAddActivity(newActivity);

    setActivityName("");
    setStartTime("");
    setEndTime("");
  };

  return (
    <form
      className="w-full bg-white p-4 rounded-2xl shadow-lg space-y-2 border-2"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        placeholder="활동 이름"
        className="w-full p-2 border rounded"
        value={activityName}
        onChange={(e) => setActivityName(e.target.value)}
      />
      <div className="flex gap-2">
        <input
          type="time"
          className="flex-1 p-2 border rounded"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
        <input
          type="time"
          className="flex-1 p-2 border rounded"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        저장
      </button>
    </form>
  );
}

export default ActivityPlanner;
