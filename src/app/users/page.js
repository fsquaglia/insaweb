"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import LoadingDiv from "@/ui/LoadingDiv";
import MessageComponent from "@/ui/MessageComponent";

export default function PageUsers() {
  const { data: session, status } = useSession();
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasSaldo, setHasSaldo] = useState(null);

  const fetchUser = async (userId) => {
    try {
      const cachedUser = sessionStorage.getItem("userData");
      if (cachedUser) {
        const userData = JSON.parse(cachedUser);
        const hasSaldo = userData?.saldo !== undefined && userData.saldo !== 0;
        setUser(userData);
        setHasSaldo(hasSaldo);
      } else {
        const response = await fetch(`/api/users/userById/${userId}`, {
          next: {
            revalidate: Number(process.env.NEXT_PUBLIC_REVALIDATE_LARGE),
          },
        });
        if (!response.ok) throw new Error("No encontramos el usuario");
        const data = await response.json();
        sessionStorage.setItem("userData", JSON.stringify(data));
        const hasSaldo = data?.saldo !== undefined && data.saldo !== 0;
        setUser(data);
        setHasSaldo(hasSaldo);
      }
    } catch (error) {
      console.error("Error fetching user:", error);
      setError("Error obteniendo el usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      setError("Debes iniciar sesión para editar un usuario");
      setLoading(false);
      return;
    }
    if (session?.user?.id) {
      // setDataSession(session.user);
      fetchUser(session.user.id);
    }
  }, [session?.user?.email]);

  if (status === "loading" || loading) {
    return <LoadingDiv />;
  }

  if (error) {
    return <MessageComponent message={error} type={"error"} />;
  }

  return (
    <div className="flex flex-col  w-full">
      <p>Soy panel y deben refactorizarme, por favor aguarda un tiempo... </p>
      {hasSaldo && <div className="border-b w-full"></div>}
    </div>
  );
}
