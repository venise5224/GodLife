"use client";

import { create } from "zustand";

type ModalType = "RESET_HOUR" | null;

interface ModalState {
  modalType: ModalType;
  modalProps: any; // 필요시 모달별로 props 전달
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  modalProps: null,
  openModal: (type, props = null) =>
    set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: null }),
}));
