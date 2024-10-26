"use client";
import React from "react";
import Image from "next/image";
import { FaUser, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

function UserCard({ item, user }) {
  const classBG = item % 2 === 0 ? "bg-slate-100" : "bg-slate-700";
  const classText = item % 2 === 0 ? "text-slate-700" : "text-slate-100";

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

  return (
    <div
      className={`max-w-3xl w-full rounded-3xl p-4 mx-auto ${classBG} hover:outline-2 hover:outline ${
        isVencido ? "shadow-lg shadow-red-600 " : null
      }`}
    >
      <div className="flex flex-row flex-wrap gap-4">
        {/* Imagen del usuario */}
        {user?.imagen && (
          <Image
            src={user.imagen}
            alt={`Avatar ${user.email}`}
            height={96}
            width={96}
            className="h-24 w-24 object-cover rounded-2xl"
          />
        )}

        {/* Datos del usuario */}
        <div
          className={`flex flex-col flex-grow justify-left text-start ${classText}`}
        >
          {user?.nombreContacto && (
            <div className="flex items-center space-x-2">
              <FaUser />
              <span className="text-xl font-semibold">
                {user.nombreContacto}
              </span>
            </div>
          )}
          {user?.email && (
            <div className="flex items-center space-x-2">
              <MdEmail />
              <span>{user.email}</span>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <FaPhone />
            <span>{user?.celTE || "No disponible"}</span>
          </div>
        </div>

        {/* Saldo y fecha de vencimiento */}
        {user?.saldo !== 0 && (
          <div
            className={`flex flex-col items-center ${classText} border-l-2 w-32`}
          >
            <span className="text-sm font-semibold">Saldo</span>
            <span className="text-lg ">$ {user.saldo}</span>
            {/* <hr className="my-1 border w-3/4" /> */}
            <span>{isVencido ? "Venció" : "Vence"}</span>
            <span>{formattedDate}</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserCard;
