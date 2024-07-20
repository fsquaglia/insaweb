import Sidenav from "../../ui/sidenav";
import HeaderDashboard from "@/ui/HeaderDashboard";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="border h-24"></div>
      <div className="flex flex-grow flex-col md:flex-row h-full">
        <div className="text-white w-full md:w-64 bg-blue-300 flex-none min-h-full">
          <Sidenav />
        </div>
        <div className="flex flex-col flex-wrap items-center mx-auto w-full">
          <div className="bg-blue-100 min-h-32 w-full flex justify-center text-center">
            {/*AQUI VAN EL TITULO Y LA DESCRIPCION DE CADA SECCION */}
            <HeaderDashboard />
          </div>
          <div className="py-4">{children}</div>
        </div>
      </div>
    </div>
  );
}
