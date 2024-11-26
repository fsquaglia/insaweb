"use client";
import { useEffect, useState } from "react";
import CategoryLoader from "./CategoryLoader";
import MessageComponent from "@/ui/MessageComponent";

export default function PageCategory() {
  const [categoriesProducts, setCategoriesProducts] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;

      try {
        const response = await fetch(`${apiUrl}/api/dashboard/categories`, {
          cache: "no-store",
        });
        if (!response.ok)
          throw new Error("Error al cargar las categorías de productos");

        const data = await response.json();
        setCategoriesProducts(data);
      } catch (error) {
        console.error("Error al cargar las categorías de productos:", error);
        setError(true);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div className="container flex flex-col justify-center text-center">
      {error ? (
        <MessageComponent
          message="Error al cargar las categorías. Intenta recargar la página."
          type="error"
        />
      ) : categoriesProducts ? (
        <CategoryLoader data={categoriesProducts} />
      ) : null}
    </div>
  );
}
