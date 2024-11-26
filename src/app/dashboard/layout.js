import Sidenav from "../../ui/sidenav";
import HeaderDashboard from "@/ui/HeaderDashboard";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col flex-grow md:flex-row min-h-screen">
      {/* Sidenav fijo a la izquierda */}
      <div className="md:flex-none flex flex-row items-center justify-center text-white w-full md:w-64 bg-blue-300 fixed top-24 md:bottom-0 md:left-0 z-20 md:py-2">
        <Sidenav />
      </div>

      {/* Contenido a la derecha del Sidenav */}
      <div className="md:ml-64 w-full relative flex flex-col flex-grow grow">
        <div className="h-24 flex flex-col justify-center items-center z-20 bg-blue-200 fixed top-32 md:top-24 left-0 md:left-64 right-0">
          <div className="w-full h-full flex flex-col justify-center items-center">
            <HeaderDashboard />
          </div>
        </div>
        {/* Contenido desplazable */}
        <div className="w-full overflow-auto z-0 mt-56 md:mt-48">
          {children}
        </div>
      </div>
    </div>
  );
}
