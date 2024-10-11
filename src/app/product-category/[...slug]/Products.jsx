"use client";
import React, { useEffect, useState } from "react";
import CardProduct from "@/components/cards/CardProduct";
import { InfinitySpin } from "react-loader-spinner";

function Products({ category, subCategory }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await fetch(
          `/api/products/productsBySubCat?categoria=${category}&subcategoria=${subCategory}`
        );
        const data = await res.json();

        if (data && !data.hasOwnProperty("error") && data.length > 0) {
          setProducts(data);
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
  }, [category, subCategory]); // Se vuelve a ejecutar cuando cambian 'category' o 'subCategory'

  if (loading) {
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
    <div className="flex flex-row flex-wrap gap-6">
      {products.map((product) => (
        <CardProduct key={product.docID} product={product} />
      ))}
    </div>
  );
}

export default Products;
