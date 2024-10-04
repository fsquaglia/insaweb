import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";
// import CategoryLoader from "./CategoryLoader";
import CategorySelect from "./CategorySelect";
// import { useRouter } from "next/router";

async function PageProducts() {
  // const router = useRouter();

  try {
    // Obtener categorías de productos
    const categoriesProducts = await getAllDocsColection("productos");

    return (
      <div className="container flex flex-col justify-center text-center">
        <CategorySelect data={categoriesProducts} />
      </div>
    );
  } catch (error) {
    console.error("Error al cargar las categorías de productos:", error);
    return (
      <div className="flex mx-auto my-4">
        Error al cargar las categorías. Por favor, recarga la página.
      </div>
    );
  }
}

export default PageProducts;
