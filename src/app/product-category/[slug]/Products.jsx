import React from "react";
import CardProduct from "@/components/cards/CardProduct";

function Products({ products }) {
  const productos = [1, 2, 3, 4, 5, 6];
  return (
    <div className="flex flex-row flex-wrap gap-6">
      {productos.map((product) => (
        <CardProduct key={product} product={product} />
      ))}
    </div>
  );
}

export default Products;
