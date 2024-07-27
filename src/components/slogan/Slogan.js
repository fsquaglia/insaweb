import { greatVibes } from "../../ui/fonts";

export default function Slogan({ slogan }) {
  const imagen = slogan?.imagen || "";
  const titulo = slogan?.titulo || "Vive la vida...";

  return (
    <div
      className={`shadow-2xl shadow-black text-[48px] lg:text-[60px] w-11/12 md:w-3/4 xl:w-1/2 h-[600px] my-20 ps-2 md:ps-8 flex items-center ${greatVibes.className}`}
      style={{
        ...(imagen
          ? {
              backgroundImage: `url(${imagen})`,
              backgroundSize: "auto 100%",
              backgroundPosition: "right center",
              backgroundRepeat: "no-repeat",
            }
          : {
              backgroundColor: "#f5f5f5", // Color de fondo por defecto
            }),
      }}
    >
      <p className="text-pink-500">{titulo}</p>
    </div>
  );
}
