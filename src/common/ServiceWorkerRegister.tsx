"use client";

import { useEffect } from "react";

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then(() => console.log("✅ Service Worker 등록 성공!"))
        .catch((err) => console.log("❌ Service Worker 등록 실패:", err));
    }
  }, []);

  return null;
}
