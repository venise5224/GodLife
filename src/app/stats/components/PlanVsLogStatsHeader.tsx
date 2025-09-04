import { ClipboardClock } from "lucide-react";

export default function PlanVsLogStatsHeader() {
  const config = {
    title: "계획 대비 기록 통계",
    description:
      "세운 계획과 실제 기록을 비교하여 달성률을 확인할 수 있습니다.",
    icon: <ClipboardClock className="w-6 h-6 text-green-700" />,
    label: "계획 시간",
  };

  return (
    <div className="p-2 sm:p-4 bg-gray-50 rounded-xl border space-y-2">
      <div className="flex items-center space-x-2">
        {config.icon}
        <h2 className="text-sm sm:text-lg font-bold">{config.title}</h2>
      </div>
      <p className="text-[10px] sm:text-sm text-gray-500">
        {config.description}
      </p>
      <div className="grid grid-cols-3 text-[10px] sm:text-base text-gray-700 font-medium">
        <span className="text-left">이름</span>
        <span className="text-center">계획 시간 / 기록 시간</span>
        <span className="text-right">달성률</span>
      </div>
    </div>
  );
}
