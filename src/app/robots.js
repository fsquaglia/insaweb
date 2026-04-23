export default function robots() {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/dashboard/", "/auth/", "/admin/"],
    },
    sitemap: "https://www.insarafaela.com.ar/sitemap.xml",
  };
}
