"use client";

import { useState, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import MessageComponent from "@/ui/MessageComponent";

function PageProducts() {
  const [categoriesProducts, setCategoriesProducts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;
        const response = await fetch(`${apiUrl}/api/categories/categories`, {
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error("Error al cargar las categorías de productos");

        const data = await response.json();
        setCategoriesProducts(data);
      } catch (error) {
        console.error("Error al cargar las categorías de productos:", error);
        setError("Error al cargar las categorías. Intenta recargar la página.");
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return (
      <div className="flex mx-auto my-4">
        <MessageComponent message={error} type="error" />
      </div>
    );
  }

  return (
    <div className="container flex flex-col justify-center text-center">
      {categoriesProducts ? (
        <CategorySelect data={categoriesProducts} />
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
}

export default PageProducts;
