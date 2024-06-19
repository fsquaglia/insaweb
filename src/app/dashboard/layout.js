import Sidenav from "../../ui/sidenav";

export default function Layout({ children }) {
  return (
    <div>
      <div className="border h-24"></div>
      <div className="flex flex-col md:flex-row">
        <div className="w-[300px] bg-sky-600">
          <Sidenav />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
