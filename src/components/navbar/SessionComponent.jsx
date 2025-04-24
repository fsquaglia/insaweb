"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { GiPowerButton } from "react-icons/gi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useRouter, usePathname } from "next/navigation";
import { onClickSignOut } from "@/utils/OnSignOutEvent";
import LoadingThree from "@/ui/LoadingThree";
import { useEffect, useState } from "react";
import { MdNotificationsActive } from "react-icons/md";
import DivCircle from "./DivCircle";
import UserImage from "./UserImage";

function SessionComponent({ session, status }) {
  const router = useRouter();
  const pathname = usePathname();
  const [showNotification, setShowNotification] = useState(
    session?.user?.hasBalance ||
      !session?.user?.hasPhone ||
      !session?.user?.verifiedUser
  );
  const [showUser, setShowUser] = useState(false);

  const isDashboard =
    pathname.startsWith("/dashboard") || pathname.startsWith("/users");
  const isNotifications =
    pathname.startsWith("/users/notifications") ||
    pathname.startsWith("/dashboard/notifications");

  useEffect(() => {
    setShowNotification(
      session?.user?.hasBalance ||
        !session?.user?.hasPhone ||
        !session?.user?.verifiedUser
    );
  }, [session]);

  const handleClickNotifications = () => {
    if (session?.user?.role === "user") {
      router.push("/users/notifications");
    } else {
      alert("falta hacer esto");
    }
  };

  const onClickPanel = () => {
    if (session?.user?.role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/users");
    }
  };

  const handleClickEditUser = () => {
    session?.user?.role === "admin"
      ? router.push(`/dashboard/profile/${session?.user?.id}/edit`)
      : router.push(`/users/profile/${session?.user?.id}/edit`);
  };

  if (status === "loading") {
    return (
      <div className="text-sm">
        <LoadingThree />
      </div>
    );
  }

  return (
    <div>
      {session && status === "authenticated" ? (
        <div className="flex flex-row items-center justify-center gap-2 w-full min-w-36">
          <div
            className="relative size-9 rounded-full shrink-0 cursor-pointer z-40"
            onClick={() => setShowUser(!showUser)}
          >
            <UserImage
              image={session?.user?.image}
              name={session?.user?.name}
            />

            {/*desplegable con nombre de usuario */}
            {showUser && (
              <div
                className={`absolute right-0 top-0 w-fit h-9 border rounded-full font-light transition-opacity duration-700 bg-slate-800 bg-opacity-90 flex flex-row gap-2 ${
                  showUser ? "opacity-100" : "opacity-0"
                }`}
              >
                <div className="flex flex-col justify-center items-center ml-4 mr-2">
                  <div className="text-sm text-neutral-200">
                    {session?.user?.name || "Nombre y Apellido"}
                  </div>
                  <span className="text-xs text-neutral-300">
                    {session?.user?.email || "XXXXXXXXXXXXXXXXXXX"}
                  </span>
                </div>
                <div className="size-9 shrink-0">
                  <UserImage
                    image={session?.user?.image}
                    name={session?.user?.name}
                  />
                </div>
              </div>
            )}

            {/*icono de edición de usuario*/}
            {showUser && (
              <div
                className={`size-6 rounded-full bg-slate-100 border absolute -bottom-2 -right-2 z-50 flex items-center justify-center hover:bg-green-300 hover:border-green-300 transition-transform duration-700 ${
                  showUser ? "scale-100" : "scale-0"
                }`}
                onClick={handleClickEditUser}
              >
                <MdOutlineModeEditOutline className="text-gray-800 size-4" />
              </div>
            )}
          </div>
          {/*Ícono Dashboard */}
          {!isDashboard && (
            <DivCircle className="bg-cyan-600 hover:bg-cyan-500">
              <MdOutlineSpaceDashboard
                title="Ir al Panel"
                className="size-6"
                onClick={() => onClickPanel()}
                size={32}
              />
            </DivCircle>
          )}
          {/*Ícono de notificaciones */}
          {!isNotifications && showNotification && (
            <DivCircle className="animate-pulse bg-rose-600 hover:bg-rose-500">
              <MdNotificationsActive
                className="size-6"
                title="Tienes notificaciones"
                onClick={() => handleClickNotifications()}
                size={32}
              />
            </DivCircle>
          )}
          {/*Ícono de cerrar sesión */}
          <DivCircle className="bg-red-600 hover:bg-red-500">
            <GiPowerButton
              title="Cerrar sesión"
              className="size-6"
              onClick={() => onClickSignOut()}
              size={32}
            />
          </DivCircle>
        </div>
      ) : (
        <DivCircle className="hover:border hover:rounded-full">
          <Link href="/auth/login">
            <UserIcon
              className="size-6 animate-pulse"
              aria-label="Login"
              title="Login"
            />
          </Link>
        </DivCircle>
      )}
    </div>
  );
}

export default SessionComponent;
