"use client";

import { useState, useEffect } from "react";

export function useResetHour() {
  const [resetHour, setResetHour] = useState<number>(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("resetHour");
    if (saved) setResetHour(parseInt(saved));
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem("resetHour", resetHour.toString());
  }, [resetHour, ready]);

  return { resetHour, setResetHour };
}
