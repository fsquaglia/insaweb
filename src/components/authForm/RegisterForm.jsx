"use client";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  addNewContactFirestore,
  getUserByEmail,
} from "@/utils/firebase/fetchFirebase";
import { newUserDataInitial } from "@/utils/SettingInitialData";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaRegEye } from "react-icons/fa";

function RegisterForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const router = useRouter();

  // Fn validación de passwords
  const validatePassword = (password, confirmPassword) => {
    if (!password.trim() || !confirmPassword.trim()) {
      setError("Las contraseñas no pueden estar vacías");
      return false;
    }
    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return false;
    }
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return false;
    }
    return true;
  };

  // Fn validación de nombre de usuario
  const validateName = (name) => {
    if (!name.trim()) {
      setError("El nombre de usuario no puede estar vacío");
      return false;
    }
    if (name.length < 3) {
      setError("El nombre de usuario debe tener al menos 3 caracteres");
      return false;
    }
    return true;
  };

  const validateEmail = (email) => {
    if (!email.trim()) {
      setError("El email no puede estar vacío");
      return false;
    }
    // Expresión regular para validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Por favor ingresa un email válido");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores anteriores

    // Validaciones, si hay un error la Fn retorna false
    if (!validateName(values.name)) return;
    if (!validateEmail(values.email)) return;
    if (!validatePassword(values.password, values.confirmPassword)) return;

    try {
      // Verificar si el email ya está registrado
      const existingUser = await getUserByEmail(values.email);
      if (existingUser.length > 0) {
        setError("Este email ya está registrado");
        return;
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(values.password, 10);

      // Crear nuevo usuario en Firestore
      const newUser = newUserDataInitial(
        values.name,
        values.email,
        hashedPassword,
        "user",
        "",
        false
      );

      //! OJO descomentar
      //await addNewContactFirestore(newUser);

      // enviamos el email de validación
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Correo enviado:", data.message);
        console.log("Correo enviado:", data.message);
      } else {
        setError(data.error);
      }

      //! OJO eliminar return siguiente
      return;
      // Intentar loguear al usuario automáticamente después del registro
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password, // Usamos la contraseña sin hash para el login
      });

      if (res.error) {
        setError("Error logueando usuario: ", res.error);
      } else {
        // Redirigir al users si el registro y login son exitosos
        router.push("/users");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setError("Ocurrió un error durante el registro. Inténtalo más tarde.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <div className="container flex flex-col mx-auto bg-white pt-2 my-5">
      <div className="flex justify-center w-full h-full my-auto xl:gap-14 lg:justify-normal md:gap-5">
        <div className="flex items-center justify-center w-full">
          <div className="flex items-center xl:p-10 p-4 border rounded-3xl">
            <form
              className="flex flex-col w-full h-full pb-6 text-center bg-white rounded-3xl min-w-96"
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
              {/*NOMBRE Y APELLIDO*/}
              <InputSection
                label={"Nombre y Apellido"}
                name={"name"}
                value={values.name}
                showEye={false}
                placeholder={"Juan Perez"}
                onChange={handleChange}
              />

              {/*EMAIL*/}
              <InputSection
                label={"Email"}
                name={"email"}
                value={values.email}
                showEye={false}
                placeholder={"mail@loopple.com"}
                onChange={handleChange}
              />

              {/*CONTRASEÑA*/}
              <InputSection
                label={"Contraseña"}
                name={"password"}
                value={values.password}
                showEye={true}
                placeholder={"Ingresa una contraseña"}
                onChange={handleChange}
              />

              {/*Confirmar CONTRASEÑA */}
              <InputSection
                label={"Repite la contraseña"}
                name={"confirmPassword"}
                value={values.confirmPassword}
                showEye={true}
                placeholder={"Repite la contraseña"}
                onChange={handleChange}
              />

              <div className="flex flex-row flex-wrap justify-end mb-4 text-sm font-medium text-purple-blue-500 gap-1">
                <span>¿Ya estás registrado? </span>
                <Link href={"/auth/login"}>Inicia sesión</Link>
              </div>
              {error && <p className="text-red-500 my-2 text-sm">{error}</p>}
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

function InputSection({
  label,
  name,
  value,
  showEye = false,
  placeholder,
  onChange,
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative w-full flex flex-col gap-2">
      <label htmlFor={name} className="ms-2 text-sm text-start text-gray-600">
        {label} *
      </label>
      <input
        id={name}
        name={name}
        type={showEye && !showPassword ? "password" : "text"}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        className="flex items-center w-full px-2 py-2 mr-2 text-sm font-medium outline-none focus:bg-gray-200 mb-7 placeholder:text-gray-400 text-dark-gray-900 rounded-xl border hover:bg-gray-100"
      />
      {/* Botón para mostrar/ocultar contraseña */}
      {showEye && (
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-4 flex items-center text-gray-400 hover:text-gray-700"
        >
          {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
        </button>
      )}
    </div>
  );
}
