"use client";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function ContactUs() {
  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;
  //configuramos longitudes de input máximas
  const maxLengthName = 25;
  const maxLengthEmail = 35;
  const maxLengthMessage = 250;

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  // Escuchar cambios en el campo "message"
  const messageWatch = watch("message", "");

  const sendEmail = (data) => {
    const formFields = {
      user_name: data.user_name,
      user_email: data.user_email,
      message: data.message,
      contact_number: generateContactNumber(), // Generar número si no está presente
    };

    emailjs
      .send(serviceID, templateID, formFields, {
        publicKey: publicKey,
      })
      .then(
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
          console.log("Falló enviar mensaje: ", error.message);
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

  // Función opcional para generar un número de contacto si es necesario
  const generateContactNumber = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        sendEmail(data);
      })}
      className="relative flex flex-col z-10 mx-auto py-8 px-4 2xl:px-8 md:ml-auto md:mt-0 bg-white shadow-md bg-opacity-90 h-full"
    >
      <h2 className="text-gray-900 text-md 2xl:text-lg mb-2 font-medium title-font">
        Escribinos, te respondemos
      </h2>

      {/*Nombre*/}
      <div className="relative mb-4">
        <input
          type="text"
          id="user_name"
          name="user_name"
          maxLength={maxLengthName}
          placeholder="Nombre"
          {...register("user_name", {
            required: "Campo requerido",
            minLength: { value: 3, message: "Tres caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <span className="leading-7 text-xs text-red-800">
          {errors.user_name?.message}
        </span>
      </div>

      {/*email */}
      <div className="relative mb-4">
        <input
          type="email"
          id="user_email"
          name="user_email"
          placeholder="Email"
          maxLength={maxLengthEmail}
          {...register("user_email", {
            required: "Campo requerido",
            minLength: { value: 7, message: "Siete caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-sm outline-none text-gray-700 pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
        <span className="leading-7 text-xs text-red-800">
          {errors.user_email?.message}
        </span>
      </div>

      {/*message*/}
      <div className="relative mb-4">
        <textarea
          id="message"
          name="message"
          maxLength={maxLengthMessage}
          placeholder="Tu mensaje"
          {...register("message", {
            required: "Campo requerido",
            minLength: { value: 10, message: "Diez caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-sm outline-none text-gray-700 pt-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
        {/* Contador de caracteres de message*/}
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
