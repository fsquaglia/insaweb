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

  const classBG = item % 2 === 0 ? "sin-fondo" : "bg-slate-100";
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
    if (isBalance || !user?.id) return;
    router.push(`/dashboard/profile/${user.id}/edit`);
  };

  return (
    <div
      className={`w-full mx-auto hover:bg-slate-200 ${classBG} ${
        !isBalance && "cursor-pointer"
      } p-2 text-md text-slate-500`}
      onClick={handleClickEditUser}
    >
      <div className="flex flex-row flex-wrap justify-center">
        {/*Imagen y datos del usuario */}
        <div className="sm:w-2/5 flex flex-row items-center gap-4 border">
          {/* Imagen del usuario */}
          {user?.imagen && (
            <div className="flex items-center justify-center">
              <Image
                src={user.imagen}
                alt={`Avatar ${user.email}`}
                height={64}
                width={64}
                className="h-16 w-16 object-cover rounded-full"
              />
            </div>
          )}

          {/* Datos del usuario */}
          <div className={`flex flex-col flex-grow justify-left text-start`}>
            {user?.nombreContacto && (
              <div className="flex items-center space-x-2">
                <FaUser />
                <span className="font-semibold">{user.nombreContacto}</span>
              </div>
            )}
            {user?.email && (
              <div className="flex items-center space-x-2 text-sm">
                <MdEmail />
                <span>{user.email}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm">
              <FaPhone />
              <span>{user?.celTE || "No disponible"}</span>
            </div>
          </div>
        </div>
        {/* Info privada para administradores */}
        <div className="sm:w-2/5 flex flex-row items-center gap-2 border p-2">
          <RiGitRepositoryPrivateFill />
          <span className="font-light text-sm">
            {user?.privateInfo || "Sin info privada"}
          </span>
        </div>
        {/*Saldo + Rol del usuario */}
        <div className="sm:w-1/5 flex flex-row items-center justify-center gap-2 border">
          {/* Saldo y fecha de vencimiento */}
          {isBalance && user?.saldo !== 0 && (
            <div className="flex flex-row items-center border text-sm xl:text-base">
              <div className="flex flex-col items-center justify-center mx-2 w-1/2">
                <span>Saldo</span>
                <span>$ {user.saldo}</span>
              </div>
              {/* <hr className="my-1 border w-3/4" /> */}
              <div
                className={`flex flex-col items-center justify-center mx-2 w-1/2 ${
                  isVencido && "text-red-600"
                }`}
              >
                <span>{isVencido ? "Venció" : "Vence"}</span>
                <span>{formattedDate}</span>
              </div>
            </div>
          )}
          {/*Rol del usuario*/}
          {!isBalance && user?.rol && (
            <div className="flex flex-row items-center justify-start mx-2">
              {user?.rol === "admin" ? (
                <MdAdminPanelSettings className="w-6 h-6 text-yellow-500" />
              ) : (
                <FaUserCircle className="w-6 h-6 text-gray-500" />
              )}
              <span className="text-sm md:text-base mx-2">{user?.rol}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
