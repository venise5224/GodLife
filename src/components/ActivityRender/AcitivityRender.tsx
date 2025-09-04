"use client";

import { useState } from "react";
import CircularTimeline from "@/components/CircularTimeline/CircularTimeline";
import ActivityList from "@/components/ActivityList/ActivityList";

function ActivityRender() {
  const [activeTab, setActiveTab] = useState<"timeline" | "list">("timeline");

  return (
    <div className="w-full">
      {/* md 이상에서는 CircularTimeline만 */}
      <div className="hidden md:block md:h-[820px]">
        <CircularTimeline />
      </div>

      {/* md 이하에서는 탭 UI */}
      <div className="block md:hidden">
        <div className="flex border-b border-gray-300 mb-2">
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

        <div className="mt-2">
          {activeTab === "timeline" ? (
            <CircularTimeline />
          ) : (
            <div className="px-4">
              <ActivityList />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ActivityRender;
