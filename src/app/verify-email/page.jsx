"use client";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { Puff } from "react-loader-spinner";
import { FaHome } from "react-icons/fa";
import { Suspense } from "react";
import LoadingDiv from "@/ui/LoadingDiv";

function VerifyEmailPageSection() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const router = useRouter();
  const [message, setMessage] = useState("Verificando...");
  const [loading, setLoading] = useState(true);

  // Add a ref to track if the verification has been done
  const verificationDone = useRef(false);

  useEffect(() => {
    if (!token || verificationDone.current) return;

    const verifyEmail = async () => {
      // Set the ref to true immediately to prevent multiple executions
      verificationDone.current = true;

      try {
        const response = await fetch(`/api/verifyemail?token=${token}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Error verificando el email");
        }
        setMessage(data.message || "Verificación exitosa");
      } catch (error) {
        console.error("Error verificando el email: ", error);
        setMessage(error.message);
      }

      setTimeout(() => setLoading(false), 2000); // Mantiene el loader visible por al menos 2s
    };

    verifyEmail();
  }, [token]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center gap-6">
      {loading ? (
        <>
          <Puff
            height="40"
            width="40"
            color="#4fa94d"
            ariaLabel="puff-loading"
          />
          <span className="text-lg text-gray-600">{message}</span>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold text-gray-700">{message}</h2>
        </>
      )}

      {/* Botón siempre visible */}
      {message != "Verificando..." && (
        <button
          onClick={() => router.push("/")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
        >
          <FaHome size={20} />
          Volver al inicio
        </button>
      )}
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<LoadingDiv />}>
      <VerifyEmailPageSection />
    </Suspense>
  );
}
