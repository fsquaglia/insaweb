// import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { getUserByEmail } from "@/utils/firebase/fetchFirebase";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", required: true },
        password: { label: "Password", type: "password", required: true },
      },

      async authorize(credentials) {
        // Validación y obtención del usuario
        const { email, password } = credentials;
        const user = await getUserByEmail(email); //devolverá un array de usuarios
        if (user.length === 0) {
          throw new Error("No existe el email");
        }

        //!falta comparar password
        //if (!user || !(await bcrypt.compare(credentials.password, user.password))) {
        if (!user) {
          throw new Error("Credenciales inválidas");
        }

        //retorna el objeto de usuario para guardarlo en la sesión
        return {
          id: user.id,
          email: user.email,
          name: user.nombreContacto,
          role: user.rol,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role; // Incluye el rol del usuario en el token
      }
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
  pages: {
    signIn: "/login", // Página de login personalizada
  },
};

export default authOptions;
