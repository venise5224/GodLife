import type { Metadata } from "next";
import "@/styles/globals.css";
import ModalManager from "@/components/Modal/ModalManager";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "갓생러 프로젝트",
  description: "나의 루틴을 기록하고 관리하는 앱",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <LayoutWrapper>{children}</LayoutWrapper>
        <ModalManager />
      </body>
    </html>
  );
}
