import Nav_links from "./nav_links";
import Link from "next/link";
import Image from "next/image";
//import { PowerIcon } from "@heroicons/react/24/outline";
import "./sidenav.css";

export default function Sidenav() {
  return (
    <div className="responsive-container">
      {/*Logo Comerncio con link a Home */}
      <Link
        className="mb-2 flex items-end justify-center rounded-md p-4 "
        href="/"
      >
        <div>
          {/* Icono a cambiar por el de Ihara y London */}
          <Image
            src="/images/logo_blanco01.png"
            alt="Logo Ihara & London"
            width={64}
            height={64}
            style={{ width: "64px", height: "64px" }}
          />
        </div>
      </Link>

      <Nav_links />
    </div>
  );
}
