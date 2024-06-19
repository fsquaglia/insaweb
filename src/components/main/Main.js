import ButtonGeneric from "../generic/ButtonGeneric";

export default function Main({ main }) {
  // Proveer un valor predeterminado para la imagen si no está definida
  const backgroundImageUrl = main?.imagen ?? "";

  return (
    <div
      className={`bg-gray-300 h-screen w-screen flex items-center bg-cover bg-fixed ${
        backgroundImageUrl ? "xl:bg-top bg-right" : "bg-gray-500"
      }`}
      style={
        backgroundImageUrl
          ? {
              backgroundImage: `url(${backgroundImageUrl})`,
            }
          : {}
      }
    >
      <div className="ml-10 md:ml-40 xl:ml-80 flex flex-col">
        <p className="text-4xl lg:text-6xl font-bold text-gray-100 my-2">
          {main?.texto1 ?? "Primera línea de texto"}
        </p>
        <p className="text-4xl lg:text-6xl font-bold text-gray-100">
          {main?.texto2 ?? "Segunda línea de texto"}
        </p>
        <p className="text-xl text-gray-100 my-2">
          {main?.texto3 ?? "Tercera línea de texto"}
        </p>
        <div className="w-3/5 columns-2 my-6">
          <div>
            <ButtonGeneric textButton={"botón"} fill={true} />
          </div>
          <div>
            <ButtonGeneric textButton={"botón"} fill={false} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Valores predeterminados para main, en caso de que no se pasen como props
Main.defaultProps = {
  main: {
    imagen: "", // No URL de imagen por defecto
    texto1: "Primera línea de texto",
    texto2: "Segunda línea de texto",
    texto3: "Tercera línea de texto",
  },
};
