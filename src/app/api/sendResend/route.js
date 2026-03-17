import { Resend } from "resend";
import buildEmailHtml from "./buildEmailHtml";

const resend = new Resend(process.env.RESEND_API_KEY);
const EMAIL_FROM = process.env.EMAIL_FROM || "";
const EMAIL_TO = process.env.EMAIL_TO || "";

const generateContactNumber = () =>
  Math.floor(Math.random() * 1000000).toString();

export async function POST(req) {
  try {
    const { userName, userEmail, message } = await req.json();
    const contactNumber = generateContactNumber();

    const { data, error } = await resend.emails.send({
      from: EMAIL_FROM,
      to: [EMAIL_TO],
      replyTo: userEmail,
      subject: `Nueva consulta de ${userName}`,
      html: buildEmailHtml({ userName, userEmail, message, contactNumber }),
    });

    if (error) {
      console.error("Resend error:", error);
      return Response.json({ error }, { status: 500 });
    }

    return Response.json(data);
  } catch (error) {
    console.error("Error en API sendResend:", error);
    return Response.json({ error }, { status: 500 });
  }
}
