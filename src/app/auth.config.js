export const authConfig = {
  pages: {
    signIn: "/login", // Redireccionar a /login si no autenticado
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");

      if (isOnDashboard && isLoggedIn) return true; // Si está en dashboard y logueado
      return isLoggedIn
        ? Response.redirect(new URL("/dashboard", nextUrl))
        : true;
    },
  },
};
