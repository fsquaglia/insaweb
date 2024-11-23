import Nav_links from "./nav_links";
import "./sidenav.css";

export default function Sidenav() {
  return (
    <div className="responsive-container flex items-center md:items-start md:flex-none">
      <div className="flex flex-row flex-wrap md:flex-col">
        <Nav_links />
      </div>
    </div>
  );
}
