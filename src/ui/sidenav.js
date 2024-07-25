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
      {/* <div className="border flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <form>
          <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3">
            <PowerIcon className="w-6" />
            <div className="hidden md:block">Sign Out</div>
          </button>
        </form>
      </div> */}
    </div>
  );
}
