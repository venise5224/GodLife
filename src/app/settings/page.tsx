"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // 로그인 상태 체크
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  // 다크모드 초기화
  useEffect(() => {
    const isDark = localStorage.getItem("theme") === "dark";
    setIsDarkMode(isDark);

    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/sign-in");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem("theme", newDarkMode ? "dark" : "light");

    if (newDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const settingItems = [
    {
      label: `다크모드 ${isDarkMode ? "끄기" : "켜기"}`,
      onClick: toggleDarkMode,
    },
    { label: "언어 선택 (준비중)" },
    { label: "초기화 시각 설정 (준비중)" },
    {
      label: "로그아웃",
      onClick: handleLogout,
      isLogout: true,
    },
  ];

  return (
    <div className="px-4 py-6 md:px-8 md:py-10 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold">설정</h1>

      <div className="mt-6">
        {settingItems.map((item, idx) => (
          <section key={idx} className="mt-4">
            <button
              onClick={item.onClick}
              disabled={!item.onClick}
              className={`w-full rounded-md p-3 text-white transition ${
                item.isLogout
                  ? isLoggedIn
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-red-300 cursor-not-allowed"
                  : item.onClick
                  ? "bg-gray-800 hover:bg-gray-700 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black"
                  : "bg-gray-300 text-gray-600 cursor-not-allowed opacity-50"
              }`}
            >
              {item.label}
            </button>
          </section>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;
