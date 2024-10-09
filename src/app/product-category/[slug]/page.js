"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";

function page({ params }) {
  const categoria = params.slug;
  const [subCategories, setSubCategories] = useState([]);
  const [bgColor, setBgColor] = useState("bg-slate-100");
  const [subCategorySelected, setSubcategorySelected] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categories = await getAllDocsColection("productos");
        const subCat = categories.find((item) => item.docID === categoria);
        if (subCat) {
          setSubCategories(subCat.docData.subcategorias);
          setSubcategorySelected(subCat.docData.subcategorias[0]);

          // Aquí haces el mapeo explícito de colores
          const colorBase = subCat.docData.colorBase || "slate";
          const bgClass = {
            slate: "bg-slate-50",
            red: "bg-red-50",
            blue: "bg-blue-50",
            green: "bg-green-50",
            pink: "bg-pink-50",
            orange: "bg-orange-50",
            yellow: "bg-yellow-50",
            purple: "bg-purple-50",
            gray: "bg-gray-50",
          };

          setBgColor(bgClass[colorBase] || "bg-slate-100");
        }
      } catch (error) {
        console.error("Error al obtener las categorías de la BDD: ", error);
      }
    };
    fetchData();
  }, [params]);

  return (
    <div className={`${bgColor} px-20 2xl:px-60 py-20 flex flex-row gap-12`}>
      <div className="w-1/4">
        <div className="border rounded flex items-center p-2 w-full max-w-sm">
          <input
            className="border-0 bg-transparent flex-grow m-1 focus:outline-none w-full max-w-sm"
            placeholder="Buscar..."
          />
          <FaSearch className="text-gray-600 cursor-pointer w-5 h-5" />
        </div>

        <div className="flex flex-col gap-4 my-8">
          <span className="text-md font-bold">SubCategorías</span>
          {subCategories.length > 0 &&
            subCategories.map((item, index) => (
              <div key={index}>
                {" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setSubcategorySelected(item)}
                >
                  {item}
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="w-3/4 bg-white rounded p-12 text-slate-600">
        {`${categoria} / ${subCategorySelected} `}
      </div>
    </div>
  );
}

export default page;
