interface ActivityRow {
  name: string;
  minutes: number;
  percentOfDay: number;
  percentOfTotal: number;
}

interface ActivityStatItemProps {
  row: ActivityRow;
  source: "plan" | "log";
}

export default function ActivityStatItem({
  row,
  source,
}: ActivityStatItemProps) {
  const config =
    source === "plan"
      ? { colorDay: "orange-500", colorTotal: "yellow-500" }
      : { colorDay: "blue-500", colorTotal: "green-500" };

  return (
    <div className="p-2 sm:p-3 border rounded-xl shadow-sm bg-white space-y-1">
      {/* 이름 + 시간 */}
      <div className="flex justify-between items-center">
        <span className="text-sm sm:text-base font-semibold">{row.name}</span>
        <span className="text-xs sm:text-sm text-gray-500">
          {Math.floor(row.minutes / 60)}시간 {row.minutes % 60}분
        </span>
      </div>

      {/* 24시간 대비 */}
      <div className="flex items-center space-x-2">
        <span className={`text-xs w-24 text-${config.colorDay}`}>
          24시간 대비
        </span>
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-3 bg-${config.colorDay}`}
            style={{ width: `${row.percentOfDay}%` }}
          />
        </div>
        <span className={`text-xs w-12 text-right text-${config.colorDay}`}>
          {row.percentOfDay.toFixed(1)}%
        </span>
      </div>

      {/* 전체 대비 */}
      <div className="flex items-center space-x-2">
        <span className={`text-xs w-24 text-${config.colorTotal}`}>
          전체 {source === "plan" ? "계획" : "기록"} 대비
        </span>
        <div className="flex-1 h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-3 bg-${config.colorTotal}`}
            style={{ width: `${row.percentOfTotal}%` }}
          />
        </div>
        <span className={`text-xs w-12 text-right text-${config.colorTotal}`}>
          {row.percentOfTotal.toFixed(1)}%
        </span>
      </div>
    </div>
  );
}
