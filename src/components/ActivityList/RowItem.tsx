"use client";

import { Row } from "@/types/row";

interface Props {
  row: Row;
}

const RowItem = ({ row }: Props) => {
  return (
    <li className="flex items-center gap-9 sm:gap-2 p-2 border rounded-lg">
      {/* 이름 */}
      <div className="flex-1 text-xs sm:text-base">{row.name}</div>

      {/* Source */}
      <div className="hidden sm:block w-13 text-center">
        <span
          className={`px-2 py-0.5 rounded-full text-xs border
          ${
            row.source === "Todo"
              ? "border-gray-300"
              : row.source === "Plan"
              ? "border-amber-300"
              : "border-green-300"
          }`}
        >
          {row.source}
        </span>
      </div>

      {/* 시작 */}
      <div className="hidden sm:block sm:w-30 text-center text-xs sm:text-sm">
        {row.start ?? "-"}
      </div>

      {/* 종료 */}
      <div className="hidden sm:block sm:w-30 text-center text-xs sm:text-sm">
        {row.end ?? "-"}
      </div>

      {/* 걸린 시간 */}
      <div className="w-14 sm:w-25 text-center text-xs sm:text-sm">
        {row.duration ??
          (row.kind === "activity" ? (
            <span className="text-red-500">{"진행중"}</span>
          ) : (
            "-"
          ))}
      </div>

      {/* 삭제 */}
      <div className="w-5 sm:w-16 text-center text-sm">
        {!(row.kind === "activity" && !row.end) ? (
          <button
            onClick={row.onDelete}
            className="text-red-500 hover:text-red-700 cursor-pointer"
            aria-label="삭제"
            title="삭제"
          >
            🗑
          </button>
        ) : (
          <div>-</div>
        )}
      </div>
    </li>
  );
};

export default RowItem;
