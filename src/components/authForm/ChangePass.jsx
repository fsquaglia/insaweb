"use client";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";
import DivContainer from "./DivContainer";
import InputSection from "./InputSection";
import { useSession } from "next-auth/react";
import {
  addEventToHistory,
  changePassword,
} from "@/utils/firebase/fetchFirebase";
import MessageComponent from "@/ui/MessageComponent";
import { validatePassword } from "@/utils/validations";
import LoadingDiv from "@/ui/LoadingDiv";

function ChangePass() {
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [actualPassword, setActualPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    if (status !== "loading") {
      setLoadingSession(false);
    }
  }, [status]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    if (!actualPassword || !password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    // Verificar si las contraseñas coinciden
    const { isValid: isValidPass, errorMsg: errorMsgPass } = validatePassword(
      password,
      confirmPassword
    );
    if (!isValidPass) {
      setError(errorMsgPass);
      setLoading(false);
      return;
    }

    setError(null);

    // Comprobar la contraseña actual y actualizarla
    try {
      await changePassword(session?.user?.id, actualPassword, password);
      await addEventToHistory(
        session?.user?.id,
        `${session?.user?.name || "Anónimo"} - (${session?.user?.email})`,
        "Actualización",
        "El usuario ha actualizado su contraseña",
        session?.user?.id
      );
      Swal.fire({
        title: "Contraseña actualizada",
        text: "La contraseña ha sido actualizada correctamente",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });
      setActualPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loadingSession) {
    return <LoadingDiv />;
  }

  return session?.user?.provider === "credentials" ? (
    <div className={`${loading ? "animate-pulse" : "animate-none"}`}>
      <DivContainer
        typeForm={"changePass"}
        handleSubmit={handleSubmit}
        error={error}
        loading={loading}
      >
        {/* Contraseña actual */}
        <InputSection
          label={"Contraseña actual"}
          name={"actualPassword"}
          value={actualPassword}
          showEye={true}
          placeholder={"Contraseña actual"}
          onChange={(e) => setActualPassword(e.target.value)}
        />
        <hr className="mb-2 h-0 border-b border-solid grow" />
        {/* Nueva contraseña */}
        <InputSection
          label={"Nueva contraseña"}
          name={"password"}
          value={password}
          showEye={true}
          placeholder={"Nueva contraseña"}
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* Confirmar contraseña */}
        <InputSection
          label={"Repite la contraseña"}
          name={"confirmPassword"}
          value={confirmPassword}
          showEye={true}
          placeholder={"Repite la contraseña"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </DivContainer>
    </div>
  ) : (
    <div className="flex items-center justify-center h-40">
      <MessageComponent
        message={"Iniciaste sesión con un proveedor externo"}
        type={"error"}
      />
    </div>
  );
}

export default ChangePass;
