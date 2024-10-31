"use client";

import { useEffect, useState } from "react";
import PendingCard from "./PendingCard";
import { useSession } from "next-auth/react";
import LoadingDiv from "@/ui/LoadingDiv";
import MessageComponent from "@/ui/MessageComponent";

export default function PageUsers() {
  const { data: session, status } = useSession();
  // const [dataSession, setDataSession] = useState({});
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUser = async (userId) => {
    try {
      const response = await fetch(`/api/users/userById/${userId}`, {});
      if (!response.ok) throw new Error("No encontramos el usuario");
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

  if (status === "loading") {
    return <LoadingDiv />;
  }

  if (error) {
    return <MessageComponent message={error} type={"error"} />;
  }

  if (loading) {
    return <LoadingDiv />;
  }

  return (
    <div>
      <PendingCard
        amount={user?.saldo || 0}
        dataExpire={user?.fechaVenceSaldo || null}
      />
    </div>
  );
}
