import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateVerificationToken } from "@/utils/generateVerificationToken";

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

    // Generar token
    const token = generateVerificationToken(email);

    let subject, text, html;

    if (emailType === "password-reset") {
      subject = "Restablece tu contraseña";
      text = `Haz clic en el siguiente enlace para restablecer tu contraseña: https://iharaylondon.com.ar/reset-password?token=${token}`;
      html = `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
             <a href="https://iharaylondon.com.ar/reset-password?token=${token}" target="_blank">Restablecer contraseña</a>`;
    } else {
      subject = "Verifica tu cuenta";
      text = `Haz clic en el siguiente enlace para verificar tu cuenta: https://iharaylondon.com.ar/verify-email?token=${token}`;
      html = `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
             <a href="https://iharaylondon.com.ar/verify-email?token=${token}" target="_blank">Verificar cuenta</a>`;
    }

    // Configurar transporte de nodemailer
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
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject,
    //   text,
    //   html,
    // });

    return NextResponse.json({ message: token });
    return NextResponse.json({ message: "Correo enviado" });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Error enviando el correo" },
      { status: 500 }
    );
  }
}
