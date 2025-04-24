"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { HiMenu, HiX } from "react-icons/hi"; // Para el menú tipo burger
import LoadingThree from "@/ui/LoadingThree";

function Lista({ categories }) {
  return (
    <ul className="flex sm:space-x-4 flex-col sm:flex-row sm:flex-wrap items-end mr-4 gap-2">
      {categories?.length > 0 &&
        categories.map((category) => (
          <Link
            key={category.docID}
            href={`/product-category/${category.docID}/${
              category.docData.subcategorias?.[0] || "NoData"
            }`}
          >
            <li className="cursor-pointer hover:underline">
              {category.docData.id}
            </li>
          </Link>
        ))}
    </ul>
  );
}

const NavbarCategories = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(`/api/categories/categories`, {
          next: {
            revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LARGE),
          },
        });

        if (!res.ok) {
          throw new Error("Error al obtener las categorías");
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error al obtener las categorías de la BDD: ", error);
        setError("Esperando las categorías...");
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  if (loading) {
    return (
      <div className="p-8">
        <LoadingThree />
      </div>
    );
  }
  if (error) {
    return <div className="p-8">{error}</div>;
  }

  return (
    <>
      <div className="sm:hidden flex justify-end">
        <HiMenu className="size-6" onClick={() => setIsOpen(!isOpen)} />
      </div>

      <nav className="text-xs lg:text-base p-2 md:p-8 hidden sm:block">
        <Lista categories={categories} />
      </nav>
      {isOpen && (
        <div className="absolute top-24 right-10 w-60 h-fit py-4 bg-slate-800 bg-opacity-90 z-50 rounded shadow block sm:hidden">
          <div className="flex justify-end p-2">
            <HiX className="size-6" onClick={() => setIsOpen(!isOpen)} />
          </div>
          <div onClick={() => setIsOpen(!isOpen)}>
            <Lista categories={categories} />
          </div>
        </div>
      )}
    </>
  );
};

export default NavbarCategories;
