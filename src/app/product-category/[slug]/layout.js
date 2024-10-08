import React from "react";
import NavbarCategories from "./NavbarCategories";
import { FaSearch } from "react-icons/fa";
import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";

export default async function layout({ children }) {
  let categories = [];
  try {
    categories = await getAllDocsColection("productos");
  } catch (error) {
    console.error("Error al obtener las categorías de la BDD: ", error);
    categories = [];
  }

  return (
    <div>
      <NavbarCategories categories={categories} />
      {/* <NavbarCategories categories={categories} /> */}

      <div className={`bg-slate-100 p-20 flex flex-row gap-12`}>
        <div className="w-1/4  ">
          <div className="border rounded shadow flex flex-row items-center justify-center p-2">
            <input
              className="border-0 bg-transparent m-1"
              placeholder="Buscar..."
            />
            <FaSearch className="mx-2 text-gray-600 cursor-pointer" />
          </div>
        </div>
        <div className="w-3/4 bg-white border">{children}</div>
      </div>
    </div>
  );
}
