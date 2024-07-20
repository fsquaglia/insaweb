export default async function About({ about }) {
  const descripcion = about?.descripcion || "En Ihara y London creemos que...";
  const imagen = about?.imagen || "";
  const titulo = about?.titulo || "Sobre nosotros...";

  return (
    <div className="w-full py-24 bg-zinc-200">
      <div className="container bg-white flex flex-col lg:flex-row lg:space-x-6 items-center">
        <div className="flex-1 flex items-center justify-center md:justify-start lg:text-left p-20">
          <div className="flex flex-col">
            <h2 className="text-2xl mx-auto my-10">{titulo}</h2>
            <p className="text-md">{descripcion}</p>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
          {imagen ? (
            <img
              src={imagen}
              alt="Sobre nosotros en Ihara & London"
              width={800}
              height={800}
              className="w-full h-auto filter brightness-105 saturate-125"
            />
          ) : (
            <div className="flex justify-center items-center w-full h-64 bg-gray-300 text-gray-600">
              <span className="text-center">Esperando imagen de About</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
