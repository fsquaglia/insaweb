"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPaperPlane, FaTimes } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function BubbleWhatsApp({ phoneNumber = "", messageText = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState(messageText || "");
  const { data: session } = useSession();
  const nameUserLogued = session?.user?.name || "Usuario";
  const pathname = usePathname();

  //Verificar si el pathname corresponde al detalle de un producto para incluir el link del producto en el mensaje
  const isProductPage = pathname.includes("productDetail");

  // Usar telefonoFinal en lugar de mutar phoneNumber
  const phoneNumberFinal = "5493408674244";
  // const phoneNumberFinal =
  //   phoneNumber || process.env.NEXT_PUBLIC_PHONE_NICO || "5493408674244";

  // Validar formato del número de teléfono (debe incluir código de país)
  const isValidPhoneNumber = (phone) => {
    return /^\d{10,}$/.test(phone.replace(/[^\d]/g, ""));
  };

  const handleSend = () => {
    try {
      // Validar que el número de teléfono sea válido
      if (!isValidPhoneNumber(phoneNumberFinal)) {
        console.error("Número de teléfono inválido:", phoneNumberFinal);
        alert("Error: Número de teléfono inválido");
        return;
      }

      let newMessage = "";

      // Construir el mensaje base
      const baseMessage = session
        ? `Hola!, mi nombre es ${nameUserLogued}. Me gustaría saber más sobre sus servicios.`
        : `Hola! Me gustaría saber más sobre sus servicios.`;

      // Combinar usuario message + link de producto si aplica
      if (isProductPage) {
        if (typeof window !== "undefined") {
          // const productLink = window.location.href;
          const productLink =
            "https://www.insarafaela.com.ar/product-category/productDetail/Repuestos/Repuestos%20para%20Mezcladoras/yx43IlWqLadFHi3MoM7L";
          newMessage = `Hola, quisiera saber más sobre este producto: ${productLink}`;
        }
      } else {
        newMessage = message || baseMessage;
      }

      const fullMessage = encodeURIComponent(newMessage);
      const url = `https://wa.me/${phoneNumberFinal}?text=${fullMessage}`;

      if (typeof window !== "undefined") {
        window.open(url, "_blank");
      }

      setMessage("");
      setIsOpen(false);
    } catch (error) {
      console.error("Error al enviar mensaje de WhatsApp:", error);
      alert("Error al enviar el mensaje. Por favor, intenta nuevamente.");
    }
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && !isProductPage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white shadow-xl rounded-2xl p-4 w-72 mb-3 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-700 font-medium">Enviar mensaje</span>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Cerrar chat de WhatsApp"
                type="button"
              >
                <FaTimes size={16} />
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribí tu consulta..."
              rows={3}
              aria-label="Campo de mensaje para WhatsApp"
              className="w-full text-sm p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSend}
              className="mt-2 w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              type="button"
              aria-label="Enviar mensaje por WhatsApp"
            >
              <FaPaperPlane size={14} />
              Enviar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {isProductPage ? (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSend}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full shadow-lg flex items-center justify-center gap-2 transition-colors font-semibold text-sm"
          aria-label="Consultanos por WhatsApp sobre este producto"
          type="button"
        >
          <FaWhatsapp size={18} />
          Consultanos
        </motion.button>
      ) : (
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setIsOpen(!isOpen)}
          className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center transition-colors"
          aria-label={
            isOpen ? "Cerrar chat de WhatsApp" : "Abrir chat de WhatsApp"
          }
          aria-expanded={isOpen}
          aria-pressed={isOpen}
          type="button"
        >
          <FaWhatsapp size={24} />
        </motion.button>
      )}
    </div>
  );
}
