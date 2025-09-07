"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <header className="px-4 py-1 sm:px-10 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Link href="/" className="block ">
          <Image
            src="/icons/Logo.png"
            alt="Logo"
            width={192}
            height={80}
            className="object-contain w-40 h-16 sm:w-48 sm:h-20"
            priority
          />
        </Link>
      </h1>

      <div className="flex items-center gap-3">
        {/* 현재 날짜 */}
        <span className="sm:block text-xs sm:text-base font-bold text-black border-2 px-3 py-1 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)]">
          {new Date().toLocaleDateString()}
        </span>

        {user ? (
          <div className="relative flex items-center gap-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2">
            <Image
              src={user.photoURL ?? "/icons/default-profile.png"}
              alt="profile"
              fill
              className="rounded-full object-cover"
            />
          </div>
        ) : (
          <button
            onClick={() => router.push("/auth/sign-in")}
            className="px-3 py-1 text-xs sm:text-base font-bold bg-blue-500 text-white border-black border-2 rounded-lg shadow-[3px_3px_0px_rgba(0,0,0,1)] cursor-pointer"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
