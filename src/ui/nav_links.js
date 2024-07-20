"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaHome, FaRegStar } from "react-icons/fa"; //Main y Home
import { MdHistoryEdu } from "react-icons/md"; //History
import { SiAboutdotme } from "react-icons/si"; //About
import { RiTeamFill } from "react-icons/ri"; //team
import { TbSocial } from "react-icons/tb"; //social media y contacto
import { GiFireflake } from "react-icons/gi"; //Slogan o Eslogan
import { MdCategory } from "react-icons/md"; //Categorías de productos
import { links } from "@/utils/linksDashboard";

import "./sidenav.css";

// const links = [
//   { name: "Home", href: "/dashboard", icon: FaHome },
//   { name: "Principal", href: "/dashboard/main", icon: FaRegStar },
//   { name: "Historia", href: "/dashboard/history", icon: MdHistoryEdu },
//   { name: "About", href: "/dashboard/about", icon: SiAboutdotme },
//   { name: "Team", href: "/dashboard/team", icon: RiTeamFill },
//   { name: "Contacto", href: "/dashboard/socialMedia", icon: TbSocial },
//   { name: "Eslogan", href: "/dashboard/slogan", icon: GiFireflake },
//   { name: "Categorías", href: "/dashboard/category", icon: MdCategory },
// ];

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
