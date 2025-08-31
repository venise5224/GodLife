"use client";

import { useModalStore } from "@/stores/useModalStore";

const ResetHourModal = () => {
  const { closeModal } = useModalStore();

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-6 shadow-lg w-80">
        <p className="mb-4 text-center">
          초기화 시각을 변경하면 타임라인이 초기화돼요.
        </p>
        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-200 rounded"
            onClick={closeModal}
          >
            취소
          </button>
          <button
            className="px-3 py-1 bg-red-500 text-white rounded"
            onClick={() => {
              console.log("ResetHourModal 확인 클릭!");
              closeModal();
            }}
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResetHourModal;
