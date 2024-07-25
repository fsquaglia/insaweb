import React from "react";
import "./SkeletonLoader.css"; // Importa el archivo de estilos

const SkeletonLoader = () => {
  return (
    <div className="skeleton-container">
      <div className="skeleton-loader"></div>
    </div>
  );
};

export default SkeletonLoader;
