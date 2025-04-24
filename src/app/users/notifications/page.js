"use client";
import MessageComponent from "@/ui/MessageComponent";
import { useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import LoadingDiv from "@/ui/LoadingDiv";
import CardNotification from "./CardNotification";
import Swal from "sweetalert2";
import {
  addEventToHistory,
  updateDocInCollection,
} from "@/utils/firebase/fetchFirebase";
import { revalidateSomePath } from "@/utils/actions/actions";

function PageNotifications() {
  const notificationsText = {
    usuarioVerificado:
      "Tu email aún no ha sido verificado. Revisa tu bandeja de entrada y sigue las instrucciones del correo que te enviamos. No olvides revisar la carpeta de Spam. Si lo necesitas, puedes reenviar la solicitud de verificación con este botón.",
    celTE:
      "Agrega tu número de celular para que podamos comunicarnos contigo cuando sea necesario. Tu privacidad está garantizada.",
    saldo:
      "Recuerda revisar tu saldo pendiente y su fecha de vencimiento para evitar inconvenientes. Los saldos en cuenta deben cancelarse en efectivo",
  };

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [cooldown, setCooldown] = useState(0);
  const [venceTexto, setVenceTexto] = useState("");
  const [textRed, setTextRed] = useState(false);
  const cooldownTime = 60; // Tiempo en segundos para poder reenviar al token
  const [valuePhone, setValuePhone] = useState("");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (status !== "authenticated" || hasFetched.current) return;

    hasFetched.current = true; // Marcamos que ya se ejecutó el fetch para evitar llamadas a la BDD

    const fetchUser = async () => {
      try {
        const response = await fetch(
          `${apiUrl}/api/users/userById/${session.user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "x-no-cache": "true",
              "x-full-data": "false",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Error al obtener datos del usuario.");
        }
        const user = await response.json();
        setUser(user);
        setValuePhone(user?.celTE);

        let newNotifications = [];
        if (!user?.usuarioVerificado)
          newNotifications.push("usuarioVerificado");
        if (user?.celTE.trim() === "") newNotifications.push("celTE");
        if (user?.saldo > 0) {
          newNotifications.push("saldo");

          // Verificar la fecha de vencimiento si hay saldo pendiente
          if (user?.fechaVenceSaldo && user?.fechaVenceSaldo.seconds) {
            const fechaActual = new Date();
            const fechaVence = new Date(user?.fechaVenceSaldo.seconds * 1000);
            const opcionesFormato = {
              year: "numeric",
              month: "long",
              day: "numeric",
            };
            const fechaFormateada = fechaVence.toLocaleDateString(
              "es-ES",
              opcionesFormato
            );

            if (fechaVence > fechaActual) {
              setTextRed(false);
              setVenceTexto(`Tu saldo vence el ${fechaFormateada}`);
            } else {
              setTextRed(true);
              setVenceTexto(`Tu saldo venció el ${fechaFormateada}`);
            }
          }
        }
        setNotifications(newNotifications);
      } catch (error) {
        console.error("Error: ", error);
        setError("Error mostrando usuarios.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [session, status]);

  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => {
        setCooldown((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  if (loading) return <LoadingDiv />;

  if (error) {
    return (
      <div className="flex items-center justify-center">
        <MessageComponent message={error} type={"error"} />
      </div>
    );
  }

  // Lógica para enviar la validación de email
  const handleClickSendToken = async () => {
    if (!session || cooldown > 0) return; // Evita que se pueda hacer clic mientras está en cooldown

    try {
      const response = await fetch(`${apiUrl}/api/sendEmail`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: session.user.email }),
      });

      const data = await response.json();
      if (!response.ok || data.error) {
        throw new Error(data.error || "Error enviando el correo.");
      }

      Swal.fire({
        icon: "success",
        title: "Token enviado",
        text: "Se ha enviado un token a tu correo electrónico.",
      });
      setCooldown(cooldownTime); // Iniciar la cuenta regresiva
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error enviando el correo.",
      });
      console.error("Error enviando el correo:", error);
    }
  };

  // Lógica para actualizar el número de teléfono
  const handleClickUpdatePhone = async () => {
    if (!session || !user) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No se pudo obtener la sesión o el usuario.",
      });
      return;
    }
    // comprobar formato de celular
    if (!/^\d{12}$/.test(valuePhone)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El número de celular debe tener 12 dígitos (54 3408 xxxxxx).",
      });
      return;
    }

    try {
      await updateDocInCollection("contactos", user.id, {
        celTE: valuePhone,
      });
      //agregar evento de actualización al historial
      await addEventToHistory(
        user.id,
        user.email,
        "Actualización",
        "Actualizó su Nro de teléfono",
        user.id
      );

      await revalidateSomePath(
        "/users/notifications",
        "/users/profile",
        "dashboard/userManagement"
      );

      setUser((prevUser) => ({
        ...prevUser,
        celTE: valuePhone,
      }));

      Swal.fire({
        icon: "success",
        title: "Teléfono actualizado",
        text: "Número actualizado. Reinicia tu sesión para aplicar los cambios",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error actualizando el número de teléfono.",
      });
      console.error("Error actualizando el número de teléfono:", error);
    }
  };

  return (
    <div className="xl:max-w-6xl mx-auto">
      <h2 className="text-slate-500 my-4 font-semibold text-center">
        Notificaciones de usuario
      </h2>
      {notifications.length > 0 ? (
        notifications.map((notif, index) => (
          <div key={index} className="px-2">
            {notif === "usuarioVerificado" && (
              <CardNotification
                description={notificationsText.usuarioVerificado}
              >
                <div className="lg:w-1/2"></div>
                <div className="w-1/2 flex items-center justify-center">
                  <button
                    className="min-w-32 h-10 text-sm rounded-lg bg-sky-600 text-sky-100 shadow-md hover:bg-sky-400"
                    onClick={handleClickSendToken}
                    disabled={cooldown > 0}
                  >
                    {cooldown > 0
                      ? `Reenviar en ${cooldown}s`
                      : "Reenviar token"}
                  </button>
                </div>
              </CardNotification>
            )}
            {notif === "celTE" && (
              <CardNotification description={notificationsText.celTE}>
                <div className="w-1/2 flex items-center justify-center">
                  <input
                    className="w-32 h-10 text-sm border border-slate-400 rounded-lg p-1 text-slate-700 hover:border-slate-700"
                    placeholder="54 3408 670000"
                    value={valuePhone}
                    type="number"
                    maxLength={12}
                    onChange={(e) => {
                      const inputValue = e.target.value;
                      if (inputValue.length <= 12) {
                        setValuePhone(inputValue);
                      }
                    }}
                  />
                </div>
                <div className="w-1/2 flex items-center justify-center">
                  <button
                    className="w-32 h-10 text-sm rounded-lg bg-sky-600 text-sky-100 shadow-md hover:bg-sky-400"
                    disabled={!valuePhone}
                    onClick={handleClickUpdatePhone}
                  >
                    Actualizar
                  </button>
                </div>
              </CardNotification>
            )}
            {notif === "saldo" && (
              <CardNotification description={notificationsText.saldo}>
                <div className="w-1/2 text-center ">{`$ ${
                  user?.saldo || 0
                }`}</div>
                <div
                  className={`w-1/2 text-center text-xs sm:text-sm ${
                    textRed ? "text-red-500" : "text-slate-600"
                  }`}
                >
                  {venceTexto}
                </div>
              </CardNotification>
            )}
          </div>
        ))
      ) : (
        <div className="mt-8 flex items-center justify-center">
          <MessageComponent message={"No hay notificaciones"} type={"info"} />
        </div>
      )}
    </div>
  );
}

export default PageNotifications;
