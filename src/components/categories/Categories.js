// import { getCategoriesLandingFirestore } from "../../utils/firebase/fetchFirebase";
import CardCategory from "./CardCategory";

export default async function Categories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  let dataCategories;
  try {
    const response = await fetch(`${apiUrl}/api/categories/categoriesLanding`);
    dataCategories = await response.json();
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    dataCategories = [];
  }

  const colorCard = (data) => {
    switch (data) {
      case "Damas":
        return "bg-pink-900";
      case "Caballeros":
        return "bg-sky-900";
      case "Accesorios":
        return "bg-amber-900";
      default:
        return "";
    }
  };

  return (
    <div>
      <div className="h-24"></div>
      <div className="w-full sm:container sm:mx-auto flex flex-wrap justify-center items-center">
        {dataCategories && dataCategories.length > 0 ? (
          dataCategories.map((cat) => (
            <CardCategory
              key={cat.docID}
              id={cat.docID}
              title={cat.docData.tituloCard}
              text={cat.docData.descripcion}
              imageSrc={cat.docData.imagen}
              bgColorTailwind={colorCard(cat.docID)}
              subcategories={cat.docData.subcategorias}
            />
          ))
        ) : (
          <p className="text-gray-800 my-20 text-center">
            Pronto mostraremos las categorias...
          </p>
        )}
      </div>
    </div>
  );
}
