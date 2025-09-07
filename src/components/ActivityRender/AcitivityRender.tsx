"use client";

import { useState } from "react";
import CircularTimeline from "@/components/CircularTimeline/CircularTimeline";
import ActivityList from "@/components/ActivityList/ActivityList";

function ActivityRender() {
  const [activeTab, setActiveTab] = useState<"timeline" | "list">("timeline");

  return (
    <>
      {/* md 이상에서는 CircularTimeline만 */}
      <div className="hidden md:block h-full w-full">
        <CircularTimeline />
      </div>

      {/* md 이하에서는 탭 UI */}
      <div className="flex flex-col md:hidden h-full w-full">
        <div className="flex border-b border-gray-300">
          <button
            className={`flex-1 p-2 text-center font-semibold cursor-pointer ${
              activeTab === "timeline"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("timeline")}
          >
            타임라인
          </button>
          <button
            className={`flex-1 p-2 text-center font-semibold cursor-pointer ${
              activeTab === "list"
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("list")}
          >
            활동 목록
          </button>
        </div>

        <div className="mt-2 flex flex-col flex-1">
          {activeTab === "timeline" ? (
            <CircularTimeline />
          ) : (
            <div className="px-2 h-full">
              <ActivityList />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default ActivityRender;
