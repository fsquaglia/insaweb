"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/cards/CardProduct";
import { getConfig } from "@/utils/local_session_storage.js/local_session_storage";
import LoadingDiv from "@/ui/LoadingDiv";
import MessageComponent from "@/ui/MessageComponent";

const defaultProductsByPage = 2;

function Products({ category, subCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastVisible, setLastVisible] = useState(null);
  const [totalProducts, setTotalProducts] = useState(0);
  const [updateTotalPages, setUpdateTotalPages] = useState(false);

  const fetchProducts = async (startAfter = null, reset = false) => {
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
        Number(configurations?.productosPorPagina) || defaultProductsByPage
      );

      if (startAfter) {
        url.searchParams.append("startAfter", startAfter);
      }

      const res = await fetch(url);
      const data = await res.json();

      if (res.ok && data && !data.hasOwnProperty("error")) {
        const newProducts = data.products.filter(
          (newProduct) =>
            !products.some((prod) => prod.docID === newProduct.docID)
        );

        setProducts((prevProducts) =>
          reset ? newProducts : [...prevProducts, ...newProducts]
        );
        setLastVisible(data.lastVisible);

        if (!updateTotalPages) {
          setTotalProducts(data?.totalDocs);
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
    setProducts([]); // Limpiar productos cuando cambia la categoría o subcategoría
    fetchProducts(null, true);
  }, [category, subCategory]);

  const handleLoadMore = () => {
    fetchProducts(lastVisible);
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
        {products.map((product) => (
          <CardProduct
            key={product.docID}
            product={product}
            category={category}
            subCategory={subCategory}
          />
        ))}
      </div>
      <div className="flex justify-center items-center mt-6">
        {products.length < totalProducts && (
          <button
            onClick={handleLoadMore}
            className="border rounded shadow-lg p-2 font-light text-slate-500 bg-emerald-200 hover:shadow-xl"
          >
            Mostrar más
          </button>
        )}
      </div>
    </div>
  );
}

export default Products;
