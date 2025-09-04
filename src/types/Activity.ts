export interface Activity {
  id: string; // 고유 id (Date.now().toString())
  activityName: string; // 활동 이름
  startTime: string; // 시작 시간 (HH:mm)
  endTime?: string; // 종료 시간 (HH:mm)
  date: string; // 활동 날짜 (YYYY-MM-DD)
  source: "plan" | "log"; // 계획 또는 기록
}
