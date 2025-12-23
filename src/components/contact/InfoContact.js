import { FaPhoneAlt } from "react-icons/fa";

function InfoContact({
  direccion,
  localidad,
  provincia,
  whatsappLink1,
  whatsappLink2,
}) {
  const phoneNico = process.env.NEXT_PUBLIC_PHONE_NICO || "No disponible";
  const phoneMarcelo = process.env.NEXT_PUBLIC_PHONE_MARCELO || "No disponible";

  return (
    <div className="grid grid-cols sm:h-full">
      <div className="bg-blue-900 py-2 sm:py-10 px-2 col-span-2 text-center sm:text-left rounded-2xl sm:rounded-none m-2 sm:m-0">
        <h2 className="mb-2 font-bold text-xl 2xl:text-2xl text-blue-100 before:block before:absolute before:bg-sky-300 before:content[''] relative before:w-0 2xl:before:w-40 before:h-1 before:-skew-y-3 before:-bottom-4">
          Info Contacto
        </h2>
        <p className="font-bold text-blue-100 py-2 sm:py-8 border-b border-blue-700">
          Visitanos
          <span className="font-normal text-xs text-blue-300 block ml-2">
            {`${direccion}, ${localidad} (${provincia})`}
          </span>
        </p>
        <div className="text-blue-100 py-2 sm:py-8 flex flex-col gap-2 text-sm">
          <span className="font-bold">Comunicate</span>
          <div className="flex flex-row flex-wrap sm:flex-col gap-2 justify-center">
            <CardContact nameTeam="Nicolás" phoneNumber={phoneNico} />
            <CardContact nameTeam="Marcelo" phoneNumber={phoneMarcelo} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoContact;

function CardContact({ nameTeam, phoneNumber }) {
  return (
    <div className="flex flex-col items-center p-2 sm:items-start hover:bg-blue-800 cursor-pointer">
      <span className="">{nameTeam}</span>
      <span className="flex flex-row items-center gap-2">
        <FaPhoneAlt className="w-4 h-4 my-4" />
        {phoneNumber}
      </span>
    </div>
  );
}
