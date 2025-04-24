"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import Products from "./Products";
import LoadingDiv from "@/ui/LoadingDiv";

function Page({ params }) {
  const router = useRouter();
  const [categoria, subcategoria] = params.slug;
  const [subCategories, setSubCategories] = useState([]);
  const [categoryData, setCategoryData] = useState(null); // Inicializar en null en vez de un objeto vacío
  const [bgColor, setBgColor] = useState("bg-slate-100");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(decodeURIComponent(categoria));
  const [subCategorySelected, setSubcategorySelected] = useState(
    decodeURIComponent(subcategoria)
  );

  useEffect(() => {
    setCategory(decodeURIComponent(categoria));
    setSubcategorySelected(decodeURIComponent(subcategoria));

    const fetchData = async () => {
      try {
        setLoading(true);
        //obtener de la BDD la info de la categoría
        const res = await fetch(
          `/api/categories/categoryById?categoria=${decodeURIComponent(
            categoria
          )}`,
          {
            next: {
              revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LARGE),
            },
          }
        );
        const categ = await res.json();

        if (categ && !categ.hasOwnProperty("error")) {
          setCategoryData(categ);
          const subCategoriesList = categ.docData.subcategorias || [];
          //ordenar alfabéticamente
          subCategoriesList.sort((a, b) => a.localeCompare(b));
          setSubCategories(subCategoriesList);
          // setSubcategorySelected(categ.docData.subcategorias?.[0] || "");
          const subCatExist = subCategoriesList.some(
            (subCat) => subCat === decodeURIComponent(subcategoria)
          );
          if (!subCatExist) {
            throw new Error("La subcategoría no fue encontrada");
          }
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
  }, []);

  //handler de hacer clic en la subcategoría
  const handleSubcategoryClick = (item) => {
    setSubcategorySelected(item);
    router.push(`/product-category/${categoria}/${item}`, undefined, {
      shallow: true,
    });
  };

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
      className={`${bgColor} px-2 lg:px-8 xl:px-20 2xl:px-60 py-6 md:py-20 flex flex-col md:flex-row gap-2 lg:gap-12`}
    >
      {/*--------SideNav----------*/}
      <div className="w-full md:w-1/4">
        {/*SideNav -> Buscador*/}
        <div className="border rounded flex justify-between items-center p-2 w-full sm:max-w-sm">
          <input
            className="border-0 bg-transparent flex-grow m-1 focus:outline-none w-full max-w-sm"
            placeholder="Próximamente disponible..."
          />
          <FaSearch className="text-gray-600 cursor-pointer w-5 h-5" />
        </div>
        {/*SideNav -> SubCategorias*/}
        <div className="flex flex-col gap-4 my-4 md:my-12 text-slate-800">
          <span className="text-lg md:text-xl md:mb-6 mb-2">
            SubCategorías de {categoryData?.docData?.id}
          </span>
          {subCategories.length > 0 &&
            subCategories.map((item, index) => (
              <div key={index}>
                <p
                  className={`cursor-pointer ms-2 ${
                    item === subCategorySelected &&
                    "bg-gray-700 text-gray-50 rounded p-2"
                  }`}
                  onClick={() => handleSubcategoryClick(item)}
                >
                  {item}
                </p>
              </div>
            ))}
        </div>
      </div>
      {/*--------Contenido----------*/}
      <div className="w-full md:w-3/4 min-h-screen bg-white rounded p-6 md:p-12 flex flex-col">
        {/*BreadCrumb*/}
        <p className="text-slate-400">
          <Link href="/">Home</Link>
          {` / ${categoryData?.docData?.id} / ${subCategorySelected} `}
        </p>
        {/*Titulo*/}
        <span className="text-3xl md:text-5xl font-bold my-6 md:my-10 capitalize">
          {categoryData?.docData?.id}
        </span>
        {/*Descripcion*/}
        <p className="text-slate-700 text-justify">
          {categoryData?.docData?.textoSeccionWeb}
        </p>
        {/*Productos*/}
        <div className="my-8">
          <Products category={category} subCategory={subCategorySelected} />
        </div>
      </div>
    </div>
  );
}

export default Page;
