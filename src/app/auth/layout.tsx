const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen justify-center p-4 sm:pt-[80px]">
      {children}
    </div>
  );
};

export default AuthLayout;
