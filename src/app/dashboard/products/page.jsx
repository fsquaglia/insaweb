"use client";
import { useState, useEffect } from "react";
import CategorySelect from "./CategorySelect";
import MessageComponent from "@/ui/MessageComponent";
import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";
import LoadingDiv from "@/ui/LoadingDiv";

function PageProducts() {
  const [categoriesProducts, setCategoriesProducts] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllDocsColection("productos");
        setCategoriesProducts(data);
      } catch (error) {
        console.error("Error al cargar las categorías de productos:", error);
        setError("Error al cargar las categorías. Intenta recargar la página.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return <LoadingDiv />;
  }

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
