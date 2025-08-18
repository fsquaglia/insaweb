"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/utils/linksDashboard";
import "./sidenav.css";

export default function Nav_links() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => (
        <NavLink key={link.name} link={link} pathname={pathname} />
      ))}
    </>
  );
}

function NavLink({ link, pathname }) {
  const LinkIcon = link.icon;

  // estilos base
  const baseClass =
    "flex items-center justify-center gap-1 md:gap-2 rounded-md px-1 py-2 md:p-2 md:px-3 text-md font-medium md:flex-none md:justify-start md:w-full";

  // Si está deshabilitado => span
  if (link.disabled) {
    return (
      <span className={`${baseClass} text-gray-400 cursor-not-allowed`}>
        <LinkIcon className="size-5 md:size-7" />
        <p className="hidden md:block">{link.name}</p>
      </span>
    );
  }

  // Si está habilitado => link
  return (
    <Link
      href={link.href}
      className={`${baseClass} hover:bg-sky-100 hover:text-blue-600 ${
        pathname === link.href ? "italic important-class" : ""
      }`}
    >
      <LinkIcon className="size-5 md:size-7" />
      <p className="hidden md:block">{link.name}</p>
    </Link>
  );
}
