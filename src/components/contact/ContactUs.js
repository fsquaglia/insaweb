"use client";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

export default function ContactUs() {
  const form = useRef();
  const [data, setData] = useState({});

  const serviceID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_KEY;

  const sendEmail = (e) => {
    e.preventDefault();
    console.log("enviar");
    return;
    const formData = new FormData(form.current);

    const formFields = {
      user_name: formData.get("user_name"),
      user_email: formData.get("user_email"),
      message: formData.get("message"),
      contact_number: formData.get("contact_number") || generateContactNumber(), // Generar número si no está presente
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

  const onChangeInput = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };

  // Función opcional para generar un número de contacto si es necesario
  const generateContactNumber = () => {
    return Math.floor(Math.random() * 1000000).toString();
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="relative flex flex-col z-10 md:w-2/3 mx-auto p-8 md:ml-auto mt-10 md:mt-0 bg-white shadow-md"
    >
      {/* <div className="relative flex flex-col z-10 md:w-2/3 mx-auto p-8 md:ml-auto mt-10 md:mt-0 bg-white shadow-md"> */}
      <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
        Escríbenos
      </h2>
      <p className="leading-relaxed mb-5 text-gray-600">
        Envíanos tu consulta.
      </p>

      <div className="relative mb-4">
        <label htmlFor="user_name" className="leading-7 text-sm text-gray-600">
          Nombre
        </label>
        <input
          type="text"
          id="user_name"
          name="user_name"
          maxLength={25}
          value={data?.user_name || ""}
          onChange={onChangeInput}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      <div className="relative mb-4">
        <label htmlFor="user_email" className="leading-7 text-sm text-gray-600">
          Email
        </label>
        <input
          type="email"
          id="user_email"
          name="user_email"
          value={data?.user_email || ""}
          onChange={onChangeInput}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
        />
      </div>
      {/*message*/}
      <div className="relative mb-4">
        <div className="flex justify-between">
          <label htmlFor="message" className="leading-7 text-sm text-gray-600">
            Mensaje
          </label>
          <span className="leading-7 text-sm text-red-800">
            hola como estas
          </span>
        </div>
        <textarea
          id="message"
          name="message"
          maxLength={250}
          value={data?.message || ""}
          onChange={onChangeInput}
          className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
        ></textarea>
        <div className="flex flex-row-reverse">
          <span className="text-xs text-gray-500">{`${
            data?.message ? data.message.length : 0
          } de 250 caracteres`}</span>
        </div>
      </div>
      <button
        type="submit"
        disabled={
          Object.keys(data).length === 0 || // Si data es un objeto vacío
          Object.values(data).some((value) => value === "") // Si alguna propiedad de data es un string vacío
        }
        className="text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
      >
        Enviar
      </button>

      <p className="text-xs text-gray-500 mt-3 mx-auto">
        Aceptas compartir tu email con nosotros.
      </p>
      {/* </div> */}
    </form>
  );
}
