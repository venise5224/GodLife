import type { Metadata } from "next";
import "@/styles/globals.css";
import ModalManager from "@/components/Modal/ModalManager";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";

export const metadata: Metadata = {
  title: "GodLife",
  description: "갓생살기 앱: 나의 루틴을 기록하고 관리하세요",
  keywords: "갓생, 갓생살기, 계획표, godlife, 루틴, 기록",
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
