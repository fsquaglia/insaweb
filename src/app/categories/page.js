import MessageComponent from "@/ui/MessageComponent";
import Image from "next/image";
import FirstPicture from "@/components/categories/FirstPicture";
import SecondPicture from "@/components/categories/SecondPicture";
import Link from "next/link";

export default async function PageCategories() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const urlFragment = `${apiUrl}/product-category/`;

  let dataCategories = [];
  try {
    const response = await fetch(`${apiUrl}/api/categories/categories`);
    dataCategories = await response.json();
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    return (
      <div className="flex justify-center items-center">
        <MessageComponent
          message={"Aún no tenemos las categorías"}
          type={"error"}
        />
      </div>
    );
  }

  return (
    <div
      className="bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/images%2FbgGrayAbstractCategories.jpg?alt=media&token=b8283055-84a5-4555-bf06-4a072b3c3cb5')`,
      }}
    >
      <div className="xl:container py-8 antialiased">
        {/*contenedor de la grilla */}
        <div className="max-w-3xl flex flex-col justify-center mx-auto lg:max-w-full  lg:grid grid-rows-6 grid-cols-2 gap-16">
          {/*Primer categoría */}
          {dataCategories.length > 0 && (
            <div className="col-start-1 row-span-2 drop-shadow-lg relative flex bg-white p-6">
              <div className="absolute left-0 top-60 h-40 w-full bg-green-600 bg-opacity-50 z-10">
                <p className="absolute right-10 bottom-10 text-5xl text-slate-100">
                  {dataCategories[0].docData.id || ""}
                </p>
              </div>
              {/*div de las subcategorías*/}
              <div className="absolute bottom-8 left-0 h-fit w-full z-40 flex gap-4 items-center justify-center">
                {dataCategories[0].docData.subcategorias?.length > 0 &&
                  dataCategories[0].docData.subcategorias.map(
                    (subcategoria) => (
                      <Link
                        key={subcategoria}
                        href={`/product-category/${dataCategories[0].docID}/${subcategoria}`}
                      >
                        <p className="text-sm font-sans text-slate-600 font-bold text-green-300 cursor-pointer hover:underline">
                          {subcategoria}
                        </p>
                      </Link>
                    )
                  )}
              </div>
              {dataCategories[0].docData.imagen && (
                <Image
                  src={dataCategories[0].docData.imagen}
                  alt={`Imagen de la categoría ${dataCategories[0].docData.id}`}
                  width={420}
                  height={420}
                  className="h-[420px] object-scale-down object-left grayscale brightness-150"
                />
              )}
              <div className="flex flex-col items-end">
                <p className="text-6xl font-sans text-slate-100 font-bold my-4">
                  FASHION
                </p>
                <p className="font-sans text-slate-700 mx-4">
                  {dataCategories[0].docData.textoSeccionWeb || ""}
                </p>
              </div>
            </div>
          )}

          <div className="col-start-2 row-start-2 row-span-2 drop-shadow-lg">
            <FirstPicture />
          </div>

          {/*Segunda categoría */}
          {dataCategories.length > 1 && (
            <div className="col-start-1 row-start-3 row-span-2 drop-shadow-lg relative flex flex-row-reverse bg-white p-6">
              <div className="absolute left-10 top-0 h-full w-48 bg-amber-500 bg-opacity-50 z-20">
                <p className="absolute left-10 bottom-10 text-6xl text-slate-200">
                  {dataCategories[1].docData.id || ""}
                </p>
              </div>
              <div className="bg-neutral-500 absolute left-10 top-20 h-60 w-80 z-10"></div>
              <p className="absolute z-30 left-16 top-24 font-sans text-slate-100 w-60">
                {dataCategories[1].docData.textoSeccionWeb || ""}
              </p>
              {/*div de las subcategorías*/}
              <div className="absolute top-0 right-4 h-full w-fit z-40 flex flex-col gap-4 items-end justify-center">
                {dataCategories[1].docData.subcategorias?.length > 0 &&
                  dataCategories[1].docData.subcategorias.map(
                    (subcategoria) => (
                      <Link
                        key={subcategoria}
                        href={`/product-category/${dataCategories[1].docID}/${subcategoria}`}
                      >
                        <p className="text-sm font-sans text-amber-300 font-bold text-amber-300 cursor-pointer hover:underline">
                          {subcategoria}
                        </p>
                      </Link>
                    )
                  )}
              </div>
              {dataCategories[1].docData.imagen && (
                <Image
                  src={dataCategories[1].docData.imagen}
                  alt={`Imagen de la categoría ${dataCategories[1].docData.id}`}
                  width={420}
                  height={420}
                  className="h-[420px] object-scale-down object-right grayscale brightness-150"
                />
              )}
            </div>
          )}

          <div className="col-start-2 row-start-4 row-span-2 drop-shadow-lg">
            <SecondPicture />
          </div>

          {/*Tercera categoría */}
          {dataCategories.length > 2 && (
            <div className="col-start-1 row-start-5 row-span-2 drop-shadow-lg relative flex justify-center items-center bg-white">
              <div className="absolute right-10 top-0 h-full w-48 bg-violet-500 bg-opacity-50 z-20"></div>
              <p className="absolute left-10 bottom-10 text-6xl text-slate-400 z-10">
                {dataCategories[2].docData.id || ""}
              </p>
              <p className="absolute z-30 right-16 bottom-10 font-sans text-slate-100 w-72 text-right">
                {dataCategories[2].docData.textoSeccionWeb || ""}
              </p>
              <p className="absolute left-10 top-10 text-6xl font-sans text-slate-100 font-bold z-20">
                STYLE
              </p>
              {/*div de las subcategorías*/}
              <div className="absolute left-10 top-0 h-full w-fit z-40 flex flex-col justify-center gap-4">
                {dataCategories[2].docData.subcategorias?.length > 0 &&
                  dataCategories[2].docData.subcategorias.map(
                    (subcategoria) => (
                      <p
                        key={subcategoria}
                        className="text-sm font-sans text-slate-600 font-bold text-violet-300 cursor-pointer hover:underline"
                      >
                        {subcategoria}
                      </p>
                    )
                  )}
              </div>
              {dataCategories[2].docData.imagen && (
                <Image
                  src={dataCategories[2].docData.imagen}
                  alt={`Imagen de la categoría ${dataCategories[2].docData.id}`}
                  width={420}
                  height={420}
                  className="h-[420px] object-scale-down object-center grayscale"
                />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
