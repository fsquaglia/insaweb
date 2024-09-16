import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized: async ({ token }) => {
      // Protege las rutas basadas en el rol
      if (token?.role === "admin") {
        return true; // Los admins pueden acceder a todas las rutas
      }
      if (token?.role === "user") {
        // Verifica la ruta a la que está intentando acceder
        const url = new URL(req.url);
        const pathname = url.pathname;

        // Permitir acceso a /users pero no a /dashboard
        return pathname.startsWith("/users");
      }
      return false;
    },
  },
});
