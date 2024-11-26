import Nav_links from "./nav_links";

export default function Sidenav() {
  return (
    <div className="flex flex-row flex-wrap md:flex-col items-center md:items-start h-8 md:h-full">
      <Nav_links />
    </div>
  );
}
