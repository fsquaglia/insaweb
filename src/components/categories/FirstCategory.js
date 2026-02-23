import Link from "next/link";
import Image from "next/image";

function FirstCategory({ category, urlFragment, word, color }) {
  const sortedSubcategories = category.docData.subcategorias
    ? category.docData.subcategorias
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 5)
    : [];
  return (
    <div
      className={`w-full drop-shadow-lg opacity-60 ${color} flex flex-row text-slate-100`}
    >
      {/* IMAGEN */}
      <div className="w-1/3">
        {category.docData.imagen && (
          <Image
            src={category.docData.imagen}
            alt={`Imagen de la categoría ${category.docData.id}`}
            width={420}
            height={420}
            className="object-scale-down object-left "
          />
        )}
      </div>

      {/* TEXTOS */}
      <div className="flex flex-col gap-2 mx-4 my-2 w-2/3">
        {/* Palabra como Potencia, Solidez, Eficiencia */}
        <p className="text-5xl font-sans font-bold text-right opacity-80 flex-none">
          {word || "Potencia"}
        </p>

        {/* Texto descriptivo*/}
        <p className="font-sans italic w-full text-justify text-sm lg:text-base flex-1">
          {category.docData.textoSeccionWeb || ""}
        </p>

        {/* Nombre de la Categoría */}
        <p className="text-4xl text-right flex-none">
          {category.docData.id || ""}
        </p>

        {/*Subcategorías*/}
        <div className="w-full flex gap-2 sm:gap-4 items-end justify-center flex-none">
          {sortedSubcategories.length > 0 &&
            sortedSubcategories.map((subcategoria) => (
              <Link
                key={subcategoria}
                href={`${urlFragment}/${category.docID}/${subcategoria}`}
              >
                <p className="text-center text-xs sm:text-sm font-sans font-bold text-black cursor-pointer hover:underline">
                  {subcategoria}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}

export default FirstCategory;
