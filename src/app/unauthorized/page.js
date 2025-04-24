import Link from "next/link";
import { ExclamationTriangleIcon } from "@heroicons/react/24/solid"; // O usa cualquier otro ícono de advertencia

export default function Unauthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="text-center p-6 bg-white rounded-lg shadow-lg">
        <ExclamationTriangleIcon className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
        <h1 className="text-3xl font-bold mb-2">Acceso no autorizado</h1>
        <p className="mb-4 text-gray-600">
          No tienes permiso para acceder a esta página.
        </p>
        <Link href="/" passHref>
          <p className="bg-blue-500 text-white px-6 py-3 rounded-md hover:bg-blue-600 transition duration-300">
            Volver al inicio
          </p>
        </Link>
      </div>
    </div>
  );
}
