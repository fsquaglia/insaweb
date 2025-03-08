import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");

    if (!token) {
      return NextResponse.json(
        { error: "Token no proporcionado" },
        { status: 400 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({ email: decoded.email });
  } catch (error) {
    return NextResponse.json(
      { error: "Token inválido o expirado" },
      { status: 400 }
    );
  }
}
