"use client";
import React from "react";
import Image from "next/image";
import { FaUser, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { MdAdminPanelSettings } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";

function UserCard({ item, user, isBalance }) {
  const router = useRouter();

  const classBG = item % 2 === 0 ? "bg-slate-50" : "bg-slate-100";
  // const classText = item % 2 === 0 ? "text-slate-500" : "text-slate-100";

  // Formatear fecha y verificar vencimiento
  const today = new Date();
  const vencimiento = user?.fechaVenceSaldo
    ? new Date(user.fechaVenceSaldo.seconds * 1000)
    : null;
  const isVencido = vencimiento && vencimiento < today;
  const formattedDate = vencimiento
    ? vencimiento.toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
    : null;

  const handleClickEditUser = () => {
    router.push(`/dashboard/profile/${user.id}/edit`);
  };

  return (
    <div
      className={`w-full mx-auto hover:bg-slate-200 ${classBG} cursor-pointer p-2 md:py-2 md:px-4 text-md text-slate-500`}
      onClick={handleClickEditUser}
    >
      <div className="flex flex-col sm:flex-row flex-wrap justify-between ">
        {/*Imagen y datos del usuario */}
        <div className="flex flex-row items-center gap-4 ">
          {/* Imagen y rol del usuario */}
          <div className="relative flex items-center justify-center">
            {user?.imagen ? (
              <Image
                src={user.imagen}
                alt={`Avatar ${user.email}`}
                height={64}
                width={64}
                className="h-16 w-16 object-cover rounded-full"
              />
            ) : (
              <div className="h-16 w-16 border rounded-full bg-gray-100"></div>
            )}
            {/* Insignia del rol*/}
            <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-gray-100">
              {user?.rol && (
                <div className="flex flex-row items-center justify-start">
                  {user?.rol === "admin" ? (
                    <MdAdminPanelSettings className="w-6 h-6 text-yellow-500" />
                  ) : (
                    <FaUserCircle className="w-6 h-6 text-gray-500" />
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Datos del usuario */}
          <div className={`flex flex-col flex-grow justify-left text-start`}>
            <div className="flex items-center space-x-2">
              <FaUser />
              <span className="font-semibold">
                {user?.nombreContacto || "Anónimo"}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <MdEmail />
              <span>{user?.email || "Email no disponible"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <FaPhone />
              <span>{user?.celTE || "No disponible"}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <RiGitRepositoryPrivateFill />
              <span>{user?.privateInfo || "Sin info privada"}</span>
            </div>
          </div>
        </div>

        {/* Saldo y fecha de vencimiento */}
        <div className="flex flex-row items-center justify-end sm:justify-center gap-2 ">
          {isBalance && user?.saldo !== 0 && (
            <div className="flex flex-row items-center text-sm xl:text-base">
              <div className="flex sm:flex-col flex-row items-center justify-center mx-2 w-1/2">
                <span className="mr-1 sm:mr-0">Saldo</span>
                <span>$ {user.saldo}</span>
              </div>
              {/* <hr className="my-1 border w-3/4" /> */}
              <div
                className={`flex sm:flex-col flex-row items-center justify-center mx-2 w-1/2 ${
                  isVencido && "text-red-600"
                }`}
              >
                <span className="mr-1 sm:mr-0">
                  {isVencido ? "Venció" : "Vence"}
                </span>
                <span>{formattedDate}</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
