"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import SmoothScrollLink from "../../utils/SmoothScrollLink";
import Link from "next/link";

export default function Navbar({ configurations }) {
  const menuItems = [
    { href: "#main", label: "Inicio", condition: true },
    { href: "#categories", label: "Categorías", condition: true },
    {
      href: "#offers",
      label: "Ofertas",
      condition: configurations?.mostrarOfertasEnHome || false,
    },
    {
      href: "#tips",
      label: "Tips",
      condition: configurations?.mostrarTipsEnHome || false,
    },
    {
      href: "#history",
      label: "Historia",
      condition: configurations?.mostrarHistoriaEnHome || false,
    },
    {
      href: "#about",
      label: "About",
      condition: configurations?.mostrarAboutEnHome || false,
    },
    {
      href: "#social-media",
      label: "Social Media",
      condition: configurations?.mostrarSocialMediaEnHome || false,
    },
    { href: "#contact", label: "Contacto", condition: true },
  ];

  return (
    <div className="container mx-auto h-24 flex items-center justify-between px-4 scroll-smooth">
      <nav>
        <ul className="flex space-x-4">
          {menuItems.map(
            (item) =>
              item.condition && (
                <li key={item.href} className="cursor-pointer">
                  <SmoothScrollLink href={item.href}>
                    {item.label}
                  </SmoothScrollLink>
                </li>
              )
          )}
        </ul>
      </nav>
      <Link href="/auth/login">
        <UserIcon
          className="w-6 h-6 text-gray-300 cursor-pointer"
          aria-label="Login"
        />
      </Link>
    </div>
  );
}
