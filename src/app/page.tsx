"use client";

import { useState } from "react";
import CircularTimeline from "@/components/CircularTimeline";
import ActivityStats from "@/components/ActivityStats";
import TodoList from "@/components/TodoList";
import { Activity } from "@/types/Activity";
import ActivityBoard from "@/components/ActivityBoard/ActivityBoard";

function HomePage() {
  const [activityList, setActivityList] = useState<Activity[]>([]);

  const handleAddActivity = (activity: Activity) => {
    setActivityList((prev) => {
      const exists = prev.find((a) => a.id === activity.id);
      if (exists) {
        return prev.map((a) => (a.id === activity.id ? activity : a));
      }
      return [...prev, activity];
    });
  };

  return (
    <main className="h-[820px] flex flex-col md:flex-row">
      <section className="md:w-1/2">
        <CircularTimeline activityList={activityList} />
      </section>

      <section className="md:w-1/2 flex flex-col gap-4 p-4 pb-[100px] md:pb-[20px] md:overflow-y-auto">
        <TodoList />
        <ActivityBoard onAddActivity={handleAddActivity} />
        <ActivityStats />
      </section>
    </main>
  );
}

export default HomePage;
