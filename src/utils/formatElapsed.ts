// 경과 시간 포맷 함수
export const formatElapsed = (sec: number): string => {
  if (sec < 60) {
    return `${sec}초 진행 중`;
  }

  const h = Math.floor(sec / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;

  if (h > 0) {
    return `${h}시간 ${m}분 ${s}초 진행 중`;
  }
  return `${m}분 ${s}초 진행 중`;
};
