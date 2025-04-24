"use client";
import { useState } from "react";

function SwitchText({
  text1 = "Borrador",
  text2 = "Publicado",
  onClick,
  activeTextInitial = "Borrador",
}) {
  const [active, setActive] = useState(activeTextInitial);

  const handleClick = (text) => {
    setActive(text);
    onClick();
  };

  return (
    <div className="flex flex-row flex-wrap w-full">
      <button
        onClick={() => (active === text1 ? null : handleClick(text1))}
        className={`rounded  w-1/2 border p-2 text-center ${
          active === text1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {text1}
      </button>
      <button
        onClick={() => (active === text2 ? null : handleClick(text2))}
        className={`rounded  w-1/2 border p-2 text-center ${
          active === text2 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {text2}
      </button>
    </div>
  );
}

export default SwitchText;
