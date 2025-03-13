export function getEmailTemplate(emailType, token, baseURL) {
  let subject, text, html;

  if (emailType === "reset-password") {
    const resetPasswordURL = `${baseURL}/reset-password?token=${token}`;
    subject = "Restablece tu contraseña";
    text = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetPasswordURL}`;
    html = `<p>Haz clic en el siguiente enlace para restablecer tu contraseña:</p>
           <a href="${resetPasswordURL}" target="_blank">Restablecer contraseña</a>`;
  } else {
    const verificationURL = `${baseURL}/verify-email?token=${token}`;
    subject = "Verifica tu cuenta";
    text = `Haz clic en el siguiente enlace para verificar tu cuenta: ${verificationURL}`;
    html = `<p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
           <a href="${verificationURL}" target="_blank">Verificar cuenta</a>`;
  }

  return { subject, text, html };
}
