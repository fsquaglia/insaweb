import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendVerificationEmail = async (email, token) => {
  const verificationLink = `https://iharaylondon.com.ar/verify?token=${token}`;

  const mailOptions = {
    from: "no-reply@iharaylondon.com",
    to: email,
    subject: "Verifica tu cuenta",
    html: `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
           <a href="${verificationLink}">Verificar cuenta</a>`,
  };

  await transporter.sendMail(mailOptions);
};
