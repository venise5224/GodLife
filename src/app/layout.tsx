import type { Metadata } from "next";
import "@/styles/globals.css";
import ModalManager from "@/components/Modal/ModalManager";
import LayoutWrapper from "@/components/Layout/LayoutWrapper";
import ServiceWorkerRegister from "@/common/ServiceWorkerRegister";

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
      <head>
        <meta
          name="google-site-verification"
          content="rdIHUdbDhKQftI_nFWPKNeR_uBCYFWLvTMNxxTiRHt8"
        />
        <meta
          name="naver-site-verification"
          content="b631cc077b434b3838843dfa845da8e64c13d520"
        />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="flex flex-col min-h-screen">
        <LayoutWrapper>{children}</LayoutWrapper>
        <ModalManager />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
