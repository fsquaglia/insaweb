import Link from "next/link";
import Image from "next/image";

function SecondCategory({ category, urlFragment }) {
  const sortedSubcategories = category.docData.subcategorias
    ? category.docData.subcategorias
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 5)
    : [];
  return (
    <div className="col-start-1 row-start-3 row-span-2 drop-shadow-lg relative flex flex-row-reverse bg-white p-6">
      <div className="absolute left-0 sm:left-10 top-0 h-full w-48 bg-amber-500 bg-opacity-50 z-20">
        <p className="absolute left-0 sm:left-10 bottom-10 text-6xl text-slate-200">
          {category.docData.id || ""}
        </p>
      </div>
      <div className="bg-neutral-500 bg-opacity-80 absolute left-10 top-20 h-60 w-80 z-10"></div>
      <p className="absolute z-30 left-16 top-24 font-sans text-slate-100 w-32 md:w-60 text-xs lg:text-base">
        {category.docData.textoSeccionWeb || ""}
      </p>
      {/*div de las subcategorías*/}
      <div className="absolute top-0 right-4 h-full w-fit z-40 flex flex-col gap-4 items-end justify-center">
        {sortedSubcategories.length > 0 &&
          sortedSubcategories.map((subcategoria) => (
            <Link
              key={subcategoria}
              href={`${urlFragment}/${category.docID}/${subcategoria}`}
            >
              <p className="text-sm font-sans text-amber-300 font-bold text-amber-300 cursor-pointer hover:underline">
                {subcategoria}
              </p>
            </Link>
          ))}
      </div>
      {category.docData.imagen && (
        <Image
          src={category.docData.imagen}
          alt={`Imagen de la categoría ${category.docData.id}`}
          width={420}
          height={420}
          className="h-[420px] object-scale-down object-right grayscale brightness-150"
        />
      )}
    </div>
  );
}

export default SecondCategory;
