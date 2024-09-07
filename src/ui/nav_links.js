"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/utils/linksDashboard";
import "./sidenav.css";

export default function Nav_links() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md  p-1 text-md font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3
              ${pathname === link.href ? "italic important-class" : ""}`}
          >
            <LinkIcon size={30} />
            <p className="responsive-paragraph">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
