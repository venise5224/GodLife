"use client";

import { useModalStore } from "@/stores/useModalStore";
import ResetHourModal from "./ModalContents/ResetHourModal";

const ModalManager = () => {
  const { modalType, modalProps } = useModalStore();

  if (!modalType) return null;

  switch (modalType) {
    case "RESET_HOUR":
      return <ResetHourModal {...modalProps} />;
    default:
      return null;
  }
};

export default ModalManager;
