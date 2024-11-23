import Link from "next/link";
import { FaCamera } from "react-icons/fa";
import { GiHeartWings } from "react-icons/gi";
import { TbWorldWww } from "react-icons/tb";

export default function Agency() {
  const links = [
    {
      href: "https://www.instagram.com/dadonediego/",
      icon: <FaCamera size={18} />,
      text: "Diego Dadone",
      title: "Fotografías",
    },
    {
      href: "https://www.instagram.com/fenixmodelss/",
      icon: <GiHeartWings size={24} />,
      text: "Fénix models",
      title: "Modelos",
    },
    {
      href: "https://www.linkedin.com/in/fersquaglia/",
      icon: <TbWorldWww size={20} />,
      text: "Desarrollado por Fernando Squaglia",
      title: "Desarrollador",
    },
  ];

  return (
    <div className="flex flex-row items-center justify-center py-4  bg-yellow-100 text-slate-400">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className="flex flex-row items-center justify-center gap-2 mx-4"
          target="_blank" // Abre en una nueva pestaña
          rel="noopener noreferrer" // Buenas prácticas de seguridad
        >
          <span title={link.title}>{link.icon}</span>
          <span className="hidden sm:block text-sm md:text-base">
            {link.text}
          </span>
        </Link>
      ))}
    </div>
  );
}
