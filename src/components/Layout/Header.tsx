"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
    <header className="sticky top-0 w-full p-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">
        <Image src="/icons/logo.png" alt="Logo" width={200} height={200} />
      </h1>

      <div className="flex items-center gap-3">
        <span className="text-base font-medium text-gray-600">
          {new Date().toLocaleDateString()}
        </span>

        {user ? (
          <div className="flex items-center gap-2">
            <Image
              src={user.photoURL ?? "/default-avatar.png"}
              alt="profile"
              width={32}
              height={32}
              className="w-8 h-8 rounded-full"
            />
            {/* <span className="text-sm font-medium">
              {user.displayName ?? "사용자"}
            </span> */}
          </div>
        ) : (
          <button
            onClick={() => router.push("/auth/sign-in")}
            className="px-3 py-1 text-sm bg-blue-500 text-white rounded"
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
