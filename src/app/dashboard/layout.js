import Sidenav from "../../ui/sidenav";
import HeaderDashboard from "@/ui/HeaderDashboard";
import UserData from "@/components/userData/UserData";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col md:flex-row flex-wrap min-h-screen">
      {/* Sidenav fijo a la izquierda */}
      <div className="md:flex-none flex flex-row items-center justify-center text-white w-full md:w-64 bg-blue-300 md:h-screen md:fixed md:top-0">
        <Sidenav />
      </div>

      <div className="md:flex-grow md:ml-64">
        {/* Contenido a la derecha del Sidenav */}
        <div className="sticky top-0 z-10">
          {/* HeaderDashboard y UserData en la parte superior derecha */}
          <div className="bg-blue-400 flex justify-center">
            <UserData />
          </div>
          <div className="bg-blue-200 flex justify-center">
            <HeaderDashboard />
          </div>
        </div>

        {/* Contenido desplazable */}
        <div className="flex-grow overflow-auto z-0">{children}</div>
      </div>
    </div>
  );
}
