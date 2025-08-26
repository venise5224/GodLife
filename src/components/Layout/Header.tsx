function Header() {
  return (
    <header className="sticky top-0 w-full p-4 bg-white shadow flex justify-between items-center">
      <h1 className="text-xl font-bold">갓생러 계획표</h1>
      <span className="text-base font-medium text-gray-600">
        {new Date().toLocaleDateString()}
      </span>
    </header>
  );
}

export default Header;
