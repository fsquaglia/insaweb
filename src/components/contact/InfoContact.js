import { FaWhatsapp } from "react-icons/fa";

function InfoContact({ direccion, localidad, provincia, whatsappLink }) {
  return (
    <div className="grid grid-cols h-full">
      <div className="bg-blue-900 py-10 px-2 col-span-2">
        <h2 className="mb-10 font-bold text-2xl text-blue-100 before:block before:absolute before:bg-sky-300 before:content[''] relative before:w-40 before:h-1 before:-skew-y-3 before:-bottom-4">
          Info Contacto
        </h2>
        <p className="font-bold text-blue-100 py-8 border-b border-blue-700">
          Visítanos
          <span className="font-normal text-xs text-blue-300 block ml-2">
            {`${direccion}, ${localidad} (${provincia})`}
          </span>
        </p>
        <div className="font-bold text-blue-100 py-8">
          <span>Comunícate</span>
          <span>
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
              <FaWhatsapp className="text-green-500 w-8 h-8 my-4 ml-2" />
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}

export default InfoContact;
