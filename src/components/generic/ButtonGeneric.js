"use client";

export default function ButtonGeneric({
  textButton,
  fill = true,
  onClick = null,
}) {
  return (
    <div>
      <button
        type="button"
        className={`w-[150px] justify-center rounded-md border text-base font-medium shadow-sm px-4 py-2 ${
          fill
            ? "border-transparent bg-blue-500 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            : "border-gray-300 text-gray-300 hover:bg-gray-50 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
        }`}
        onClick={onClick}
      >
        {textButton}
      </button>
    </div>
  );
}
