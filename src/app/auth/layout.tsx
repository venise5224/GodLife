const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen justify-center pt-[80px]">{children}</div>
  );
};

export default AuthLayout;
