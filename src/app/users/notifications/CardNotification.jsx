import { BsDot } from "react-icons/bs";

export default function CardNotification({ className, description, children }) {
  return (
    <div
      className={`w-full flex flex-col lg:flex-row gap-2 lg:gap-0 py-4 px-2 justify-center items-center font-light text-slate-800 hover:bg-slate-100 min-h-24 rounded-xl ${className} border sm:border-none my-2 sm:my-0`}
    >
      {/* Dot/punto rojo + texto descriptivo */}
      <div className="w-full lg:w-1/2:  flex flex-row justify-center sm:justify-start items-center rounded-lg">
        <BsDot className="size-8 text-red-500 flex-shrink-0 w-1/6" />

        <p className="text-xs sm:text-sm text-start w-5/6">{description}</p>
      </div>
      {/* Contenido insertado en el componente padre*/}
      <div className="sm:w-3/5 lg:w-1/2  flex flex-row items-center justify-center gap-2">
        {children}
      </div>
    </div>
  );
}
