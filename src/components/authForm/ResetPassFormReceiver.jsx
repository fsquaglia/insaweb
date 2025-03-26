"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import DivContainer from "./DivContainer";
import InputSection from "./InputSection";
import MessageComponent from "@/ui/MessageComponent";
import { validatePassword } from "@/utils/validations";
import {
  addEventToHistory,
  getUserByEmail,
  updateDocInCollection,
} from "@/utils/firebase/fetchFirebase";
import Swal from "sweetalert2";
import bcrypt from "bcryptjs";
import { Suspense } from "react";
import LoadingDiv from "@/ui/LoadingDiv";

function FormReceiver() {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Obtiene el token de la URL

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [errorMsgInitial, setErrorMsgInitial] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (session) {
      setErrorMsgInitial(
        "Ya estás logueado. No es necesario restablecer la contraseña."
      );
      setLoading(false);
      return;
    }

    if (!token) {
      setErrorMsgInitial("No se recibió el token.");
      setLoading(false);
      return;
    }

    const fetchEmailToken = async () => {
      try {
        const res = await fetch(`/api/verifyResetPassToken?token=${token}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);

        setEmail(data.email);
      } catch (error) {
        setErrorMsgInitial(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEmailToken();
  }, [session, token]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-40 w-full text-xs sm:text-base">
        <svg
          className="animate-spin h-5 w-5 mr-2 text-indigo-500"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8v8H4z"
          ></path>
        </svg>
        <span className="text-gray-700">Verificando...</span>
      </div>
    );
  }

  if (errorMsgInitial) {
    return (
      <div className="flex justify-center items-center sm:text-base text-xs min-h-40 w-full">
        <MessageComponent message={errorMsgInitial} type={"error"} />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(null);

    const { isValid: isValidPass, errorMsg: errorMsgPass } = validatePassword(
      password,
      confirmPassword
    );

    if (!isValidPass) {
      setError(errorMsgPass);
      return;
    }

    setError(null); // Limpiar el error si es válido

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      // actualizar la BDD para resetear la password
      const users = await getUserByEmail(email);
      if (users.length === 0) {
        console.log("No se encontró ningún usuario con ese email.");
        return;
      }
      for (const user of users) {
        await updateDocInCollection("contactos", user.id, {
          password: hashedPassword,
        });

        await addEventToHistory(
          user.id,
          `${user.nombreContacto || "Anónimo"} - (${user.email})`,
          "Actualización",
          "El usuario cambió su contraseña.",
          user.id
        );
        // console.log(`Pass cambiado en user ID ${user.id} correctamente.`);
      }
      Swal.fire({
        icon: "success",
        title: "Contraseña actualizada",
        text: "Tu contraseña ha sido actualizada correctamente.",
        timer: 3000,
        showConfirmButton: false,
        willClose: () => {
          router.push("auth/login");
        },
      });
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Ocurrió un error al actualizar la contraseña.",
      });
    }
  };

  return (
    <DivContainer
      typeForm={"resetPass"}
      handleSubmit={handleSubmit}
      error={error}
    >
      {/*CONTRASEÑA*/}
      <InputSection
        label={"Nueva contraseña"}
        name={"password"}
        value={password}
        showEye={true}
        placeholder={"Nueva contraseña"}
        onChange={(e) => setPassword(e.target.value)}
      />

      {/*Confirmar CONTRASEÑA */}
      <InputSection
        label={"Repite la contraseña"}
        name={"confirmPassword"}
        value={confirmPassword}
        showEye={true}
        placeholder={"Repite la contraseña"}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
    </DivContainer>
  );
}

export default function ResetPassFormReceiver() {
  return (
    <Suspense fallback={<LoadingDiv />}>
      <FormReceiver />
    </Suspense>
  );
}
