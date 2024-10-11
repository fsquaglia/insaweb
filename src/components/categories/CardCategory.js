"use client";
import ButtonGeneric from "../generic/ButtonGeneric";
import { useRouter } from "next/navigation";

export default function CardCategory({
  id,
  imageSrc,
  title,
  text,
  buttonText,
  bgColorTailwind,
  subcategories,
}) {
  const router = useRouter();

  const subcategoriesArrayZero = subcategories[0] || "noSubcategoria";
  const handleClickButton = () => {
    router.push(`/product-category/${id}/${subcategoriesArrayZero}`);
  };

  return (
    <div
      className={`relative w-80 h-96 text-white overflow-hidden shadow-lg m-6 transition-transform transform hover:shadow-2xl hover:scale-105 ${
        bgColorTailwind || ""
      }`}
      style={{ height: "500px" }}
    >
      {imageSrc && (
        <img
          src={imageSrc}
          alt="Categoría Moda"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}
      <div
        className={`absolute inset-0 bg-opacity-20 mix-blend-multiply ${bgColorTailwind}`}
      ></div>
      <div className="absolute inset-0 opacity-30 bg-slate-800 mix-blend-multiply"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 flex flex-col items-center space-y-2">
        <h2 className="text-2xl font-bold">{title || "Titulo"}</h2>
        <p className="text-center">{text || "soy la descripcion"}</p>

        <ButtonGeneric
          textButton={buttonText || "Acceder"}
          fill={false}
          onClick={handleClickButton}
        />
      </div>
    </div>
  );
}
