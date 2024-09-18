"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import SmoothScrollLink from "../../utils/SmoothScrollLink";
import Link from "next/link";
import { signOut } from "next-auth/react";

export default function Navbar() {
  return (
    <div
      className="container mx-auto h-24 flex items-center justify-between px-4"
      style={{ scrollBehavior: "smooth" }}
    >
      <nav>
        <ul className="flex space-x-4">
          <li className="cursor-pointer">
            <SmoothScrollLink href="#main">Inicio</SmoothScrollLink>
          </li>
          <li className="cursor-pointer">
            <SmoothScrollLink href="#categories">Categorías</SmoothScrollLink>
          </li>
          <li className="cursor-pointer">
            <SmoothScrollLink href="#offers">Ofertas</SmoothScrollLink>
          </li>
          <li className="cursor-pointer">
            <SmoothScrollLink href="#tips">Tips</SmoothScrollLink>
          </li>
          <li className="cursor-pointer">
            <SmoothScrollLink href="#history">Historia</SmoothScrollLink>
          </li>
          <li className="cursor-pointer">
            <SmoothScrollLink href="#about">About</SmoothScrollLink>
          </li>
          <li className="cursor-pointer">
            <SmoothScrollLink href="#social-media">
              Social Media
            </SmoothScrollLink>
          </li>
          <li className="cursor-pointer">
            <SmoothScrollLink href="#contact">Contacto</SmoothScrollLink>
          </li>
        </ul>
      </nav>
      <Link href={"/auth/login"}>
        <UserIcon className="w-6 h-6 text-gray-300 cursor-pointer" />
      </Link>
      <UserIcon
        className="w-6 h-6 text-red-600 cursor-pointer "
        onClick={() => signOut()}
      />
    </div>
  );
}
