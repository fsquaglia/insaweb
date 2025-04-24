// ícono de imagen del usuario
import Image from "next/image";
import { HiUser } from "react-icons/hi2";

export default function UserImage({ image, name }) {
  return image ? (
    <Image
      src={image}
      alt={`Avatar ${name || "usuario"}`}
      width={36}
      height={36}
      className="size-9 rounded-full"
      title={name || "Anónimo"}
    />
  ) : (
    <div className="bg-gray-100 flex items-center justify-center">
      <HiUser className="text-gray-500 text-3xl" title={name || "Anónimo"} />
    </div>
  );
}
