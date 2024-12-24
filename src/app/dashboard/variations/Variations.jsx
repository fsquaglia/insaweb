import React from "react";
import CardVariations from "./CardVariations";

function VariationsPage({ variations }) {
  return (
    <div className="container flex flex-row flex-wrap justify-center">
      {variations && Object.keys(variations).length > 0 ? (
        Object.keys(variations).map((key, index) => (
          <div key={index}>
            <CardVariations
              idVariation={key}
              titleVariation={variations[key].tituloVariacion || "Título"}
              textVariation={variations[key].textoVariacion || "Detalle"}
              urlImage={variations[key].urlImagen || null}
              isObjectMultiple={variations[key].esObjetoMultipleProp}
              dataVariation={variations[key].data}
            />
          </div>
        ))
      ) : (
        <div className="container my-2 text-center">
          <span>No hay variaciones para mostrar</span>
        </div>
      )}
    </div>
  );
}

export default VariationsPage;
