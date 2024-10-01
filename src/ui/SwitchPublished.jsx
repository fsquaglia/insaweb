"use client";
import { useState, useEffect } from "react";

function SwitchPublished({ published = false, onClick }) {
  // Determina el estado inicial basado en la prop 'published'
  const [isPublished, setIsPublished] = useState(published);

  const handleClick = (value) => {
    if (value !== isPublished) {
      setIsPublished(value);
      // Llama a la función onClick del componente padre pasando true o false
      onClick(value);
    }
  };

  // Sincroniza el estado si la prop 'published' cambia
  useEffect(() => {
    setIsPublished(published);
  }, [published]);

  return (
    <div className="flex">
      <button
        onClick={() => handleClick(false)}
        className={`rounded flex-grow border p-2 text-center ${
          !isPublished ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
        disabled={!isPublished} // Deshabilita el botón si ya está seleccionado
      >
        Borrador
      </button>
      <button
        onClick={() => handleClick(true)}
        className={`rounded flex-grow border p-2 text-center ${
          isPublished ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
        disabled={isPublished} // Deshabilita el botón si ya está seleccionado
      >
        Publicado
      </button>
    </div>
  );
}

export default SwitchPublished;
