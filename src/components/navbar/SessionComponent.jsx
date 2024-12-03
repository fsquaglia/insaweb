"use client";
import { UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { GiPowerButton } from "react-icons/gi";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { MdOutlineModeEditOutline } from "react-icons/md";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { onClickSignOut } from "@/utils/OnSignOutEvent";
import LoadingThree from "@/ui/LoadingThree";
import { HiUser } from "react-icons/hi2";
import { useState } from "react";

function UserImage({ image, name }) {
  return image ? (
    <Image
      src={image}
      alt={`Avatar ${name || "usuario"}`}
      width={36}
      height={36}
      className="size-9 rounded-full"
      title={name || "usuario"}
    />
  ) : (
    <div className="bg-gray-100 flex items-center justify-center">
      <HiUser className="text-gray-500 text-3xl" />
    </div>
  );
}

function SessionComponent({ session, status }) {
  const router = useRouter();
  const [showUser, setShowUser] = useState(false);

  const onClickPanel = () => {
    if (session?.user?.role === "admin") {
      router.push("/dashboard");
    } else {
      router.push("/users");
    }
  };

  if (status === "loading") {
    return (
      <div className="text-sm">
        <LoadingThree />
      </div>
    );
  }

  const handleClickEditUser = () => {
    session?.user?.role === "admin"
      ? router.push(`/dashboard/profile/${session?.user?.id}/edit`)
      : router.push(`/users/profile/${session?.user?.id}/edit`);
  };

  return (
    <div>
      {session && status === "authenticated" ? (
        <div className="flex flex-row items-center justify-center gap-2 w-full min-w-36">
          <div
            className="size-9 rounded-full shrink-0 cursor-pointer relative z-40"
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
          <div className="flex items-center justify-center size-9 border rounded-full shrink-0 cursor-pointer hover:border-sky-600 hover:bg-sky-600">
            <MdOutlineSpaceDashboard
              title="Ir al Panel"
              className="size-6 text-gray-300"
              onClick={() => onClickPanel()}
              size={32}
            />
          </div>
          {/*Ícono de cerrar sesión */}
          <div className="flex items-center justify-center size-9 border rounded-full shrink-0 cursor-pointer  hover:border-red-600 hover:bg-red-600">
            <GiPowerButton
              title="Logout"
              className="size-6 text-gray-300"
              onClick={() => onClickSignOut()}
              size={32}
            />
          </div>
        </div>
      ) : (
        <div className="flex justify-end">
          <Link href="/auth/login">
            <UserIcon
              className="size-6 text-gray-300 cursor-pointer"
              aria-label="Login"
              title="Login"
            />
          </Link>
        </div>
      )}
    </div>
  );
}

export default SessionComponent;
