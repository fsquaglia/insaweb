import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import {
  getUserByEmail,
  updateDocInCollection,
} from "@/utils/firebase/fetchFirebase";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.json(
      { error: "No se proporcionó un token." },
      { status: 400 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // actualizar la BDD para marcar el usuario como verificado
    const users = await getUserByEmail(decoded.email);
    if (users.length === 0) {
      console.log("No se encontró ningún usuario con ese email.");
      return;
    }
    for (const user of users) {
      await updateDocInCollection("contactos", user.id, {
        usuarioVerificado: true,
      });
      console.log(
        `Usuario ${decoded.email} con ID ${user.id} verificado correctamente.`
      );
    }

    return NextResponse.json({
      message: "Tu email fue validado.",
      email: decoded.email,
    });
  } catch (error) {
    let errorMessage = "Error desconocido al verificar el token.";
    let statusCode = 500;

    if (error.name === "TokenExpiredError") {
      errorMessage = "El token ha expirado. Solicita uno nuevo.";
      statusCode = 401; // No autorizado
    } else if (error.name === "JsonWebTokenError") {
      errorMessage = "Token inválido. Verifica que el enlace sea correcto.";
      statusCode = 400; // Solicitud incorrecta
    }

    // console.error("Error al verificar token:", errorMessage);

    return NextResponse.json({ error: errorMessage }, { status: statusCode });
  }
}
