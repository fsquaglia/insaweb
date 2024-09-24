import Sidenav from "../../ui/sidenav";
import HeaderDashboard from "@/ui/HeaderDashboard";
import UserData from "@/components/userData/UserData";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-grow flex-col md:flex-row h-full">
        {/* Sidenav fijo a la izquierda */}
        <div className="text-white w-full md:w-64 bg-blue-300 flex-none h-screen md:fixed md:left-0">
          <Sidenav />
        </div>

        {/* Contenido a la derecha del Sidenav */}
        <div className="flex flex-col flex-grow overflow-hidden md:ml-64">
          {/* HeaderDashboard fijo en la parte superior derecha */}
          <div className="bg-blue-100 min-h-32 w-full flex flex-row flex-wrap justify-center text-center fixed top-0 left-0 md:left-64 right-0 z-10">
            <div className="w-full">
              <UserData />
            </div>
            <HeaderDashboard />
          </div>

          {/* Contenido desplazable */}
          <div className="flex-grow overflow-auto py-4 mt-32">{children}</div>
        </div>
      </div>
    </div>
  );
}
