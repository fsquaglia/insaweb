"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/cards/CardProduct";
import { getConfig } from "@/utils/local_session_storage.js/local_session_storage";
import LoadingDiv from "@/ui/LoadingDiv";
import Pagination from "@/ui/Pagination";
import MessageComponent from "@/ui/MessageComponent";

const defaultProductsByPage = 2; //productos a mostrar por página por defecto (si hay error al traerlos de config)

function Products({ category, subCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastVisible, setLastVisible] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [productsByPage, setProductsByPage] = useState(defaultProductsByPage);
  const [updateTotalPages, setUpdateTotalPages] = useState(false);

  const fetchProducts = async (startAfter = null) => {
    console.log("startAfter");
    console.log(startAfter);

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
        configurations?.mostrarProductosSinStock || false
      );
      url.searchParams.append(
        "limit",
        configurations?.productsByPage || defaultProductsByPage
      );

      if (startAfter) {
        url.searchParams.append("startAfter", startAfter);
      }

      const res = await fetch(url);

      // const res = await fetch(url, {
      //   method: "POST", // Cambia el método a POST
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(startAfter || {}),
      // });

      const data = await res.json();

      if (res.ok && data && !data.hasOwnProperty("error")) {
        setProducts((prevProducts) => [...prevProducts, ...data.products]);
        setLastVisible(data.lastVisible);
        // Actualizamos totalPages en base al total de productos devueltos
        if (!updateTotalPages) {
          setTotalPages(Math.ceil(data?.totalDocs / productsByPage));
          setUpdateTotalPages(true);
        }
      } else {
        setProducts([]);
      }
    } catch (error) {
      console.error("Error al obtener los productos: ", error);
      setError("Ha ocurrido un error al obtener los productos...");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [category, subCategory]);

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
      if (newPage > currentPage) {
        fetchProducts(lastVisible);
      }
    }
  };

  if (loading) {
    return <LoadingDiv />;
  }

  if (error) {
    return <MessageComponent message={error} type={"error"} />;
  }

  if (products.length === 0) {
    return (
      <MessageComponent
        message={"No hay productos para mostrar aún..."}
        type={"info"}
      />
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
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            disableNext={currentPage >= totalPages || !lastVisible}
            disablePrev={currentPage === 1}
          />
        )}
      </div>
    </div>
  );
}

export default Products;
