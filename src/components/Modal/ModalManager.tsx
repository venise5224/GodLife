"use client";

import { useModalStore } from "@/stores/useModalStore";
import ResetHourModal from "./ModalContents/ResetHourModal";

const ModalManager = () => {
  const { modalType } = useModalStore();

  if (!modalType) return null;

  switch (modalType) {
    case "RESET_HOUR":
      return <ResetHourModal />;
    default:
      return null;
  }
};

export default ModalManager;
