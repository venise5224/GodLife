import Link from "next/link";

function Footer() {
  const navMenu = [
    { name: "홈", icon: "🏠", href: "/" },
    { name: "통계", icon: "📊", href: "/stats" },
    { name: "설정", icon: "⚙", href: "/settings" },
  ];

  return (
    <footer className="fixed bottom-0 w-full p-4 border-t-2 bg-white shadow flex justify-around">
      {navMenu.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="text-center cursor-pointer"
        >
          {item.icon} <br />
          {item.name}
        </Link>
      ))}
    </footer>
  );
}

export default Footer;
