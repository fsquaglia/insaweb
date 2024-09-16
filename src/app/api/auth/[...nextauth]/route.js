import NextAuth from "next-auth";
import { authConfig } from "@/app/auth.config"; // Asegúrate que la ruta sea correcta

export const { GET, POST } = NextAuth(authConfig);
