import React from "react";
import InputCustom from "@/ui/InputCustom";

function PageConfig() {
  //agregar en componente edit product tomar
  //multipoicador compra venta desde BDD o sessionStorage
  return (
    <div>
      <InputCustom labelText={"Prefijo Código Producto"} />
      <InputCustom labelText={"Multiplicador precio Cpra/Vta"} />
      <InputCustom labelText={"Coeficiente precio"} />
    </div>
  );
}

export default PageConfig;
