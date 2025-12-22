"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaPaperPlane, FaTimes } from "react-icons/fa";
import { usePathname } from "next/navigation";

export default function BubbleWhatsApp({phoneNumber = "5491122334455", messageText = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const pathname = usePathname();
  // const phoneNumber =
  //   process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491122334455";

  const [productLink, setProductLink] = useState("");

  useEffect(() => {
    if (pathname.startsWith("/producto/")) {
      setProductLink(window.location.href);
    } else {
      setProductLink("");
    }
  }, [pathname]);

  const handleSend = () => {
    const base = `Hola! `;
    const productText = productLink
      ? `Quisiera consultar sobre este producto: ${productLink}`
      : "";
    const fullMessage = encodeURIComponent(`${base}${message} ${productText}`);
    const url = `https://wa.me/${phoneNumber}?text=${fullMessage}`;
    window.open(url, "_blank");
    setMessage("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-20 right-5 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
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
                className="text-gray-400 hover:text-gray-600"
              >
                <FaTimes size={16} />
              </button>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Escribí tu consulta..."
              rows={3}
              className="w-full text-sm p-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleSend}
              className="mt-2 w-full flex justify-center items-center gap-2 bg-green-500 hover:bg-green-600 text-white py-2 rounded-xl transition-colors"
            >
              <FaPaperPlane size={14} />
              Enviar
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg flex items-center justify-center"
      >
        <FaWhatsapp size={24} />
      </motion.button>
    </div>
  );
}
