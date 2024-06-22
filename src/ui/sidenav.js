import Nav_links from "./nav_links";
import Link from "next/link";
import { IoLogoAngular } from "react-icons/io";

export default function Sidenav() {
  return (
    <div className="flex h-full flex-col px-3 py-4 md:px-2">
      <p>Soy el sidenav</p>
      <Link
        className="mb-2 flex h-20 items-end justify-start rounded-md p-4 md:h-40"
        href="/"
      >
        <div className="w-32 text-white md:w-40">
          {/* Usar el tamaño correcto y clase de icono */}
          <IoLogoAngular size={50} style={{ color: "red" }} />
        </div>
      </Link>
      <div className="text-white">
        <Nav_links />
      </div>
    </div>
  );
}
