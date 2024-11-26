"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import Link from "next/link";
import { AiOutlineHome } from "react-icons/ai";

function AuthForm() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    // Si ya hay una sesión activa, redirigir según el rol
    if (session) {
      if (session.user.role === "admin") {
        router.push("/dashboard");
      } else if (session.user.role === "user") {
        router.push("/users");
      }
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      // Si hay un callbackUrl, redirigir allí
      if (callbackUrl) {
        if (session?.user.role === "admin") {
          // El admin puede acceder a cualquier URL
          router.push(callbackUrl);
        } else if (
          session?.user.role === "user" &&
          !callbackUrl.startsWith("/dashboard")
        ) {
          // El usuario con rol "user" puede acceder a cualquier lugar excepto el dashboard
          router.push(callbackUrl);
        } else {
          // Si no tienen permisos, redirigir a una página de error o su área permitida
          router.push("/unauthorized");
        }
      } else {
        // Comportamiento por defecto si no hay callbackUrl
        if (session?.user.role === "admin") {
          router.push("/dashboard"); // Admin puede ir al dashboard o a donde sea
        } else {
          router.push("/users"); // Usuario normal se redirige a su área
        }
      }
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white pt-2 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full ">
          <div className="flex items-center  p-4 border rounded-3xl">
            <form
              className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl min-w-96"
              onSubmit={handleSubmit}
            >
              <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                Inicia sesión
              </h3>
              <div
                className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-gray-900 bg-gray-100 hover:bg-blue-600 focus:ring-4 focus:ring-gray-300 border cursor-pointer hover:text-white"
                onClick={() => signIn("google")}
              >
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt="Google logo"
                />
                Accede con Google
              </div>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">o con tu:</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>
              <label
                htmlFor="email"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Email*
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="mail@loopple.com"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-grey-700 text-dark-gray-900 rounded-2xl border hover:bg-gray-100"
              />
              <label
                htmlFor="password"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Contraseña*
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder="Ingresa una contraseña"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-grey-700 text-dark-gray-900 rounded-2xl border hover:bg-gray-100"
              />
              <div className="flex flex-row flex-wrap justify-between mb-8 text-sm font-medium text-purple-blue-500">
                <Link href={"/auth/register"}>Regístrate</Link>
                <a href="#" className="mr-4 ">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
              {error && <p>{error}</p>}
              <button
                className="border w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 bg-blue-500"
                type="submit"
              >
                Acceder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="text-lg">Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}
// export default AuthForm;
