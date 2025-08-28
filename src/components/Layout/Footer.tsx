import { ChartBar, Home, Settings } from "lucide-react";
import Link from "next/link";

function Footer() {
  const navMenu = [
    {
      name: "통계",
      icon: <ChartBar className="w-6 h-6 text-orange-500" />,
      href: "/stats",
    },
    {
      name: "홈",
      icon: <Home className="w-6 h-6 text-blue-500" />,
      href: "/",
    },
    {
      name: "설정",
      icon: <Settings className="w-6 h-6 text-gray-700" />,
      href: "/settings",
    },
  ];

  return (
    <footer className="fixed bottom-0 w-full p-4 border-t-2 bg-white shadow flex justify-around">
      {navMenu.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className="text-center cursor-pointer"
        >
          {item.icon}
        </Link>
      ))}
    </footer>
  );
}

export default Footer;
