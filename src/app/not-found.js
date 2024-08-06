// src/app/not-found/page.js
import React from "react";
import Link from "next/link";

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>404 - Page Not Found</h1>
      <p>Lo sentimos, la página que estás buscando no existe.</p>
      <Link href="/">
        <p>Volver a la página principal</p>
      </Link>
    </div>
  );
};

export default NotFoundPage;
