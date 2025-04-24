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

export async function revalidateSomePath(path) {
  revalidatePath(path);
}
