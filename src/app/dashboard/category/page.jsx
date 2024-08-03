import { getAllDocsColection } from "@/utils/firebase/fetchFirebase";
import CategoryLoader from "./CategoryLoader";

async function PageCategory() {
  //categoriesProducts es un array con las categorías de Productos
  //cada elemento del array es un objeto
  const categoriesProducts = await getAllDocsColection("productos");

  return (
    <div className="container flex flex-col justify-center text-center">
      <CategoryLoader data={categoriesProducts} />
    </div>
  );
}
export default PageCategory;
