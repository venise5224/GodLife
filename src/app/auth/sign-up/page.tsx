"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FormInput from "@/components/Form/FormInput";
import { signUpSchema } from "@/schema/authSchema";
import FileInput from "@/components/Form/FileInput";

const SignUpPage = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: z.infer<typeof signUpSchema>) => {
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      router.push("/");
    } catch (err) {
      const error = err as FirebaseError;
      alert(error.message);
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
      <p className="mt-4 text-center font-bold">
        이미 회원이신가요?{" "}
        <Link href="/auth/sign-in" className="text-blue-500">
          로그인하기
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
          id="nickname"
          label="닉네임"
          type="text"
          register={register("nickname")}
          error={errors.nickname?.message}
          placeholder="닉네임을 입력해주세요"
        />
        <FileInput
          id="profileImage"
          label="프로필 사진"
          register={register("profileImage")}
          error={errors.profileImage?.message as string | undefined}
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
          회원가입
        </button>
      </form>
    </div>
  );
};

export default SignUpPage;
