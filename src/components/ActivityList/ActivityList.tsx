"use client";

import { useState, useMemo } from "react";
import { useActivityStore } from "@/stores/useActivityStore";
import { useTodoStore } from "@/stores/useTodoStore";
import { Row } from "@/types/row";
import { differenceInMinutes, parse } from "date-fns";
import ListHeader from "./ListHeader";
import RowItem from "./RowItem";
import ActivityFilter from "./ActivityFilter";
import TodoInput from "./TodoInput";
import { TIME_FMT } from "@/utils/constants";
import useTodayActivities from "@/hooks/useTodayActivities";
import { LucideTimerReset } from "lucide-react";

const ActivityList = () => {
  const [filter, setFilter] = useState<"All" | "Todo" | "Plan" | "Log">("All");
  const { removeActivity } = useActivityStore();
  const { todos, addTodo, removeTodo } = useTodoStore();
  const activityList = useTodayActivities(); // 오늘의 활동들

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

        // 소요 시간 계산
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
      // 1. 진행중인 활동은 최상단
      if (a.kind === "activity" && !a.end) return -1;
      if (b.kind === "activity" && !b.end) return 1;

      // 2. Todo는 활동보다 위에
      if (a.kind === "todo" && b.kind !== "todo") return -1;
      if (b.kind === "todo" && a.kind !== "todo") return 1;

      // 3. 활동은 시작시간 기준으로 최신순 정렬
      const getTime = (row: Row): number => {
        if (row.kind === "activity" && row.start) {
          return parse(row.start, TIME_FMT, new Date()).getTime();
        }
        return 0;
      };

      return getTime(b) - getTime(a);
    });

    return merged;
  }, [todos, activityList, filter, removeActivity, removeTodo]);

  return (
    <div className="w-full mx-auto p-4 bg-white shadow-lg border-2 rounded-2xl min-h-[480px] overflow-y-auto">
      <h2 className="text-xl font-bold mb-4">할 일 / 활동 목록</h2>

      <TodoInput onAdd={addTodo} />
      <ActivityFilter filter={filter} onChange={setFilter} />
      <ListHeader />

      <ul className="space-y-2">
        {rows.length === 0 ? (
          <li className="text-gray-400 text-center py-6">항목이 없습니다.</li>
        ) : (
          rows.map((row) => <RowItem key={row.key} row={row} />)
        )}
      </ul>
    </div>
  );
};

export default ActivityList;
