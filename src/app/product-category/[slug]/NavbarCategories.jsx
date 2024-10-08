"use client";
import { useState } from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa"; // Para el ícono de usuario
import { HiMenu, HiX } from "react-icons/hi"; // Para el menú tipo burger

const NavbarCategories = ({ categories }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="text-white text-2xl font-bold">
          <Link href="/">Inicio</Link>
        </div>

        {/* Menú Burger (solo visible en móviles) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none"
          >
            {isOpen ? <HiX size={30} /> : <HiMenu size={30} />}
          </button>
        </div>

        {/* Links de navegación */}
        <div
          className={`md:flex items-center space-x-4 ${
            isOpen ? "block" : "hidden"
          } md:block`}
        >
          {/* Categorías mapeadas */}
          {categories?.length > 0 ? (
            categories.map((category) => (
              <Link
                key={category.docID}
                href={`/product-category/${category.docID}`}
              >
                <div className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium">
                  {category.docData.id}
                </div>
              </Link>
            ))
          ) : (
            <span className="text-white">Cargando...</span>
          )}

          {/* Icono de usuario para el login */}
          <Link href="/login">
            <div className="text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center">
              <FaUserCircle size={20} className="mr-1" /> Login
            </div>
          </Link>
        </div>
      </div>

      {/* Menú desplegable para dispositivos pequeños */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {categories?.length > 0 &&
            categories.map((category) => (
              <Link
                key={category.docID}
                href={`/product-category/${category.docID}`}
              >
                <div className="block text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium">
                  {category.docData.id}
                </div>
              </Link>
            ))}
          <Link href="/login">
            <div className="block text-white bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-medium">
              <FaUserCircle size={20} className="mr-1 inline" /> Login
            </div>
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarCategories;
