"use client";
import { useEffect, useState } from "react";
import LoadingDiv from "@/ui/LoadingDiv";
import MessageComponent from "@/ui/MessageComponent";
import { useSession } from "next-auth/react";

function PageActivity() {
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `/api/users/activityById/${session?.user?.id}`
        );
        if (!response.ok) throw new Error("Error al obtener los eventos");
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error("Error al obtener los eventos:", error);
        setError("Error al obtener los eventos");
      } finally {
        setLoading(false);
      }
    };
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setError("Debes iniciar sesión para ver tu actividad");
      return;
    }
    if (status === "authenticated") {
      fetchEvents();
    }
  }, [session]);
  if (loading) return <LoadingDiv />;

  if (error) {
    return (
      <div className="flex h-full items-center justify-center mt-20">
        <MessageComponent message={error} type="error" />
      </div>
    );
  }

  return (
    <div className="container h-full w-full p-2 md:p-8">
      <div className="bg-white rounded-lg shadow-xl mt-4 p-8">
        <h4 className="text-xl text-gray-900 font-bold">
          Registro de actividad
        </h4>
        <div className="relative px-4">
          {/* esta es la línea vertical punteada */}
          <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

          {events && events.length > 0 ? (
            events.map((event, index) => (
              <div
                key={index}
                className="flex items-center w-full my-6 -ml-1.5"
              >
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">
                    {event.detalles || "Sin información"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {event.fecha
                      ? `${event.fecha.slice(11, 19)} - ${event.fecha.slice(
                          8,
                          10
                        )}/${event.fecha.slice(5, 7)}/${event.fecha.slice(
                          0,
                          4
                        )}`
                      : "Sin información"}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center mx-auto mt-12">
              Aún no hay eventos registrados
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PageActivity;
