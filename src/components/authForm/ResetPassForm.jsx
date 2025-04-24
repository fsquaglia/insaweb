"use client";
import React, { useState } from "react";
import DivContainer from "./DivContainer";
import InputSection from "./InputSection";
import { validateEmail } from "@/utils/validations";
import { getUserByEmail } from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";

function ResetPassForm() {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errorMsg } = validateEmail(email);
    if (!isValid) {
      setError(errorMsg);
      return;
    }
    setError(""); // Limpiar el error si es válido

    try {
      // Verificar si el email está registrado
      const existingUser = await getUserByEmail(email);

      if (existingUser.length > 0) {
        // le enviamos el email de validación
        const response = await fetch("/api/sendEmail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-email-type": "reset-password",
          },

          body: JSON.stringify({ email: email }),
        });

        const data = await response.json();
        if (response.ok) {
          console.log("Correo enviado:", data.message);
          Swal.fire({
            icon: "success",
            title: "Correo enviado",
            text: "Si tu email está registrado, recibirás el enlace.",
            showConfirmButton: false,
            timer: 3000,
          });
        } else {
          setError(data.error);
        }
      } else {
        Swal.fire({
          icon: "success",
          title: "Correo enviado",
          text: "Si tu email está registrado, recibirás el enlace.",
          showConfirmButton: false,
          timer: 3000,
        });
      }
    } catch (error) {
      console.error("Error enviando email:", error);
      setError(
        "Ocurrió un error al restablecer la contraseña. Inténtalo más tarde."
      );
    }
  };

  return (
    <DivContainer typeForm={"forgot"} handleSubmit={handleSubmit} error={error}>
      {/*EMAIL*/}
      <InputSection
        label={""}
        name={"email"}
        value={email}
        showEye={false}
        placeholder={"mail@loopple.com"}
        onChange={(e) => setEmail(e.target.value)}
      />
    </DivContainer>
  );
}

export default ResetPassForm;
