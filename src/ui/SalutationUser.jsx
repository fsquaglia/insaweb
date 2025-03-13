"use client";

import { useSession } from "next-auth/react";

function SalutationUser() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p className="animation-pulse">...</p>;
  }

  if (status !== "authenticated" || !session?.user) {
    return <p className="animation-pulse">No has iniciado sesión</p>;
  }

  return <p>¡Hola, {session.user.name || "Anónimo"}!</p>;
}

export default SalutationUser;
