import WhatsappAction from "./WhatsappAction";
import Image from "next/image";

export default function CardTeam({ imageSRC, name, text, description }) {
  
  let phoneNumber

phoneNumber = name === "Marcelo" 
  ? process.env.NEXT_PUBLIC_PHONE_MARCELO 
  : process.env.NEXT_PUBLIC_PHONE_NICO;
    

  return (
    <div className="w-[250px] bg-slate-100 mx-10 p-8 flex flex-col items-center hover:bg-slate-200 rounded-lg transition-colors duration-500">
      <div className="mb-4 relative">
        {imageSRC && (
          <Image
            className="object-center object-cover rounded-full h-36 w-36"
            src={imageSRC}
            alt="photo"
            width={144}
            height={144}
          />
        )}
        <div className="absolute bottom-0 right-0 ">
          <WhatsappAction nameTeamMember={name} phoneNumber={phoneNumber } />
        </div>
      </div>
      <div className="text-center">
        <p className="text-xl text-gray-700 font-bold mb-2">{name}</p>
        <p className="text-base text-gray-400 font-normal">{text}</p>
        <p className="text-base text-gray-400 font-normal italic text-sm">
          {description}
        </p>
      </div>
    </div>
  );
}
