import CardProduct from "@/components/cards/CardProduct";
// import { getConfig } from "@/utils/local_session_storage.js/local_session_storage";
import MessageComponent from "@/ui/MessageComponent";

const fetchProducts = async (
  startAfter = null,
  reset = false,
  category,
  subCategory
) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  try {
    // const configurations = await getConfig();
    const url = new URL(`${apiUrl}/api/products/productsBySubCat`);
    url.searchParams.append("categoria", encodeURIComponent(category));
    url.searchParams.append("subcategoria", encodeURIComponent(subCategory));
    url.searchParams.append("includeProductsWithoutStock", false);
    url.searchParams.append(
      "limit",
      8
      // Number(configurations?.productosPorPagina) || defaultProductsByPage
    );

    const res = await fetch(url);
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error al obtener los productos: ", error);
    return { products: [] };
  }
};

export default async function Products({ category, subCategory }) {
  const productsData = await fetchProducts(null, true, category, subCategory);
  const newProducts = productsData?.products || [];

  if (newProducts.length === 0) {
    return (
      <MessageComponent
        message={"No hay productos para mostrar aún...."}
        type={"info"}
      />
    );
  }

  return (
    <div className="flex flex-col h-fit">
      <div className="flex flex-row flex-wrap gap-6 flex-grow">
        {newProducts.map((product) => (
          <CardProduct
            key={product.docID}
            product={product}
            category={category}
            subCategory={subCategory}
          />
        ))}
      </div>
      {/* <div className="flex justify-center items-center mt-6">
        {products.length < totalProducts && (
          <button
            onClick={handleLoadMore}
            className="border rounded shadow-lg p-2 font-light text-slate-500 bg-emerald-200 hover:shadow-xl"
          >
            Mostrar más
          </button>
        )}
      </div> */}
    </div>
  );
}
