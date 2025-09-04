import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "로그인 / 회원가입 | GodLife",
  description: "GodLife에 로그인하거나 회원가입하세요",
  keywords: "갓생, 로그인, 회원가입, godlife, 루틴 관리",
};

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen justify-center p-4 sm:pt-[80px]">
      {children}
    </div>
  );
};

export default AuthLayout;
