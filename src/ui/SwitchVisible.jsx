"use client";
import React, { useState, useEffect } from "react";

function SwitchVisible({ name, switchLabel, initialValue = false, onToggle }) {
  const [isOn, setIsOn] = useState(initialValue || false);

  useEffect(() => {
    setIsOn(initialValue); // Actualiza el estado cuando el initialValue cambie
  }, [initialValue]);

  const handleToggle = () => {
    setIsOn(!isOn);
    onToggle && onToggle(!isOn, name); // Notificar al componente padre
  };

  return (
    <div className="flex items-center gap-1">
      <span className="text-xs text-left ml-2 mb-1 text-gray-600 min-w-20">
        {switchLabel || "Visible en Home: "}
      </span>
      <label className="relative inline-flex cursor-pointer items-center">
        <input
          id={name || "switch-2"}
          name={name || "switch-2"}
          type="checkbox"
          className="peer sr-only"
          checked={isOn}
          onChange={handleToggle}
        />
        <div className="peer h-4 w-11 rounded-full border bg-slate-200 after:absolute after:-top-1 after:left-0 after:h-6 after:w-6 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-green-300 peer-checked:after:translate-x-full peer-focus:ring-green-300"></div>
      </label>
    </div>
  );
}

export default SwitchVisible;
