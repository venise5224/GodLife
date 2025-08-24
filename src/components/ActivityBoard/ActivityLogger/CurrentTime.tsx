"use client";

import { useCurrentTime } from "@/hooks/useCurrentTime";

const CurrentTime = () => {
  const currentTime = useCurrentTime(); // 현재 시간 (HH : MM : SS)

  return <div className="mt-2 text-yellow-400">{currentTime}</div>;
};

export default CurrentTime;
