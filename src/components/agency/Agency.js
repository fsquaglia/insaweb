import { FaCamera } from "react-icons/fa";
export default function Agency() {
  return (
    <div className="py-2 mx-auto grid gap-2 grid-rows-2 bg-gray-100">
      {/*thanks */}
      <div className="container py-2 flex flex-row justify-center">
        <div className="flex m-2">
          <FaCamera className="text-2xl" /> <span> Diego Dadone</span>
        </div>
        <div className="m-2">Model agency: Belén</div>
      </div>
      {/*developer */}
      <div className="text-center">
        <p className="text-gray-600">Desarrollado por Fernando Squaglia</p>
      </div>
    </div>
  );
}
