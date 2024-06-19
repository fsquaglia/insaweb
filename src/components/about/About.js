import Header from "../../ui/HeaderTitle";

export default async function About({ about }) {
  return (
    <div className="w-full py-40 bg-zinc-200">
      <div className="container bg-white flex flex-col lg:flex-row lg:space-x-6 items-center">
        <div className="flex-1 flex items-center justify-center md:justify-start lg:text-left p-20">
          <div className="flex flex-col">
            <h2 className="text-2xl mx-auto my-10">{about?.titulo ?? ""}</h2>
            <p className="text-md">
              {about ? about.descripcion : "Buscando el About..."}
            </p>
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center mt-6 md:mt-0">
          {about ? (
            <img
              src={about.imagen}
              alt="Sobre nosotros en Ihara & London"
              width={800}
              height={800}
              className="w-full h-auto filter brightness-105 saturate-125"
            />
          ) : (
            "Esperando imagen de About"
          )}
        </div>
      </div>
    </div>
  );
}
