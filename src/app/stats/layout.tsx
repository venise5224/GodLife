import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "통계 | GodLife",
  description: "활동 계획, 기록, 계획 대비 기록 통계를 확인하세요",
  keywords: "갓생, 통계, 활동 기록, 계획 대비 기록, 루틴",
};

export default function StatsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
