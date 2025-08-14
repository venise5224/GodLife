function Header() {
  return (
    <header className="w-full p-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">갓생러 계획표</h1>
      <span>{new Date().toLocaleDateString()}</span>
    </header>
  );
}

export default Header;
