"use client";

import { useState } from "react";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // 로그인 성공 시 메인으로 이동
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">
        <Link href="/">로그인</Link>{" "}
      </h1>
      <p className="mt-4 text-center font-bold">
        회원이 아니신가요?{" "}
        <Link href="/auth/sign-up" className="text-blue-500">
          회원가입하기
        </Link>
      </p>

      <form onSubmit={handleSignIn} className="mt-4 space-y-4">
        <input
          type="email"
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border p-2"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border p-2"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-blue-500 p-2 text-white hover:bg-blue-600"
        >
          로그인
        </button>
      </form>

      {error && (
        <p className="mt-2 text-center text-sm text-red-500">{error}</p>
      )}

      <div className="my-4 flex items-center">
        <hr className="flex-1" />
        <span className="px-2 text-gray-400">또는</span>
        <hr className="flex-1" />
      </div>

      <button
        onClick={handleGoogleSignIn}
        className="w-full rounded-md border border-gray-300 p-2 hover:bg-gray-50"
      >
        Google 계정으로 로그인
      </button>
    </div>
  );
}
