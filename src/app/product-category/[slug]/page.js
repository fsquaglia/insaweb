import React from "react";

function page({ params }) {
  const categoria = params.slug;
  return <div>page {categoria}</div>;
}

export default page;
