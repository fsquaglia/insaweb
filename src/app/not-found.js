import React from "react";
import Link from "next/link";
import { FaHome } from "react-icons/fa";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-2">
      <h1>Error 404</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/">
        <FaHome size={30} />
      </Link>
    </div>
  );
};

export default NotFoundPage;
