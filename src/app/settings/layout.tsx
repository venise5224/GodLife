import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "설정 | GodLife",
  description: "계정 및 앱 설정을 관리하세요",
  keywords: "갓생, 설정, 프로필, 루틴, godlife",
};

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
