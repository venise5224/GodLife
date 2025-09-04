"use client";

import { ModalPropsType, ModalType } from "@/types/Modal";
import { create } from "zustand";

interface ModalState {
  modalType: ModalType;
  modalProps?: ModalPropsType;
  openModal: (type: ModalType, props?: ModalPropsType) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalState>((set) => ({
  modalType: null,
  modalProps: undefined,
  openModal: (type, props) => set({ modalType: type, modalProps: props }),
  closeModal: () => set({ modalType: null, modalProps: undefined }),
}));
