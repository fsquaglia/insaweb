"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function ContactUs() {
  const form = useRef();
  //const [data, setData] = useState({});
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;

  const sendEmail = (data) => {
    const formFields = {
      user_name: data.user_name,
      user_email: data.user_email,
      message: data.message,
      contact_number: generateContactNumber(), // Generar número si no está presente
    };

    console.log(formFields);
    return;
    // const formData = new FormData(form.current);

    // emailjs
    //   .send(serviceID, templateID, formFields, {
    //     publicKey: publicKey,
    //   })
    //   .then(
    //     () => {
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "success",
    //         title: "Mensaje enviado",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     },
    //     (error) => {
    //       console.log("Falló enviar mensaje: ", error.message);
    //       Swal.fire({
    //         position: "top-end",
    //         icon: "error",
    //         title: "Algo falló...",
    //         showConfirmButton: false,
    //         timer: 1500,
    //       });
    //     }
    //   );
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
      className="relative flex flex-col z-10 md:w-2/3 mx-auto p-8 md:ml-auto mt-10 md:mt-0 bg-white shadow-md"
    >
      <h2 className="text-gray-900 text-lg mb-2 font-medium title-font">
        Escríbenos, te respondemos
      </h2>

      {/*Nombre*/}
      <div className="relative mb-4">
        <input
          type="text"
          id="user_name"
          name="user_name"
          maxLength={25}
          placeholder="Nombre"
          {...register("user_name", {
            required: "Campo requerido",
            minLength: { value: 3, message: "Tres caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
          {...register("user_email", {
            required: "Campo requerido",
            minLength: { value: 7, message: "Siete caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 pt-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
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
          maxLength={250}
          placeholder="Tu mensaje"
          {...register("message", {
            required: "Campo requerido",
            minLength: { value: 10, message: "Diez caracteres mínimos" },
          })}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 pt-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
        <span className="leading-7 text-xs text-red-800">
          {errors.message?.message}
        </span>
      </div>
      <button
        type="submit"
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Enviar
      </button>

      <p className="text-xs text-gray-500 mt-3 mx-auto">
        Aceptas compartir tu email con nosotros.
      </p>
    </form>
  );
}
