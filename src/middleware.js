// export { default } from "next-auth/middleware";
import { withAuth } from "next-auth/middleware";

//así nomás exportando esta función en el middleware protejo las rutas que matchean
//si no estoy logueado no puedo acceder a estas rutas y subrutas
export const config = { matcher: ["/dashboard/:path*", "/users/:path*"] };

export default withAuth(
  function middleware(req) {
    // console.log("hola");
    // console.log(req.nextauth?.token);
  },
  {
    //si defino un callback entonces puedo hacer más cosas para definir si se acepta ver una ruta o no
    //si no lo defino, tendré acceso a los matcher si estoy logueado y listo
    callbacks: {
      authorized: ({ token, req }) => {
        console.log("soy el middleware");
        console.log(token);
        console.log(token?.role);

        // Si no hay token, el usuario no está autenticado
        if (!token) return false;

        // Obtener la ruta solicitada
        const { pathname } = req.nextUrl;

        // Permitir acceso a `/dashboard` y subrutas solo a administradores
        if (pathname.startsWith("/dashboard") && token?.role === "admin") {
          return true;
        }

        // Permitir acceso a `/users` y subrutas a administradores y usuarios
        if (
          pathname.startsWith("/users") &&
          (token?.role === "user" || token?.role === "admin")
        ) {
          return true;
        }

        // En otros casos, denegar el acceso
        return false;
      },
    },
  }
);
