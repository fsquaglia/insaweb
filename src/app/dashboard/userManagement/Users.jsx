"use client";
import MessageComponent from "@/ui/MessageComponent";
import UserCard from "./UserCard";
import { useState, useCallback } from "react";
import { IoIosSearch } from "react-icons/io";
import { debounce, set } from "lodash";

export default function Users({ allUsers }) {
  const [users, setUsers] = useState(allUsers); // Usuarios visibles en la UI
  const [filteredUsers, setFilteredUsers] = useState(allUsers); // Usuarios filtrados por botones
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const buttons = [
    { label: "Todos", filter: "all" },
    { label: "Con Saldo", filter: "balance" },
    { label: "Saldo Vencido", filter: "expired" },
  ];
  const today = new Date();

  const handleClick = (filter) => {
    setSearchTerm(""); // Limpiar el input de búsqueda al cambiar de filtro
    setActiveFilter(filter);
    let filtered = [];

    if (filter === "all") {
      filtered = allUsers;
    } else if (filter === "balance") {
      const filteredWithoutOrder = allUsers.filter(
        (user) => (user.saldo || 0) > 0
      );
      filtered = filteredWithoutOrder.sort((a, b) => {
        const saldoA = a.fechaVenceSaldo.seconds || 0;
        const saldoB = b.fechaVenceSaldo.seconds || 0;
        return saldoA - saldoB;
      });
    } else if (filter === "expired") {
      const filteredWithoutOrder = allUsers.filter((user) => {
        if (!user.fechaVenceSaldo || !user.saldo) return false;
        const fechaVence = new Date(user.fechaVenceSaldo.seconds * 1000);
        filtered = filteredWithoutOrder.sort((a, b) => {
          const saldoA = a.fechaVenceSaldo.seconds || 0;
          const saldoB = b.fechaVenceSaldo.seconds || 0;
          return saldoA - saldoB;
        });
        return fechaVence < today;
      });
    }

    setFilteredUsers(filtered); // Guardamos el resultado del filtro
    setUsers(filtered); // También actualizamos la UI
  };

  const handleSearch = useCallback(
    debounce((term) => {
      const filtered = filteredUsers.filter((user) =>
        user.nombreContacto?.toLowerCase().includes(term.toLowerCase())
      );
      setUsers(filtered);
    }, 400),
    [filteredUsers] // Dependemos de la lista filtrada por botones
  );

  const onSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  return (
    <div className="flex flex-col justify-center w-full text-center">
      {/* Botones de filtrado */}
      <div className="flex flex-row justify-center my-2">
        {buttons.map((button) => (
          <button
            type="button"
            className={`rounded-xl cursor-pointer mx-2 p-2 text-xs sm:text-sm text-slate-600 hover:bg-sky-300 w-28 ${
              activeFilter === button.filter ? "bg-sky-200" : "bg-sky-100"
            }`}
            key={button.filter}
            onClick={() => handleClick(button.filter)}
            aria-label={button.label}
          >
            {button.label}
          </button>
        ))}
      </div>

      {/* Input de búsqueda */}
      <div className="flex flex-row justify-center my-2">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Buscar usuario"
            className="w-full border border-slate-400 rounded-full text-slate-600 p-2 pr-10 focus:border-sky-500 focus:outline-none"
            aria-label="Buscar usuario"
            value={searchTerm}
            onChange={onSearchChange}
          />
          <IoIosSearch className="absolute right-10 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5" />

          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                setUsers(filteredUsers); // Restablecer la lista filtrada
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-500 w-5 h-5 hover:text-red-500"
              aria-label="Limpiar búsqueda"
            >
              ✖
            </button>
          )}
        </div>
      </div>

      {/* Mapeado de usuarios */}
      <div>
        {users.length > 0 ? (
          users.map((user, item) => (
            <div
              key={user.id}
              className="flex flex-col justify-center w-full text-center"
            >
              <UserCard item={item} user={user} isBalance={true} />
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center w-full text-center my-2">
            <MessageComponent
              message="No se encontraron datos para mostrar."
              type="info"
            />
          </div>
        )}
      </div>
    </div>
  );
}
