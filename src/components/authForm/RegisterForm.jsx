"use client";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  addNewContactFirestore,
  getUserByEmail,
} from "@/utils/firebase/fetchFirebase"; // Asegúrate de tener estas funciones

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores anteriores

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Verificar si el email ya está registrado
      const existingUser = await getUserByEmail(email);
      if (existingUser.length > 0) {
        setError("Este email ya está registrado");
        return;
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);

      // Crear nuevo usuario en Firestore
      const newUser = {
        nombreContacto: name,
        sobrenombre: "",
        direccion: "",
        localidad: "",
        provincia: "",
        email,
        password: hashedPassword, // Guardamos el hash de la contraseña
        celTE: "",
        saldo: 0,
        rol: "user", // Asignar rol por defecto
      };

      const userAdd = await addNewContactFirestore(newUser);

      // Intentar loguear al usuario automáticamente después del registro
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password, // Usamos la contraseña sin hash para el login
      });
      console.log("logueando...");
      console.log(res);

      if (res.error) {
        setError(res.error);
      } else {
        // Redirigir al users si el registro y login son exitosos
        router.push("/users");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setError("Ocurrió un error durante el registro. Inténtalo más tarde.");
    }
  };

  return (
    <div className="container flex flex-col mx-auto bg-white pt-12 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5 draggable">
        <div className="flex items-center justify-center w-full lg:p-12">
          <div className="flex items-center xl:p-10 p-4 border rounded-3xl">
            <form
              className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl"
              onSubmit={handleSubmit}
            >
              <h3 className="mb-3 text-4xl font-extrabold text-dark-grey-900">
                Regístrate
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
                Registro con Google
              </div>
              <div className="flex items-center mb-3">
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
                <p className="mx-4 text-grey-600">o con tus credenciales</p>
                <hr className="h-0 border-b border-solid border-grey-500 grow" />
              </div>
              <label
                htmlFor="name"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Nombre y apellido*
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Juan Perez"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-grey-700 text-dark-gray-900 rounded-2xl border hover:bg-gray-100"
              />
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
              <label
                htmlFor="password_confirmation"
                className="mb-2 text-sm text-start text-grey-900"
              >
                Repite la contraseña*
              </label>
              <input
                id="password_confirmation"
                name="password_confirmation"
                type="password"
                placeholder="Repite la contraseña"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
                className="flex items-center w-full px-5 py-4 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-grey-700 text-dark-gray-900 rounded-2xl border hover:bg-gray-100"
              />
              <div className="flex flex-row flex-wrap justify-end mb-8 text-sm font-medium text-purple-blue-500 gap-1">
                <span>¿Ya estás registrado? </span>
                <Link href={"/auth/login"}>Inicia sesión</Link>
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <button
                className="border w-full px-6 py-5 mb-5 text-sm font-bold leading-none text-white transition duration-300 md:w-96 rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 bg-blue-500"
                type="submit"
              >
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterForm;
