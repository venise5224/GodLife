export interface Row {
  key: string;
  name: string;
  source: "Todo" | "Plan" | "Log";
  start?: string | null;
  end?: string | null;
  onDelete: () => void;
  kind: "todo" | "activity";
  done?: boolean; // todo 전용
  duration?: string | null;
}
