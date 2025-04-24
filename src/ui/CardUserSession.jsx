import { HiUser } from "react-icons/hi2";
import Image from "next/image";
import MessageComponent from "./MessageComponent";

function CardUserSession({ name, email, image, role }) {
  if (role === "user") {
    //renderizo USER
    return (
      <div id="profile" className="space-y-3">
        {image ? (
          <Image
            src={image || ""}
            alt={`Avatar ${name || "user"}`}
            className="w-10 h-10 md:w-16 md:h-16 rounded-full mx-auto"
            width={40}
            height={40}
          />
        ) : (
          <div className="w-10 h-10 md:w-16 md:h-16 rounded-full mx-auto bg-gray-100 flex items-center justify-center">
            <HiUser className="text-gray-500 text-3xl mx-auto" />
          </div>
        )}
        <div>
          <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
            {name || "Nombre y apellido"}
          </h2>
          <p className="text-xs text-gray-500 text-center">
            {email || "email"}
          </p>
        </div>
      </div>
    );
  } else if (role === "admin") {
    //renderizo ADMIN
    return (
      <div className="flex items-center ">
        <div className="mr-5">
          {/*imagen */}
          <div className="inline-block relative shrink-0 rounded-[.95rem]">
            {image ? (
              <Image
                className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem]"
                src={image}
                alt={`Avatar ${name || "user"}`}
                width={40}
                height={40}
              />
            ) : (
              <HiUser className="w-[40px] h-[40px] shrink-0 inline-block rounded-[.95rem] text-gray-500" />
            )}
          </div>
        </div>
        <div className="mr-2 ">
          {/*Nombre y Apellido */}
          <div className="font-medium text-neutral-200">
            {name || "Nombre y Apellido"}
          </div>
          {/*email */}
          <span className="font-medium block text-xs text-neutral-300">
            {email || "alguien@sevidor.com"}
          </span>
        </div>
      </div>
    );
  } else {
    //no llega el role, renderizo SIN USUARIO
    return (
      <div className="w-[40px] h-[40px] bg-gray-200 text-gray-800">
        <MessageComponent
          message={"Sin información de usuario"}
          type={"info"}
        />
      </div>
    );
  }
}

export default CardUserSession;
