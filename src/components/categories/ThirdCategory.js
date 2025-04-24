import Link from "next/link";
import Image from "next/image";

function ThirdCategory({ category, urlFragment }) {
  const sortedSubcategories = category.docData.subcategorias
    ? category.docData.subcategorias
        .slice()
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 5)
    : [];

  return (
    <div className="col-start-1 row-start-5 row-span-2 drop-shadow-lg relative flex justify-center items-center bg-white">
      <div className="hidden sm:block absolute right-10 top-0 h-full w-48 bg-violet-500 bg-opacity-50 z-20"></div>
      <div className="absolute top-0 left-0 right-0 bottom-0 sm:hidden bg-violet-300 bg-opacity-50 z-20"></div>
      <p className="absolute left-10 bottom-10 text-6xl text-slate-400 z-10">
        {category.docData.id || ""}
      </p>
      <p className="absolute z-30 right-16 bottom-20 md:bottom-10 font-sans text-slate-100 w-32 md:w-72 text-right text-xs lg:text-base">
        {category.docData.textoSeccionWeb || ""}
      </p>
      <p className="absolute left-10 top-10 text-6xl font-sans text-slate-100 font-bold z-20">
        STYLE
      </p>
      {/*div de las subcategorías*/}
      <div className="absolute left-10 top-0 h-full w-fit z-40 flex flex-col justify-center gap-4">
        {sortedSubcategories.length > 0 &&
          sortedSubcategories.map((subcategoria) => (
            <Link
              key={subcategoria}
              href={`${urlFragment}/${category.docID}/${subcategoria}`}
            >
              <p className="text-sm font-sans font-bold text-slate-500 sm:text-violet-300 cursor-pointer hover:underline">
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
          className="h-[420px] object-scale-down object-center grayscale"
        />
      )}
    </div>
  );
}

export default ThirdCategory;
