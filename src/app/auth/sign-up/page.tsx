"use client";

import { useState } from "react";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const SignUpPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/");
    } catch (err) {
      const error = err as FirebaseError;
      setError(error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center">
        <Link href="/">
          <Image
            src="/icons/GodLifeLogo.png"
            alt="Logo"
            width={500}
            height={500}
          />
        </Link>
      </h1>
      <p className="mt-4 text-center font-bold ">
        이미 회원이신가요?{" "}
        <Link href="/auth/sign-in" className="text-blue-500">
          로그인하기
        </Link>
      </p>

      <form onSubmit={handleSignUp} className="mt-4 space-y-4">
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
          className="w-full rounded-md bg-green-500 p-2 text-white hover:bg-green-600"
        >
          회원가입
        </button>
      </form>

      {error && (
        <p className="mt-2 text-center text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};

export default SignUpPage;
