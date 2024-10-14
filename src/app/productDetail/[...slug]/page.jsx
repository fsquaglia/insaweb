import React from "react";
// import { useRouter } from "next/router";
//!eliminar esta pagina
function page({ params }) {
  //   const router = useRouter();
  const [category, subcategory, productId] = params.slug;
  console.log(category, subcategory, productId);

  return <div>page</div>;
}

export default page;
