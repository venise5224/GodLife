export type ModalType =
  | "RESET_HOUR" // 초기화 시간 설정 모달
  | null;

export interface ModalPropsType {
  resetHour?: number; // 초기화 시간 설정 모달에 필요한 시간 값
}
