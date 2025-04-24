import SidebarUserLink from "@/components/userData/SidebarUserLink";
import { listItemsUser } from "@/components/userData/SidebarUserItems";
import SidebarUserSearchbar from "@/components/userData/SidebarUserSearchbar";
import SalutationUser from "@/ui/SalutationUser";

export default function Layout({ children }) {
  return (
    <div
      id="view"
      className="w-full flex flex-col items-center antialiased mt-24"
    >
      <div
        id="sidebar"
        className="md:absolute md:top-24 md:left-0 md:bottom-12 py-2 md:py-4 bg-white md:shadow-xl px-3 w-full md:w-60 overflow-x-hidden transition-transform duration-300 ease-in-out"
      >
        <div className="space-y-2 md:space-y-4">
          {/*Search bar */}
          {false && <SidebarUserSearchbar />}

          {/* Nombre del usuario */}
          <div className="text-center text-sm text-slate-400 hidden md:block">
            <SalutationUser />
            <hr className="border border-b border-slate-200 mt-2" />
          </div>

          {/*Menú */}
          <div
            id="menu"
            className="flex flex-row justify-center md:flex-col md:space-y-2 "
          >
            {listItemsUser?.length > 0 &&
              listItemsUser.map((item) => (
                <SidebarUserLink
                  key={item.name}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
          </div>
        </div>
      </div>
      <div className="flex w-full">
        <div className="flex-none w-60 hidden md:block"></div>
        <div className="flex-grow grow">{children}</div>
      </div>
    </div>
  );
}
