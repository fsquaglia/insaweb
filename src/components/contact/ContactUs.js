"use client";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { CiLogin } from "react-icons/ci";
import Link from "next/link";

// Configuración EmailJS
const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;

// Configuración de longitudes máximas
const maxLengthName = 25;
const maxLengthEmail = 35;
const maxLengthMessage = 250;

// Generar número de contacto
const generateContactNumber = () =>
  Math.floor(Math.random() * 1000000).toString();

export default function ContactUs() {
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    defaultValues: {
      user_name: "",
      user_email: "",
      message: "",
    },
  });

  // Cuando la sesión está lista, actualizar valores por defecto
  useEffect(() => {
    if (status === "authenticated") {
      reset({
        user_name: session?.user?.name || "",
        user_email: session?.user?.email || "",
        message: "",
      });
    }
  }, [status, session, reset]);

  const messageWatch = watch("message", "");

  const sendEmail = (data) => {
    const formFields = {
      user_name: data.user_name,
      user_email: data.user_email,
      message: data.message,
      contact_number: generateContactNumber(),
    };

    emailjs.send(serviceID, templateID, formFields, { publicKey }).then(
      () => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Mensaje enviado",
          showConfirmButton: false,
          timer: 1500,
        });
      },
      (error) => {
        console.error("Falló enviar mensaje: ", error);
        Swal.fire({
          position: "top-end",
          icon: "error",
          title: "Algo falló...",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    );
  };

if (status === "loading") {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-gray-500">
      <div className="w-6 h-6 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
      <span className="mt-2">Cargando datos...</span>
    </div>
  );
}



  return (
    <form
      onSubmit={handleSubmit(sendEmail)}
      className="relative flex flex-col z-10 mx-auto py-8 px-4 2xl:px-8 md:ml-auto md:mt-0 bg-white shadow-md bg-opacity-90 h-full"
    >
       <div className="flex flex-row items-center justify-between mb-2">
        <h2 className="text-gray-900 text-md 2xl:text-lg font-medium title-font ">
          Escribinos, te respondemos
        </h2>
        {!session && (
          <Link href="/auth/login">
            <CiLogin className="cursor-pointer" title="Login" />
          </Link>
        )}
      </div>

      {/* Nombre */}
      <div className="relative mb-4">
        <input
          type="text"
          id="user_name"
          maxLength={maxLengthName}
          placeholder="Nombre"
          disabled={!!session?.user?.name}
          {...register("user_name", {
            required: session?.user?.name ? false : "Campo requerido",
            minLength: { value: 3, message: "Tres caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <span className="leading-7 text-xs text-red-800">
          {errors.user_name?.message}
        </span>
      </div>

      {/* Email */}
      <div className="relative mb-4">
        <input
          type="email"
          id="user_email"
          placeholder="Email"
          maxLength={maxLengthEmail}
          disabled={!!session?.user?.email}
          {...register("user_email", {
            required: session?.user?.email ? false : "Campo requerido",
            minLength: { value: 7, message: "Siete caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <span className="leading-7 text-xs text-red-800">
          {errors.user_email?.message}
        </span>
      </div>

      {/* Mensaje */}
      <div className="relative mb-4">
        <textarea
          id="message"
          maxLength={maxLengthMessage}
          placeholder="Tu mensaje"
          {...register("message", {
            required: "Campo requerido",
            minLength: { value: 10, message: "Diez caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-sm outline-none text-gray-700 pt-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
        <span className="block text-xs text-gray-500 text-right">
          {`${messageWatch.length} de ${maxLengthMessage} caracteres`}
        </span>
        <span className="leading-7 text-xs text-red-800">
          {errors.message?.message}
        </span>
      </div>

      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-md"
      >
        Enviar
      </button>

      <p className="text-xs text-gray-500 mt-3 mx-auto">
        Aceptas compartir tu email con nosotros.
      </p>
    </form>
  );
}
