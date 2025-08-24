import { useState } from "react";
import ActivityLogger from "./ActivityLogger/ActivityLogger";
import ActivityPlanner from "./ActivityPlanner/ActivityPlanner";
import { Activity } from "@/types/Activity";

interface ActivityBoardProps {
  onAddActivity: (activity: Activity) => void;
}

const ActivityBoard = ({ onAddActivity }: ActivityBoardProps) => {
  const [activeTab, setActiveTab] = useState<"logger" | "planner">("logger");

  return (
    <div>
      {/* 탭 버튼 */}
      <div className="flex">
        <button
          className={`flex-1 p-2 rounded-t-lg ${
            activeTab === "logger"
              ? "bg-white border-2 border-b-0"
              : "bg-gray-200 text-gray-700 border-b-2"
          }`}
          onClick={() => setActiveTab("logger")}
        >
          할 일 기록
        </button>
        <button
          className={`flex-1 p-2 rounded-t-lg ${
            activeTab === "planner"
              ? "bg-white border-2 border-b-0"
              : "bg-gray-200 text-gray-700 border-b-2"
          }`}
          onClick={() => setActiveTab("planner")}
        >
          할 일 계획
        </button>
      </div>

      {/* 탭 컨텐츠 */}
      <div className="border-2 border-t-0 rounded-b-2xl p-4 h-[242px]">
        {activeTab === "logger" ? (
          <ActivityLogger onAddActivity={onAddActivity} />
        ) : (
          <ActivityPlanner onAddActivity={onAddActivity} />
        )}
      </div>
    </div>
  );
};

export default ActivityBoard;
