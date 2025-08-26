"use client";

import { useState, useMemo } from "react";
import { useActivityStore } from "@/stores/useActivityStore";
import { differenceInMinutes, parse } from "date-fns";
import { Row } from "@/types/row";
import { useTodoStore } from "@/stores/useTodoStore";

export default function TodoList() {
  const [todoName, setTodoName] = useState("");
  const [filter, setFilter] = useState<"All" | "Todo" | "Plan" | "Log">("All");
  const { activityList, removeActivity } = useActivityStore();
  const { todos, addTodo, removeTodo } = useTodoStore();

  const handleAddTodo = () => {
    if (!todoName.trim()) return;

    addTodo(todoName.trim());
    setTodoName("");
  };

  const rows: Row[] = useMemo(() => {
    const todoRows: Row[] = todos.map((t) => ({
      key: `T-${t.id}`,
      name: t.text,
      source: "Todo",
      start: null,
      end: null,
      onDelete: () => removeTodo(t.id),
      kind: "todo",
      done: t.done,
    }));

    const activityRows: Row[] =
      activityList.map((a) => {
        let duration: string | null = null;

        if (a.startTime && a.endTime) {
          try {
            const start = parse(a.startTime, "HH : mm : ss", new Date());
            const end = parse(a.endTime, "HH : mm : ss", new Date());

            const mins = differenceInMinutes(end, start);
            const h = Math.floor(mins / 60);
            const m = mins % 60;

            if (h > 0) {
              duration = `${h}시간 ${m}분`;
            } else {
              duration = `${m}분`;
            }
          } catch {
            duration = null;
          }
        }

        return {
          key: `A-${a.id}`,
          name: a.activityName,
          source: a.source?.toLowerCase() === "log" ? "Log" : "Plan",
          start: a.startTime ?? null,
          end: a.endTime ?? null,
          onDelete: () => removeActivity(a.id),
          kind: "activity",
          duration,
        };
      }) ?? [];

    let merged = [...todoRows, ...activityRows];

    if (filter !== "All") {
      merged = merged.filter((row) => row.source === filter);
    }

    merged.sort((a, b) => {
      if (a.kind === "activity" && !a.end) return -1;
      if (b.kind === "activity" && !b.end) return 1;
      return 0;
    });

    return merged;
  }, [todos, activityList, filter, removeActivity, removeTodo]);

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-lg border-2 rounded-2xl min-h-[480px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">할 일 / 활동 목록</h2>

      {/* 입력창 (Todo 추가) */}
      <form onSubmit={handleAddTodo} className="flex gap-2 mb-4">
        <input
          type="text"
          value={todoName}
          onChange={(e) => setTodoName(e.target.value)}
          className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
          placeholder="할 일을 입력하세요 (Todo)"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
        >
          추가
        </button>
      </form>

      {/* 필터 토글 버튼 */}
      <div className="flex gap-2 mb-4">
        {(["All", "Todo", "Plan", "Log"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full border text-sm transition
              ${
                filter === f
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-white text-gray-600 border-gray-300 hover:bg-gray-100"
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 리스트 헤더 */}
      <div className="flex px-2 py-2 text-sm text-gray-500">
        <div className="flex-1">이름</div>
        <div className="w-20 text-center">Source</div>
        <div className="w-30 text-center">시작</div>
        <div className="w-30 text-center">종료</div>
        <div className="w-30 text-center">소요 시간</div>
        <div className="w-16 text-center">삭제</div>
      </div>

      {/* 리스트 */}
      <ul className="space-y-2">
        {rows.length === 0 && (
          <li className="text-gray-400 text-center py-6">항목이 없습니다.</li>
        )}

        {rows.map((row) => (
          <li
            key={row.key}
            className="flex items-center gap-2 p-2 border rounded-lg"
          >
            {/* 이름 */}
            <div className="flex-1">{row.name}</div>

            {/* Source */}
            <div className="w-13 text-center">
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
            <div className="w-30 text-center text-sm">{row.start ?? "-"}</div>

            {/* 종료 */}
            <div className="w-30 text-center text-sm">
              {row.end ??
                (row.kind === "activity" ? (
                  <span className="text-red-500">{"진행중"}</span>
                ) : (
                  "-"
                ))}
            </div>

            {/* 걸린 시간 */}
            <div className="w-25 text-center text-sm">
              {row.duration ?? "-"}
            </div>

            {/* 삭제 */}
            <div className="w-16 text-center text-sm">
              {!(row.kind === "activity" && !row.end) && (
                <button
                  onClick={row.onDelete}
                  className="text-red-500 hover:text-red-700"
                  aria-label="삭제"
                  title="삭제"
                >
                  🗑
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
