"use client";
import { useEffect, useState } from "react";
import CategoryLoader from "./CategoryLoader";
import MessageComponent from "@/ui/MessageComponent";
import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";
import LoadingDiv from "@/ui/LoadingDiv";

export default function PageCategory() {
  const [categoriesProducts, setCategoriesProducts] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getAllDocsColection("productos");
        console.log("data", data);

        data.sort((a, b) => a.docID.localeCompare(b.docID));

        setCategoriesProducts(data);
      } catch (error) {
        console.error("Error al cargar las categorías de productos:", error);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <LoadingDiv />;
  }

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
