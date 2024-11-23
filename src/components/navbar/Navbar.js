"use client";
import { usePathname } from "next/navigation";
import SessionComponent from "./SessionComponent";
import NavLinks from "./NavLinks";
import Image from "next/image";
import Link from "next/link";
import NavbarCategories from "./NavbarCategories";

export default function Navbar({ configurations }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const showMenuCategories =
    pathname.startsWith("/product-category") ||
    pathname.startsWith("/categories");

  return (
    <div className="container h-24 flex items-center justify-between px-4 scroll-smooth">
      <div className="flex flex-row items-center gap-4 w-full">
        <Link href="/">
          <Image
            src="/images/logo_blanco01.png"
            alt="Logo Ihara & London"
            width={64}
            height={64}
            className="size-12 sm:size-16"
          />
        </Link>
        <div className="flex-grow">
          <div className="hidden sm:block">
            {isHome && <NavLinks configurations={configurations} />}
          </div>
          <div className="mr-4">
            {showMenuCategories && <NavbarCategories />}
          </div>
        </div>
      </div>
      <div className="ml-auto">
        <SessionComponent />
      </div>
    </div>
  );
}
