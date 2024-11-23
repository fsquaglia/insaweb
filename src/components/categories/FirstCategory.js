import Link from "next/link";
import Image from "next/image";

function FirstCategory({ category, urlFragment }) {
  return (
    <div className="col-start-1 row-span-2 drop-shadow-lg relative flex bg-white p-6">
      <div className="absolute left-0 top-60 h-40 w-full bg-green-600 bg-opacity-50 z-10">
        <p className="absolute right-10 bottom-10 text-5xl text-slate-100">
          {category.docData.id || ""}
        </p>
      </div>
      {/*div de las subcategorías*/}
      <div className="absolute bottom-8 left-0 h-fit w-full z-40 flex gap-4 items-center justify-center">
        {category.docData.subcategorias?.length > 0 &&
          category.docData.subcategorias.map((subcategoria) => (
            <Link
              key={subcategoria}
              href={`${urlFragment}/${category.docID}/${subcategoria}`}
            >
              <p className="text-sm font-sans text-slate-600 font-bold text-green-300 cursor-pointer hover:underline">
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
          className="h-[420px] object-scale-down object-left grayscale brightness-150"
        />
      )}
      <div className="absolute top-10 right-4 flex flex-col items-end">
        <p className="text-6xl font-sans text-slate-100 font-bold my-4">
          FASHION
        </p>
        <p className="font-sans text-slate-700 w-60 text-right text-xs lg:text-base">
          {category.docData.textoSeccionWeb || ""}
        </p>
      </div>
    </div>
  );
}

export default FirstCategory;
