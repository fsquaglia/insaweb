import CategorySelect from "./CategorySelect";
import MessageComponent from "@/ui/MessageComponent";

async function PageProducts() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Obtener categorías de productos
    const response = await fetch(`${apiUrl}/api/categories/categories`, {
      cache: "no-store",
    });
    if (!response.ok)
      throw new Error("Error al cargar las categorías de productos");

    const categoriesProducts = await response.json();

    return (
      <div className="container flex flex-col justify-center text-center">
        <CategorySelect data={categoriesProducts} />
      </div>
    );
  } catch (error) {
    console.error("Error al cargar las categorías de productos:", error);
    return (
      <div className="flex mx-auto my-4">
        <MessageComponent
          message="Error al cargar las categorías. Intenta recarga la página."
          type={"error"}
        />
      </div>
    );
  }
}

export default PageProducts;
