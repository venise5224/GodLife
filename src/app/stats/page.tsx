"use client";

import { useState } from "react";
import PlanVsLogStats from "./components/PlanVsLogStats";
import ActivityStats from "./components/ActivityStats";

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
    <>
      {/* 탭 버튼 */}
      <div className="flex">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`flex-1 p-2 text-sm sm:text-base rounded-t-lg sm:font-medium cursor-pointer ${
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
      <div className="border-2 border-t-0 rounded-b-2xl p-4 h-[540px] sm:h-[740px] overflow-y-auto">
        {activeTab === "plan" && <ActivityStats source="plan" />}
        {activeTab === "log" && <ActivityStats source="log" />}
        {activeTab === "planVsLog" && <PlanVsLogStats />}
      </div>
    </>
  );
};

export default Stats;
