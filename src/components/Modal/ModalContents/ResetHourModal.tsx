"use client";

import { useModalStore } from "@/stores/useModalStore";
import React from "react";
import { useResetHourStore } from "@/stores/useResetHourStore";

const ResetHourModal = () => {
  const { modalProps, closeModal } = useModalStore();
  const { resetHour, setResetHour } = useResetHourStore();

  const selectedHour = modalProps?.resetHour ?? resetHour;
  const nowHour = new Date().getHours();

  const willResetToday = nowHour >= selectedHour;

  const handleConfirm = () => {
    setResetHour(modalProps?.resetHour ?? 0);
    closeModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white p-6 rounded-xl w-[350px]">
        <h2 className="text-gray-900 text-lg font-bold text-center">
          초기화 시간 설정
        </h2>
        <p className="text-gray-900 text-sm mt-4">
          선택하신 초기화 시간: {selectedHour}시
        </p>
        <p className="text-sm text-gray-600 mt-4">
          {willResetToday ? (
            <span>
              초기화 시간이 이미 지나{" "}
              <span className="text-red-500">타임라인이 초기화</span>됩니다.
            </span>
          ) : (
            "타임라인의 기존 활동과 계획이 유지됩니다."
          )}
        </p>

        <div className="flex justify-between mt-4 gap-2 ">
          <button
            className="w-full px-4 py-2 bg-gray-300 rounded cursor-pointer"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="w-full px-4 py-2 bg-blue-500 text-white rounded cursor-pointer"
            onClick={handleConfirm}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetHourModal;
