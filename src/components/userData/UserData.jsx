"use client";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { GrLogout } from "react-icons/gr";
import CardUserSession from "@/ui/CardUserSession";
import { onClickSignOut } from "@/utils/OnSignOutEvent";
import { getConfig } from "@/utils/local_session_storage.js/local_session_storage";
import Link from "next/link";

function UserData() {
  const { data: session, status } = useSession();
  const [dataUser, setDataUser] = useState({});
  const [configurations, setConfigurations] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Establecer los datos del usuario si existe la sesión
    if (session) {
      setDataUser(session.user);

      // Si el usuario es admin, obtener la configuración
      if (session.user.role === "admin") {
        const fetchConfig = async () => {
          const config = await getConfig();
          setConfigurations(config);
        };

        fetchConfig();
      }
    }
  }, [session]);

  const onClickUserEdit = () => {
    dataUser?.role === "admin"
      ? router.push(`/dashboard/profile/${dataUser.id}/edit`)
      : router.push(`/users/profile/${dataUser.id}/edit`);
  };

  return (
    <div
      className={
        dataUser?.role === "admin"
          ? "w-full flex flex-row flex-wrap items-center justify-between mx-4"
          : "flex justify-center text-center"
      }
    >
      <div className="text-slate-100 ">
        {configurations &&
          configurations?.coeficienteVenta &&
          `Coeficiente de venta: ${configurations?.coeficienteVenta}`}
      </div>

      {dataUser?.name ? (
        <div
          className={
            dataUser?.role === "admin"
              ? "flex flex-row flex-wrap items-center justify-between gap-4 m-2"
              : ""
          }
        >
          <div className="cursor-pointer" onClick={onClickUserEdit}>
            <CardUserSession
              name={dataUser.name}
              email={dataUser.email}
              image={dataUser.image || null}
              role={dataUser.role || "user"}
            />
          </div>
          {/*Icono y Link a configuraciones para admin */}
          {dataUser?.role === "admin" && (
            <div>
              <Link
                className="inline-flex relative items-center group justify-end text-base font-medium leading-normal text-center align-middle cursor-pointer rounded-[.95rem] transition-colors duration-150 ease-in-out text-dark bg-transparent shadow-none border-0"
                href="/dashboard/config"
              >
                <span className="leading-none transition-colors duration-200 ease-in-out peer shrink-0 group-hover:text-primary text-secondary-dark">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                  </svg>
                </span>
              </Link>
            </div>
          )}
        </div>
      ) : (
        <div className="mx-center text-sm text-slate-200 my-4">
          Cargando datos del usuario...
        </div>
      )}
    </div>
  );
}

export default UserData;
