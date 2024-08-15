"use client";
import { useState } from "react";

function SwitchText({ text1, text2, onClick }) {
  const [active, setActive] = useState(text1);

  const handleClick = (text) => {
    setActive(text);
    onClick();
  };

  return (
    <div className="flex">
      <button
        onClick={() => (active === text1 ? null : handleClick(text1))}
        className={`rounded flex-grow border p-2 text-center ${
          active === text1 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {text1}
      </button>
      <button
        onClick={() => (active === text2 ? null : handleClick(text2))}
        className={`rounded flex-grow border p-2 text-center ${
          active === text2 ? "bg-blue-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        {text2}
      </button>
    </div>
  );
}

export default SwitchText;
