import { greatVibes } from "../../ui/fonts";

export default function Slogan({ slogan }) {
  return (
    <div
      className={`shadow-2xl shadow-black text-[48px] lg:text-[60px] w-11/12 md:w-3/4 xl:w-1/2 h-[600px] my-20 ps-2 md:ps-8 flex items-center ${greatVibes.className}`}
      style={{
        backgroundImage: `url(${slogan.imagen})`,
        backgroundSize: "auto 100%", // Ajusta el tamaño de la imagen al contenedor
        backgroundPosition: "right center", // Centra la imagen
        backgroundRepeat: "no-repeat", // Evita la repetición de la imagen
      }}
    >
      <p className="text-pink-500">{slogan ? slogan.texto : "Vive!"}</p>
    </div>
  );
}
