import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateVerificationToken } from "@/utils/generateVerificationToken";

export async function POST(req) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json(
        { error: "Email es requerido" },
        { status: 400 }
      );
    }

    // Generar token
    const token = generateVerificationToken(email);

    // Configurar transporte de nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      tls: {
        rejectUnauthorized: false, // ⚠️ Evita la verificación del certificado
      },
    });

    // Enviar email
    // await transporter.sendMail({
    //   from: process.env.EMAIL_USER,
    //   to: email,
    //   subject: "Verifica tu cuenta",
    //   text: `Haz clic en el siguiente enlace para verificar tu cuenta: https://iharaylondon.com.ar/verify-email?token=${token}`,
    //   html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
    //      <a href="https://iharaylondon.com.ar/verify-email?token=${token}" target="_blank">Verificar cuenta</a>`,
    // });

    return NextResponse.json({ message: "Correo enviado" });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error enviando el correo" },
      { status: 500 }
    );
  }
}
