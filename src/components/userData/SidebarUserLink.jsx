"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdNotificationsActive } from "react-icons/md";
import { MdSpaceDashboard } from "react-icons/md";
import { PiPassword } from "react-icons/pi";
import { RxActivityLog } from "react-icons/rx";
import { useSession } from "next-auth/react";
import { ImProfile } from "react-icons/im";

const icons = {
  iconDashboard: MdSpaceDashboard,
  iconNotifications: MdNotificationsActive,
  iconProfile: ImProfile,
  iconActivity: RxActivityLog,
  iconChangePass: PiPassword,
};

function SidebarUserLink({ href, icon, label }) {
  const { data: session, status } = useSession();

  const LinkIcon = icons[icon];
  const pathname = usePathname();
  if (label === "Perfil" && status === "authenticated") {
    href = "/users/profile/" + session?.user.id + "/edit";
  }

  return (
    <Link
      href={href}
      className={`text-sm font-medium py-2 px-2 hover:bg-teal-500 hover:text-white hover:scale-105 rounded-md transition duration-150 ease-in-out flex items-center ${
        pathname === href ? "text-teal-500" : "text-gray-700"
      }`}
    >
      <LinkIcon className="w-6 h-6 fill-current inline-block mx-2 md:mx-0 md:mr-2" />
      <span className="hidden md:block">{label}</span>
    </Link>
  );
}
export default SidebarUserLink;
