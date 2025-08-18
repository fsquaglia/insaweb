//Cuidado, si el componente que lo llama es un componente del lado del cliente, no se puede usar
// "use server";

export async function revalidateTag(tag) {
  try {
    const res = await fetch(`/api/revalidate/${tag}`, {
      method: "POST",
    });

    if (!res.ok) throw new Error("Error al revalidar");

    const data = await res.json();
    console.log(`Revalidado ${tag}:`, data);
  } catch (error) {
    console.error("Error:", error);
  }
}
