import ButtonGeneric from "../generic/ButtonGeneric";
import Link from "next/link";

export default function Main({ main }) {
  //valores por defecto si no se recibe main
  const imagen =
    main?.imagen ||
    "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/main%2Fmain01.jpg?alt=media&token=a56599f6-cf71-4329-9e13-6422c7a0f28c";
  const texto1 = main?.texto1 || "La mejor colección";
  const texto2 = main?.texto2 || "Invierno Hot";
  const texto3 = main?.texto3 || "Ofertas todas las semanas";

  return (
    <div
      className="min-h-[400px] lg:h-screen flex items-center bg-contain lg:bg-cover bg-no-repeat bg-right lg:bg-fixed lg:bg-top bg-zinc-800"
      style={imagen && { backgroundImage: `url(${imagen})` }}
    >
      <div className="ml-4 sm:ml-10 xl:ml-40 2xl:ml-60 flex flex-col">
        <p className="text-2xl sm:text-4xl xl:text-6xl font-bold text-gray-100 my-2">
          {texto1}
        </p>
        <p className="text-2xl sm:text-4xl xl:text-6xl font-bold text-gray-100">
          {texto2}
        </p>
        <p className="text-lg sm:text-xl text-gray-100 my-2">{texto3}</p>
        <div className="w-3/5 columns-2 my-6">
          <div>
            <Link href={"/categories"}>
              <ButtonGeneric textButton={"Accede"} fill={true} />
            </Link>
          </div>

          {/* <div>
            <ButtonGeneric textButton={"botón"} fill={false} />
          </div> */}
        </div>
      </div>
    </div>
  );
}
