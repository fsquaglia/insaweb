import Nav_links from "./nav_links";
import SalutationUser from "./SalutationUser";

export default function Sidenav() {
  return (
    <div className="flex flex-row flex-wrap md:flex-col items-center md:items-start h-8 md:h-full">
      {/* Nombre del usuario */}
      <div className="text-center text-sm hidden md:block w-full text-slate-100">
        <SalutationUser />
        <hr className="border border-b border-slate-200 m-2" />
      </div>
      <Nav_links />
    </div>
  );
}
