const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen justify-center pt-[250px]">
      {children}
    </div>
  );
};

export default AuthLayout;
