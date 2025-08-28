"use client";

import { useState } from "react";
import PlanStats from "./components/PlanStats";
import LogStats from "./components/LogStats";
import PlanVsLogStats from "./components/PlanVsLogStats";

const Stats = () => {
  const [activeTab, setActiveTab] = useState<"plan" | "log" | "planVsLog">(
    "plan"
  );

  const tabs = [
    { key: "plan", label: "계획" },
    { key: "log", label: "기록" },
    { key: "planVsLog", label: "계획 대비 기록" },
  ] as const;

  return (
    <div className="max-w-3xl mx-auto p-4">
      {/* 탭 버튼 */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 p-2 rounded-t-lg font-medium cursor-pointer ${
              activeTab === tab.key
                ? "bg-white border-2 border-b-0"
                : "bg-gray-200 text-gray-700 border-b-2"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* 탭 컨텐츠 */}
      <div className="border-2 border-t-0 rounded-b-2xl p-4 h-[500px] sm:h-[740px] overflow-y-auto">
        {activeTab === "plan" && <PlanStats />}
        {activeTab === "log" && <LogStats />}
        {activeTab === "planVsLog" && <PlanVsLogStats />}
      </div>
    </div>
  );
};

export default Stats;
