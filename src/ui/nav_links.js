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
            className={`flex items-center justify-center gap-1 md:gap-2 rounded-md px-1 py-2 md:p-2 md:px-3 text-md font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:w-full 
              ${pathname === link.href ? "italic important-class" : ""}`}
          >
            <LinkIcon className="size-5 md:size-7" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
