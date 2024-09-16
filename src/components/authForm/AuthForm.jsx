"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { authenticate } from "@/utils/actions/actions";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    //!borrar
    console.log("paso por aca");
    console.log(res);

    if (res.error) {
      setError(res.error);
    } else {
      // Redirige según el rol
      router.push("/dashboard");
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white  pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10 p-4 border rounded-3xl">
            <form
              className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
              onSubmit={handleSubmit}
            >
              <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                Inicia sesión
              </h3>
              <a
                className="flex items-center justify-center w-full py-4 mb-6 text-sm font-medium transition duration-300 rounded-2xl text-gray-900 bg-gray-100 hover:bg-blue-200 focus:ring-4 focus:ring-gray-300 border"
                href="#"
              >
                <img
                  className="h-5 mr-2"
                  src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
                  alt="Google logo"
                />
                Accede con Google
              </a>
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
              <div className="flex flex-row justify-end mb-8">
                <a
                  href="#"
                  className="mr-4 text-sm font-medium text-purple-blue-500"
                >
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

export default AuthForm;
