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
  className="min-h-[700px] lg:h-screen flex items-center bg-cover bg-no-repeat bg-hero-mobile lg:bg-hero-desktop bg-zinc-800 relative"
  style={imagen && { backgroundImage: `url(${imagen})` }}
>
         {/* Pseudo-elemento para la opacidad solo del fondo */}
  <div className="absolute inset-0 bg-black opacity-50 sm:hidden"></div>
      
      {/* Textos y botón */ }
  <div className="ml-4 sm:ml-10 xl:ml-40 2xl:ml-60 flex flex-col relative z-10">
        <p className="text-xl sm:text-4xl xl:text-6xl font-bold text-gray-100 my-2">
          {texto1}
        </p>
        <p className="text-xl sm:text-4xl xl:text-6xl font-bold text-gray-100">
          {texto2}
        </p>
        <p className="sm:text-xl text-gray-100 my-2">{texto3}</p>
        <div className="w-3/5 columns-2 my-20 sm:my-6">
            <Link href={"/categories"}>
              <ButtonGeneric textButton={"Accede"} fill={true} />
            </Link>
        </div>
      </div>
    </div>
  );
}
