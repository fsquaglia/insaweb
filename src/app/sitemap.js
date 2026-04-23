const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.insarafaela.com.ar";
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

async function getCategorias() {
  try {
    const res = await fetch(`${apiUrl}/api/categories/categories`);
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

async function getProductosBySubcat(categoria, subcategoria) {
  try {
    const res = await fetch(
      `${apiUrl}/api/products/productsBySubCat?categoria=${encodeURIComponent(categoria)}&subcategoria=${encodeURIComponent(subcategoria)}&limit=1000&includeProductsWithoutStock=true`,
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.products || [];
  } catch {
    return [];
  }
}

export default async function sitemap() {
  const categorias = await getCategorias();

  // URL estáticas
  const staticUrls = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];

  // URLs de categorías y subcategorías
  const categoryUrls = categorias.flatMap((cat) => {
    const categoria = cat.docData.id;
    const subcategorias = cat.docData.subcategorias || [];

    return subcategorias.map((subcat) => ({
      url: `${siteUrl}/product-category/${encodeURIComponent(categoria)}/${encodeURIComponent(subcat)}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));
  });

  // URLs de productos
  const productUrls = (
    await Promise.all(
      categorias.flatMap((cat) => {
        const categoria = cat.docData.id;
        const subcategorias = cat.docData.subcategorias || [];

        return subcategorias.map(async (subcat) => {
          const productos = await getProductosBySubcat(categoria, subcat);

          return productos.map((producto) => ({
            url: `${siteUrl}/product-category/productDetail/${encodeURIComponent(categoria)}/${encodeURIComponent(subcat)}/${producto.docID}`,
            lastModified: new Date(),
            changeFrequency: "monthly",
            priority: 0.6,
          }));
        });
      }),
    )
  ).flat(2);

  return [...staticUrls, ...categoryUrls, ...productUrls];
}
