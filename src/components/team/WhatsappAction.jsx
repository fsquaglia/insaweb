"use client";
import { FaWhatsapp } from "react-icons/fa";
import { useSession } from "next-auth/react";

function WhatsappAction({
  nameTeamMember = "Sr./Sra.",
  phoneNumber = "573102001234",
}) {
  const { data: session } = useSession();
  const nameUserLogued = session?.user?.name || "Usuario";
  
  const handleWhatsAppClick = () => {
    const message = session
      ? `Hola ${nameTeamMember}, mi nombre es ${nameUserLogued}. Me gustaría saber más sobre sus servicios`
      : `Hola ${nameTeamMember}. Me gustaría saber más sobre sus servicios.`;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
  };

  return (
    <button
      onClick={handleWhatsAppClick}
      className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors size-10 flex items-center justify-center"
      aria-label={`Enviar WhatsApp a ${nameTeamMember}`}
    >
      <FaWhatsapp size={40} />
    </button>
  );
}

export default WhatsappAction;