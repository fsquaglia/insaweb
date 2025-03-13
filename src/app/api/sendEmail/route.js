import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateVerificationToken } from "@/utils/generateVerificationToken";
import { getEmailTemplate } from "@/utils/emailTemplate";

export async function POST(req) {
  if (req.method !== "POST") {
    return NextResponse.json({ error: "Método no permitido" }, { status: 405 });
  }

  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      );
    }

    // Leer tipo de email desde headers
    const emailType = req.headers.get("x-email-type");

    // Definir la URL base según el entorno
    const baseURL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://iharaylondon.com.ar";

    // Generar token
    const token = generateVerificationToken(email);

    // Obtener el template del email
    const { subject, text, html } = getEmailTemplate(emailType, token, baseURL);

    // Configurar transporte de nodemailer
    //! OJO rever cómo hacer el transporter porque en producción no hay que usar tls
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Enviar email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text,
      html,
    });

    return NextResponse.json({ message: "Correo enviado" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error enviando el correo" },
      { status: 500 }
    );
  }
}
