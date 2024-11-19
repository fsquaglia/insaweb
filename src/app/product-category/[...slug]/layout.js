import React from "react";
import NavbarCategories from "./NavbarCategories";

export default async function layout({ children }) {
  let categories = [];
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/categories/categories`
    );

    if (!res.ok) {
      throw new Error("Error al obtener las categorías");
    }
    categories = await res.json();
  } catch (error) {
    console.error("Error al obtener las categorías de la BDD: ", error);
    categories = [];
  }
  console.log(categories);

  return (
    <div>
      <NavbarCategories categories={categories} />
      <div>{children}</div>
    </div>
  );
}
