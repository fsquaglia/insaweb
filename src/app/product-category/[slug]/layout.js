import React from "react";
import NavbarCategories from "./NavbarCategories";
import { FaSearch } from "react-icons/fa";
import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";

export default async function layout({ children }) {
  let categories = [];
  try {
    categories = await getAllDocsColection("productos");
  } catch (error) {
    console.error("Error al obtener las categorías de la BDD: ", error);
    categories = [];
  }

  return (
    <div>
      <NavbarCategories categories={categories} />
      {/* <NavbarCategories categories={categories} /> */}
      <div>{children}</div>
    </div>
  );
}
