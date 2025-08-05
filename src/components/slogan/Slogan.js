import { greatVibes } from "../../ui/fonts";

export default function Slogan({ slogan }) {
  const imagen = slogan?.imagen || "";
  const titulo = slogan?.titulo || "Vive la vida...";

  return (
    <div className="w-full flex items-center justify-center">
      <div
        className={`container max-w-5xl shadow-2xl shadow-black text-lg lg:text-[50px] h-[400px] sm:h-[600px] my-20 mx-2 sm:mx-20 ps-2 md:ps-8 flex items-end bg-gray-100 bg-contain ${greatVibes.className}`}
        style={{
          ...(imagen
            ? {
                backgroundImage: `url(${imagen})`,
                // backgroundSize: "auto 90%",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }
            : {
                backgroundColor: "#e1e0e0ff", // Color de fondo por defecto
              }),
        }}
      >
        <p className="m-8 text-slate-500">{titulo}</p>
      </div>
    </div>
  );
}
