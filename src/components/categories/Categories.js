import CardCategory from "./CardCategory";

export default async function Categories({ dataCategories }) {
  return (
    <div>
      <div className="h-24"></div>
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 place-items-center">
        {dataCategories && dataCategories.length > 0 ? (
          dataCategories.map((cat) => (
            <CardCategory
              key={cat.docID}
              id={cat.docID}
              title={cat.docData.tituloCard}
              text={cat.docData.descripcion}
              imageSrc={cat.docData.imagen}
              bgColorTailwind={colorCard("Plantas")}
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

const colorCard = (data) => {
  switch (data) {
    case "Repuestos":
      return "bg-pink-900";
    case "Equipos":
      return "bg-sky-900";
    case "Plantas":
      return "bg-amber-900";
    default:
      return "";
  }
};
