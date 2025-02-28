import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";
import { useState } from "react";

export default function InputSection({
  label,
  name,
  value,
  showEye = false,
  placeholder,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-2">
      <label
        htmlFor={name}
        className="ms-2 text-xs sm:text-sm text-start text-gray-600"
      >
        {label} *
      </label>
      <input
        id={name}
        name={name}
        type={showEye && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="flex items-center w-full px-2 py-2 mr-2 text-xs sm:text-sm font-medium outline-none focus:bg-gray-200 mb-4 sm:mb-7 placeholder:text-gray-400 text-dark-gray-900 rounded-xl border hover:bg-gray-100"
      />
      {/* Botón para mostrar/ocultar contraseña */}
      {showEye && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-700"
        >
          {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
        </button>
      )}
    </div>
  );
}
