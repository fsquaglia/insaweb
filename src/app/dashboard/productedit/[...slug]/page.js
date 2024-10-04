"use client";
import { useEffect, useState } from "react";

function page({ params }) {
  //   console.log(params);
  const [decoded, setDecoded] = useState([]);

  useEffect(() => {
    if (params?.slug) {
      const decoded = params.slug.map((part) => decodeURIComponent(part));
      setDecoded(decoded);
    }
  }, []);

  const [category, subcategory, product] = decoded;
  return (
    <div>
      pageslug:
      {product}
      <br />
      {subcategory} <br />
      {category} <br />
    </div>
  );
}

export default page;
