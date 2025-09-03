"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth, googleProvider } from "@/lib/firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FormInput from "@/components/Form/FormInput";
import { signInSchema } from "@/schema/authSchema";

const SignInPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
  });

  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      router.push("/");
    } catch (err) {
      const error = err as FirebaseError;
      alert(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      router.push("/");
    } catch (err) {
      const error = err as FirebaseError;
      alert(error.message);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h1 className="text-2xl font-bold text-center cursor-pointer">
        <Link href="/">
          <Image
            src="/icons/GodLifeLogo.png"
            alt="Logo"
            width={500}
            height={500}
          />
        </Link>
      </h1>
      <p className="mt-4 text-center font-bold">
        회원이 아니신가요?{" "}
        <Link href="/auth/sign-up" className="text-blue-500">
          회원가입하기
        </Link>
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-4 space-y-1 sm:space-y-2"
      >
        <FormInput
          id="email"
          label="이메일"
          type="email"
          register={register("email")}
          error={errors.email?.message}
          placeholder="이메일을 입력해주세요"
        />
        <FormInput
          id="password"
          label="비밀번호"
          type="password"
          register={register("password")}
          error={errors.password?.message}
          placeholder="비밀번호를 입력해주세요"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-blue-900 p-2 text-white hover:bg-blue-800"
        >
          로그인
        </button>
      </form>

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
};

export default SignInPage;
