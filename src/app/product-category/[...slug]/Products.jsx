"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/cards/CardProduct";
import { getConfig } from "@/utils/local_session_storage.js/local_session_storage";
import LoadingDiv from "@/ui/LoadingDiv";
import Pagination from "@/ui/Pagination";
import { productsMocks } from "@/utils/mockup/products";

//productos a mostrar por página
const productsByPage = 2;

function Products({ category, subCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(products.length / productsByPage);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const configurations = await getConfig();

        const url = `/api/products/productsBySubCat?categoria=${encodeURIComponent(
          category
        )}&subcategoria=${encodeURIComponent(
          subCategory
        )}&includeProductsWithoutStock=${
          configurations?.mostrarProductosSinStock
        }`;

        const res = await fetch(url);
        const data = await res.json();

        if (data && !data.hasOwnProperty("error") && data.length > 0) {
          setProducts(data);
          console.log(data);
        } else {
          setProducts([]); // Si no hay productos
        }
      } catch (error) {
        console.error("Error al obtener los productos: ", error);
        setError("Ha ocurrido un error al obtener los productos...");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    // fetchFalse();
  }, [category, subCategory]);

  //handle de paginación
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) {
    return <LoadingDiv />;
  }

  if (error) {
    return (
      <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
        {error}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-gray-600 text-center my-12">
        No hay productos para mostrar aún...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex flex-row flex-wrap gap-6 flex-grow">
        {products
          .slice(
            (currentPage - 1) * productsByPage,
            currentPage * productsByPage
          )
          .map((product) => (
            <CardProduct
              key={product.docID}
              product={product}
              category={category}
              subCategory={subCategory}
            />
          ))}

        {/* {products.map((product) => (
          <CardProduct
            key={product.id}
            product={product}
            category={category}
            subCategory={subCategory}
          />
          <CardProduct
            key={product.docID}
            product={product}
            category={category}
            subCategory={subCategory}
          />
        ))} */}
      </div>
      <div className=" flex justify-center items-center mt-6">
        {products.length > productsByPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disableNext={currentPage === totalPages}
            disablePrev={currentPage === 1}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
