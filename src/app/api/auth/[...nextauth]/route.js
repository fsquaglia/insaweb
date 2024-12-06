import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CrededentialsProvider from "next-auth/providers/credentials";
import {
  addNewContactFirestore,
  getUserByEmail,
} from "@/utils/firebase/fetchFirebase";
import bcrypt from "bcryptjs";

import { newUserDataInitial } from "@/utils/SettingInitialData";
import Swal from "sweetalert2";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CrededentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "usuario@servidor.com",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "******",
        },
      },
      //authorize retorna el usuario logueado, o null
      async authorize(credentials, req) {
        const { email, password } = credentials;
        try {
          //llamar a fetch de usuario en firestore
          const users = await getUserByEmail(email);
          //getUserByEmail devuelve un array de usuarios encontrados
          if (users.length > 0) {
            const user = users[0];

            // Comparar la contraseña ingresada con la almacenada en la base de datos
            const isValidPassword = await bcrypt.compare(
              password,
              user.password
            );

            if (!isValidPassword) {
              return null; // Contraseña incorrecta
            }

            // Retorna los datos que deseas incluir en el token JWT
            return {
              id: user.id,
              name: user.nombreContacto,
              role: user.rol,
              image: user.imagen,
              email: user.email,
            };
          }

          //si no hay usuario devuelve null
          return null;
        } catch (error) {
          console.error(
            "Error durante la autenticación (Credenciales):",
            error
          );
          return null;
        }
      },
    }),
  ],
  // debug: true,
  pages: {
    signIn: "/auth/login",
    // signOut: "/auth/signout",
    //error: "/auth/error", // Error code passed in query string as ?error=
    //verifyRequest: "/auth/verify-request", // (used for check email message)
    newUser: "/auth/register", // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  // Aquí es donde personalizas el token JWT, y luego session
  callbacks: {
    // El primer argumento es el token actual, y el segundo es el usuario retornado por authorize (user puede llegar a ser null si no se pasa por credenciales), account es el proveedor como Google, y profile es la data que devuelve el proveedor
    async jwt({ token, user, account, profile }) {
      // Si el usuario se autentica con Google
      if (account?.provider === "google") {
        const email = profile.email;

        // Intentar obtener el usuario de Firestore
        const users = await getUserByEmail(email);

        if (users.length > 0) {
          const foundUser = users[0];

          // Si el usuario existe, asignar el rol al token
          token.id = foundUser.id;
          token.role = foundUser.rol;
          token.email = foundUser.email;
          token.image = foundUser.imagen;
          token.name = foundUser.nombreContacto;
        } else {
          // Si no existe, crear un nuevo usuario en Firestore y asignar un rol por defecto
          const nameProfile = profile.name || profile.email.split("@")[0];
          const imageProfile = profile.picture || "";
          const newUser = newUserDataInitial(
            nameProfile,
            profile.email,
            "",
            "user",
            imageProfile
          );
          try {
            //función para agregar nuevo usuario
            const userAdd = await addNewContactFirestore(newUser);

            token.id = userAdd;
            token.role = "user";
            token.email = profile.email;
            token.image = imageProfile;
            token.name = nameProfile;
          } catch (error) {
            console.error("Error creando usuario: ", error);

            Swal.fire("Error al crear usuario", error.message, "error");
            return null;
          }
        }
      } else {
        // Si el usuario se autentica con credenciales, ya se añadió el rol en `user`
        if (user) {
          token.id = user.id;
          token.role = user.role;
          token.email = user.email;
          token.image = user.image;
          token.name = user.name;
        }
      }

      return token;
    },
    async session({ session, token }) {
      // Añadir los datos personalizados del token a la sesión

      if (token) {
        if (!session.user) {
          // Si session.user no está definido, lo inicializamos
          session.user = {};
        }

        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.image = token.image;
        session.user.name = token.name;
      }

      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // Añade tu secreto para JWT aquí
  events: {
    signOut: async (message) => {
      // Esto se ejecutará cada vez que ocurra el signOut
      // pero se ejecuta en el lado del servidor
      // console.log("User signed out", message);
      // if (typeof window !== "undefined") {
      //   Limpiar sessionStorage en el navegador
      //   sessionStorage.removeItem("variations");
      // }
    },
  },
});

export { handler as GET, handler as POST };
