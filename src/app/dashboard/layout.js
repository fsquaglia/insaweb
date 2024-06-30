import Sidenav from "../../ui/sidenav";

export default function Layout({ children }) {
  return (
    <div>
      <div className="border h-24"></div>
      <div className="flex md:h-screen flex-col md:flex-row md:overflow-hidden">
        <div className="w-full flex-none md:w-64 bg-blue-300">
          <Sidenav />
        </div>
        <div className="flex-grow p-6 md:overflow-y-auto md:p-12">
          {children}
        </div>
      </div>
    </div>
  );
}
