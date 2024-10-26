"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/cards/CardProduct";
import { getConfig } from "@/utils/local_session_storage.js/local_session_storage";
import LoadingDiv from "@/ui/LoadingDiv";
import Pagination from "@/ui/Pagination";

// Productos a mostrar por página
const productsByPage = 2;

function Products({ category, subCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null); // Último documento visible para la paginación
  const [totalPages, setTotalPages] = useState(1);

  // Función para obtener los productos de Firestore
  const fetchProducts = async (limit = productsByPage, startAfter = null) => {
    try {
      setLoading(true);
      const configurations = await getConfig();

      const url = new URL(
        "/api/products/productsBySubCat",
        window.location.origin
      );
      url.searchParams.append("categoria", encodeURIComponent(category));
      url.searchParams.append("subcategoria", encodeURIComponent(subCategory));
      url.searchParams.append(
        "includeProductsWithoutStock",
        configurations?.mostrarProductosSinStock
      );
      url.searchParams.append("limit", limit);

      if (startAfter) {
        url.searchParams.append("startAfter", startAfter);
      }
      console.log(url);

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data && !data.hasOwnProperty("error")) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setLastVisible(data.lastVisible); // Actualiza el último documento visible
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

  // Actualiza el total de páginas cada vez que cambia la lista de productos
  useEffect(() => {
    const calculatedTotalPages = Math.ceil(products.length / productsByPage);
    setTotalPages(calculatedTotalPages);
  }, [products]);

  // Llama a fetchProducts cuando cambian la categoría o subcategoría
  useEffect(() => {
    fetchProducts();
  }, [category, subCategory]);

  // Handle de cambio de página
  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (newPage > currentPage) {
        fetchProducts(productsByPage, lastVisible); // Llama a Firestore para obtener más productos
      }
    }
  };

  // Loading state
  if (loading) {
    return <LoadingDiv />;
  }

  // Error state
  if (error) {
    return (
      <div className="w-full min-h-screen bg-slate-50 text-center pt-20 flex justify-center">
        {error}
      </div>
    );
  }

  // No hay productos
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
      </div>
      <div className="flex justify-center items-center mt-6">
        {products.length > productsByPage && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disableNext={lastVisible === null || currentPage === totalPages}
            disablePrev={currentPage === 1}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
