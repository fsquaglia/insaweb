import { FaWhatsapp } from "react-icons/fa";

function InfoContact({
  direccion,
  localidad,
  provincia,
  whatsappLink1,
  whatsappLink2,
}) {
  return (
    <div className="grid grid-cols sm:h-full">
      <div className="bg-blue-900 py-2 sm:py-10 px-2 col-span-2 text-center sm:text-left rounded-2xl sm:rounded-none m-2 sm:m-0">
        <h2 className="mb-10 font-bold text-xl 2xl:text-2xl text-blue-100 before:block before:absolute before:bg-sky-300 before:content[''] relative before:w-0 2xl:before:w-40 before:h-1 before:-skew-y-3 before:-bottom-4">
          Info Contacto
        </h2>
        <p className="font-bold text-blue-100 py-2 sm:py-8 border-b border-blue-700">
          Visitanos
          <span className="font-normal text-xs text-blue-300 block ml-2">
            {`${direccion}, ${localidad} (${provincia})`}
          </span>
        </p>
        <div className="font-bold text-blue-100 py-2 sm:py-8 flex flex-col">
          <span>Comunicate</span>
          <div className="flex flex-row flex-wrap sm:flex-col gap-4 sm:gap-10 justify-center">
            <div className="flex flex-row items-center gap-2">
              <span className="sm:w-24">Nicolás</span>
              <span className="cursor-pointer">
                <a
                  href={whatsappLink1}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-green-500 w-8 h-8 my-4 ml-2" />
                </a>
              </span>
            </div>
            <div className="flex flex-row items-center  gap-2">
              <span className="sm:w-24">Marcelo</span>
              <span>
                <a
                  href={whatsappLink2}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaWhatsapp className="text-green-500 w-8 h-8 my-4 ml-2" />
                </a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoContact;
