import { getCategoriesLandingFirestore } from "../../utils/firebase/fetchFirebase";
import CardCategory from "./CardCategory";

export default async function Categories() {
  const dataCategories = await getCategoriesLandingFirestore();

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
              key={cat.id}
              title={cat.tituloCard}
              text={cat.descripcion}
              imageSrc={cat.imagen}
              bgColorTailwind={colorCard(cat.id)}
            />
          ))
        ) : (
          <p className="text-gray-800 my-20">
            Pronto mostraremos las categorias...
          </p>
        )}
      </div>
    </div>
  );
}
