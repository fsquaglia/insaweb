"use client";
import UserEditForm from "@/components/userData/UserEditForm";
import { useSession } from "next-auth/react";
import MessageComponent from "@/ui/MessageComponent";
import { useEffect, useState } from "react";
import LoadingDiv from "@/ui/LoadingDiv";

export default function PageUserEdit({ params }) {
  const { data: session, status } = useSession();
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const response = await fetch(`/api/users/userById/${params.userId}`, {
        cache: "no-store",
      });
      if (!response.ok) throw new Error("Failed to fetch user");
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error obteniendo el usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return; // Espera a que se complete la carga de la sesión
    if (status === "unauthenticated") {
      setError("Debes iniciar sesión para editar un usuario");
      setLoading(false); // Deja de cargar si el usuario no está autenticado
      return;
    }
    if (status === "authenticated") {
      if (
        session?.user?.role !== "admin" &&
        session?.user?.id !== params.userId
      ) {
        setError("No tienes permiso para editar este usuario");
        setLoading(false);
      } else {
        fetchUser();
      }
    }
  }, [session, params.userId]);

  if (loading) return <LoadingDiv />;
  if (error) {
    return (
      <div className="flex justify-center text-center my-8">
        <MessageComponent message={error} type={"error"} />
      </div>
    );
  }

  return <UserEditForm userData={user} />;
}
