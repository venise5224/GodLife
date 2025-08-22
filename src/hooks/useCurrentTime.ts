import { getCurrentTime } from "@/utils/time";
import { useState, useEffect } from "react";

export const useCurrentTime = (intervalSeconds = 1) => {
  const [currentTime, setCurrentTime] = useState<string | null>(null);

  useEffect(() => {
    setCurrentTime(getCurrentTime());
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 1000 * intervalSeconds);

    return () => clearInterval(timer);
  }, [intervalSeconds]);

  return currentTime;
};
