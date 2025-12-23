"use server";
import { revalidatePath } from "next/cache";
import { signIn } from "next-auth/react";

export async function authenticate(formData) {
  const result = await signIn("credentials", {
    // redirect: false, // Evita la redirección automática de NextAuth
    email: formData.email,
    password: formData.password,
  });

  if (result.error) {
    // Maneja los posibles errores que devuelve NextAuth
    return result.error === "CredentialsSignin"
      ? "Credenciales incorrectas."
      : "Algo salió mal.";
  }

  // Si el login es exitoso
  return null; // No hay error
}

// Revalidar la ruta según el tipo especificado
// Si no se especifica tipo, revalida la ruta por defecto
// Lo hice así porque estoy experimentando problemas de revalidación
// Debe usar async porque es una acción del servidor
export async function revalidateSomePath(path, type = "") {
  if (!path) {
    return { success: false, message: "Path es requerido" };
  }

  try {
    switch (type) {
      case "":
        revalidatePath(path);
        break;
      case "page":
        revalidatePath(path, "page");
        break;
      case "layout":
        revalidatePath(path, "layout");
        break;
      default:
        return { success: false, message: "Tipo inválido" };
    }

    return {
      success: true,
      message: `Path "${path}" revalidado correctamente`,
    };
  } catch (error) {
    console.error("Error revalidando path:", error);
    return { success: false, message: "Error al revalidar" };
  }
}

// Helper para revalidar todo
export async function revalidateAll() {
  return revalidateSomePath("/", "layout");
}
