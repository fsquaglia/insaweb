import { MdDateRange } from "react-icons/md";

export default function CardTips({ title, detail, date, img }) {
  const currentDate = new Date();
  // Convertimos la fecha proporcionada o la actual en una instancia Date
  const dateObj = date ? new Date(date) : currentDate;
  // Opciones para el formato de la fecha
  const options = { day: "numeric", month: "long", year: "numeric" };
  // Formateamos la fecha
  const formattedDate = dateObj.toLocaleDateString("es-ES", options);

  // Helper para truncar texto
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };
  const truncatedDetail = truncateText(
    detail || "Este es el detalle del tips",
    130
  );

  return (
    <div>
      <div className="bg-white w-full h-[450px] rounded-lg shadow-md flex flex-col transition-all overflow-hidden hover:shadow-2xl">
        <div className="  p-6">
          <div className="pb-3 mb-4 border-b border-stone-200 text-xs font-medium flex justify-between text-blue-900">
            <span className="flex items-center gap-1">
              <MdDateRange className="text-lg" />
              {formattedDate}
            </span>
          </div>
          <h3 className="mb-4 font-semibold  text-xl">
            <a
              href=""
              className="transition-all text-blue-900 hover:text-blue-600"
            >
              {title || "Título de Tips"}
            </a>
          </h3>
          <p className="text-sky-800 text-sm mb-0">{truncatedDetail}</p>
        </div>
        <div className="mt-auto">
          {img ? (
            <img src={img} alt="Tips " className="w-full h-48 object-cover" />
          ) : (
            <img
              src="https://picsum.photos/400/300"
              alt="Tips "
              className="w-full h-48 object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
}
