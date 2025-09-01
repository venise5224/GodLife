"use client";

import { auth } from "@/lib/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SettingsPage = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // 로그인 상태 체크
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/auth/sign-in");
    } catch (err) {
      console.error("로그아웃 실패:", err);
    }
  };

  const settingItems = [
    { label: "다크모드 (준비중)" },
    { label: "언어 선택 (준비중)" },
    { label: "초기화 시각 설정 (준비중)" },
    { label: "로그아웃", onClick: handleLogout, isLogout: true }, // 마지막
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
