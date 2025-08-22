"use client";

import { useState } from "react";
import CircularTimeline from "@/components/CircularTimeline";
import ActivityPlanner from "@/components/ActivityPlanner";
import ActivityStats from "@/components/ActivityStats";
import TodoList from "@/components/TodoList";
import { Activity } from "@/types/Activity";
import ActivityLogger from "@/components/ActivityLogger";

function HomePage() {
  const [activityList, setActivityList] = useState<Activity[]>([]);

  const handleAddActivity = (activity: Activity) => {
    setActivityList((prev) => [...prev, activity]);
  };

  return (
    <main className="h-[820px] flex flex-col md:flex-row">
      <section className="md:w-1/2">
        <CircularTimeline activityList={activityList} />
      </section>

      <section className="md:w-1/2 flex flex-col gap-4 p-4 pb-[100px] md:pb-[20px] md:overflow-y-auto">
        <TodoList />
        <ActivityPlanner onAddActivity={handleAddActivity} />
        <ActivityLogger onAddActivity={handleAddActivity} />
        <ActivityStats />
      </section>
    </main>
  );
}

export default HomePage;
