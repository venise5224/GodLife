// 현재 시간 "HH : MM : SS" 형식으로 반환
export const getCurrentTime = (): string => {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  const s = String(now.getSeconds()).padStart(2, "0");
  return `${h} : ${m} : ${s}`;
};
