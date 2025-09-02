"use client";

import { UseFormRegisterReturn } from "react-hook-form";
import { Upload } from "lucide-react";

interface FileInputProps {
  id: string;
  label: string;
  register: UseFormRegisterReturn;
  error?: string;
}

const FileInput = ({ id, label, register, error }: FileInputProps) => {
  return (
    <div className="flex flex-col space-y-1">
      {/* 라벨 */}
      <label htmlFor={id} className="font-bold text-gray-800">
        <span className="cursor-pointer">{label}</span>
      </label>

      <div className="relative">
        {/* 실제 파일 인풋 (숨김 처리) */}
        <input
          id={id}
          type="file"
          accept="image/*"
          {...register}
          className="hidden"
        />

        {/* 커스텀 UI (placeholder처럼) */}
        <label
          htmlFor={id}
          className={`flex items-center justify-between w-full rounded-md border p-2 cursor-pointer ${
            error ? "border-red-500" : "border-gray-300"
          } text-gray-400`}
        >
          <span>파일을 선택해 주세요</span>
          <Upload className="text-gray-500" size={18} />
        </label>
      </div>

      {/* 에러 메시지 */}
      <p className="h-5 text-sm text-right text-red-500">{error || ""}</p>
    </div>
  );
};

export default FileInput;
