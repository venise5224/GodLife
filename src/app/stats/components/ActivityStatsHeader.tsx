import { Calendar, Clock } from "lucide-react";

interface ActivityStatsHeaderProps {
  totalMinutes: number;
  source: "plan" | "log";
}

export default function ActivityStatsHeader({
  totalMinutes,
  source,
}: ActivityStatsHeaderProps) {
  const config =
    source === "plan"
      ? {
          title: "계획 통계",
          description: "오늘 세운 계획을 시간 단위로 확인할 수 있습니다.",
          icon: <Calendar className="w-6 h-6 text-orange-500" />,
          label: "계획 시간",
        }
      : {
          title: "기록 통계",
          description: "실제로 기록된 활동들의 사용 시간을 분석했습니다.",
          icon: <Clock className="w-6 h-6 text-blue-500" />,
          label: "기록 시간",
        };
  return (
    <div className="p-4 bg-gray-50 rounded-xl border space-y-2">
      <div className="flex items-center space-x-2">
        {config.icon}
        <h2 className="text-lg font-bold">{config.title}</h2>
      </div>
      <p className="text-sm text-gray-500">{config.description}</p>
      <div className="text-gray-700 font-medium">
        총 {config.label}: {Math.floor(totalMinutes / 60)}시간{" "}
        {totalMinutes % 60}분
      </div>
    </div>
  );
}
