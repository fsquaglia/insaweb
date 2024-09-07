import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";
// import CategoryLoader from "./CategoryLoader";
import CategorySelect from "./CategorySelect";

async function PageProducts() {
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
