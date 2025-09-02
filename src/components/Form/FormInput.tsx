"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: string;
  placeholder?: string;
}

const FormInput = ({
  id,
  label,
  type = "text",
  register,
  error,
  placeholder = "입력해주세요",
}: FormInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col space-y-1">
      {/* 라벨과 인풋 연결 */}
      <label htmlFor={id} className="font-bold text-gray-800">
        <span className="cursor-pointer">{label}</span>
      </label>
      <div className="relative">
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          {...register}
          className={`w-full rounded-md border p-2 pr-10 ${
            error ? "border-red-500" : "border-gray-300"
          }`}
        />
        {/* 비밀번호 토글 버튼 */}
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
          >
            {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
          </button>
        )}
      </div>
      {/* 에러 메시지 */}
      <p className="h-5 text-sm text-right text-red-500">{error || ""}</p>
    </div>
  );
};

export default FormInput;
