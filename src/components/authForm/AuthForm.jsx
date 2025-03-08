"use client";

import { signIn, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import InputSection from "./InputSection";
import DivContainer from "./DivContainer";
import { validateEmail } from "@/utils/validations";

function AuthForm() {
  const { data: session, status } = useSession();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  useEffect(() => {
    // Si ya hay una sesión activa, redirigir según el rol
    if (session) {
      if (session.user.role === "admin") {
        router.push("/dashboard");
      } else if (session.user.role === "user") {
        router.push("/users");
      }
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { isValid, errorMsg } = validateEmail(email);
    if (!isValid) {
      setError(errorMsg);
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    setError(""); // Limpiar el error si es válido

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      // Si hay un callbackUrl, redirigir allí
      if (callbackUrl) {
        if (session?.user.role === "admin") {
          // El admin puede acceder a cualquier URL
          router.push(callbackUrl);
        } else if (
          session?.user.role === "user" &&
          !callbackUrl.startsWith("/dashboard")
        ) {
          // El usuario con rol "user" puede acceder a cualquier lugar excepto el dashboard
          router.push(callbackUrl);
        } else {
          // Si no tienen permisos, redirigir a una página de error o su área permitida
          router.push("/unauthorized");
        }
      } else {
        // Comportamiento por defecto si no hay callbackUrl
        if (session?.user.role === "admin") {
          router.push("/dashboard"); // Admin puede ir al dashboard o a donde sea
        } else {
          router.push("/users"); // Usuario normal se redirige a su área
        }
      }
    }
  };

  return (
    <DivContainer typeForm={"login"} handleSubmit={handleSubmit} error={error}>
      {/*EMAIL*/}
      <InputSection
        label={"Email"}
        name={"email"}
        value={email}
        showEye={false}
        placeholder={"mail@loopple.com"}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/*CONTRASEÑA*/}
      <InputSection
        label={"Contraseña"}
        name={"password"}
        value={password}
        showEye={true}
        placeholder={"Ingresa una contraseña"}
        onChange={(e) => setPassword(e.target.value)}
      />
    </DivContainer>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div className="text-lg">Loading...</div>}>
      <AuthForm />
    </Suspense>
  );
}
// export default AuthForm;
