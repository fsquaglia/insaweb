"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaRegStar } from "react-icons/fa";

const links = [
  { name: "Home", href: "/dashboard", icon: FaHome },
  { name: "Principal", href: "/dashboard/main", icon: FaRegStar },
];

export default function Nav_links() {
  const pathname = usePathname();

  return (
    <div>
      SOy el Nav_links
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-md font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3 ${
              pathname === link.href ? "italic" : ""
            }`}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </div>
  );
}
