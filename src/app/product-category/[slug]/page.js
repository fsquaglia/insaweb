"use client";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Products from "./Products";
import { InfinitySpin } from "react-loader-spinner";

function Page({ params }) {
  const categoria = params.slug;
  const [subCategories, setSubCategories] = useState([]);
  const [categoryData, setCategoryData] = useState(null); // Inicializar en null en vez de un objeto vacío
  const [bgColor, setBgColor] = useState("bg-slate-100");
  const [subCategorySelected, setSubcategorySelected] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/categories/categoryById?categoria=${categoria}`
        );
        const categ = await res.json();

        if (categ && !categ.hasOwnProperty("error")) {
          setCategoryData(categ);
          setSubCategories(categ.docData.subcategorias || []);
          setSubcategorySelected(categ.docData.subcategorias?.[0] || "");

          const colorBase = categ.docData.colorBase || "slate";
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
        } else {
          throw new Error("La categoría no fue encontrada");
        }
      } catch (error) {
        console.error("Error al obtener las categorías de la BDD: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [params]);

  if (error) {
    return (
      <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
        {error}
      </div>
    );
  }

  // Mostrar el loader si está cargando o si no hay datos en categoryData
  if (loading || !categoryData) {
    return <LoadingDiv />;
  }

  return (
    <div
      className={`${bgColor} px-20 2xl:px-60 py-20 flex flex-col md:flex-row gap-12`}
    >
      {/*--------SideNav----------*/}
      <div className="w-full md:w-1/4">
        {/*SideNav -> Buscador*/}
        <div className="border rounded flex items-center p-2 w-full max-w-sm">
          <input
            className="border-0 bg-transparent flex-grow m-1 focus:outline-none w-full max-w-sm"
            placeholder="Buscar..."
          />
          <FaSearch className="text-gray-600 cursor-pointer w-5 h-5" />
        </div>
        {/*SideNav -> SubCategorias*/}
        <div className="flex flex-col gap-4 my-12 text-slate-800">
          <span className="text-xl">
            SubCategorías {categoryData?.docData?.id}
          </span>
          {subCategories.length > 0 &&
            subCategories.map((item, index) => (
              <div key={index}>
                <span
                  className="cursor-pointer ms-2"
                  onClick={() => setSubcategorySelected(item)}
                >
                  {item}
                </span>
              </div>
            ))}
        </div>
      </div>
      {/*--------Contenido----------*/}
      <div className="w-full md:w-3/4 min-h-screen bg-white rounded p-12 flex flex-col">
        {/*BreadCrumb*/}
        <p className="text-slate-400">
          <Link href="/">Home</Link>
          {` / ${categoryData?.docData?.id} / ${subCategorySelected} `}
        </p>
        {/*Titulo*/}
        <span className="text-5xl font-bold my-10 capitalize">
          {categoryData?.docData?.id}
        </span>
        {/*Descripcion*/}
        <p className="text-slate-700 text-justify">
          {categoryData?.docData?.textoSeccionWeb}
        </p>
        {/*Productos*/}
        <div className="my-8">
          <Products />
        </div>
      </div>
    </div>
  );
}

export default Page;

const LoadingDiv = () => {
  return (
    <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
      <InfinitySpin
        visible={true}
        width="200"
        color="#4fa94d"
        ariaLabel="infinity-spin-loading"
      />
    </div>
  );
};
