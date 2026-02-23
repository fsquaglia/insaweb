import Link from "next/link";
import Image from "next/image";

export default function CardCategoryPortrait({
  category,
  urlFragment,
  word,
  color,
}) {
  const sortedSubcategories = category.docData.subcategorias
    ? category.docData.subcategorias
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 5)
    : [];

  return (
    <div
      className={`relative w-full drop-shadow-lg overflow-hidden ${color} rounded-xl`}
    >
      {/* IMAGEN de fondo */}
      {category?.docData?.imagen && (
        <Image
          src={category.docData.imagen}
          alt={`Imagen de la categoría ${category.docData.id}`}
          width={420}
          height={420}
          className="w-full object-cover grayscale rounded-xl"
        />
      )}
      {/* COLOR SUPERPUESTO */}
      <div className={`absolute inset-0 z-10 ${color} opacity-30`} />

      {/* GRADIENTE + TEXTO — cubre la mitad inferior */}
      <div
        className="absolute inset-x-0 bottom-0 h-1/2 flex flex-col justify-end gap-2 px-4 py-3
                      bg-gradient-to-t from-black/100 via-black/70 to-transparent text-slate-100 z-30"
      >
        {/* Palabra como Potencia, Solidez, Eficiencia */}
        <p className="text-3xl font-sans font-bold text-right opacity-80">
          {word || "Potencia"}
        </p>

        {/* Nombre de la Categoría */}
        <p className="text-2xl text-right">{category?.docData?.id || ""}</p>

        {/* Texto descriptivo */}
        <p className="font-sans italic w-full text-justify text-sm">
          {category?.docData?.textoSeccionWeb || ""}
        </p>

        {/* Subcategorías */}
        <div className="w-full flex gap-2 items-end justify-center">
          {sortedSubcategories?.length > 0 &&
            sortedSubcategories.map((subcategoria) => (
              <Link
                key={subcategoria}
                href={`${urlFragment}/${category.docID}/${subcategoria}`}
              >
                <p className="text-center text-xs font-sans font-bold text-white cursor-pointer hover:underline">
                  {subcategoria}
                </p>
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
