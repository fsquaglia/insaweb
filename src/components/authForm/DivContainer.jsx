import { signIn } from "next-auth/react";
import Link from "next/link";

function DivContainer({ children, typeForm, handleSubmit, error }) {
  let title = "",
    dataLine = "",
    textButton = "",
    textGoogle = "";

  switch (typeForm) {
    case "login":
      title = "Inicia sesión";
      dataLine = "o con tu";
      textButton = "Acceder";
      textGoogle = "Accede con Google";
      break;
    case "register":
      title = "Regístrate";
      dataLine = "o con tus credenciales";
      textButton = "Registrarse";
      textGoogle = "Registro con Google";
      break;
    case "forgot":
      title = "Recupera tu contraseña";
      dataLine = "Ingresa tu email";
      textButton = "Enviar";
      break;
    case "resetPass":
      title = "Restablece tu contraseña";
      dataLine = "Ingresa tu nueva contraseña";
      textButton = "Restablecer";
      break;
    case "changePass":
      title = "Cambia tu contraseña";
      dataLine = "Ingresa los datos";
      textButton = "Cambiar";
      break;
    default:
      break;
  }

  return (
    <div className="mx-2">
      <div className="flex items-center justify-center max-w-sm sm:max-w-md h-full my-2 sm:my-4 border rounded-3xl px-4 py-2 sm:py-4 bg-white mx-auto">
        <form
          className="flex flex-col w-full h-full text-center text-slate-500 antialiased"
          onSubmit={handleSubmit}
        >
          {/* Título */}
          <h3 className="sm:my-4 text-2xl sm:text-3xl font-bold">
            {title || ""}
          </h3>
          {/* Botón de Google */}
          {(typeForm === "login" || typeForm === "register") && (
            <DivGoogle textGoogle={textGoogle} />
          )}

          {typeForm === "forgot" && <DivForgotPass element={"up"} />}
          {/* Línea horizontal con texto */}
          <div className="flex items-center my-2">
            <hr className="h-0 border-b border-solid grow" />
            <p className="mx-4 text-xs sm:text-normal">{dataLine || ""}</p>
            <hr className="h-0 border-b border-solid grow" />
          </div>
          {/* Contenido variable */}
          <div>{children}</div>

          {/* Textos de registro, inicio de sesión, etc */}
          <div className="mx-2">
            {typeForm === "login" && <DivLogin />}
            {typeForm === "register" && <DivRegister />}
            {typeForm === "resetPass" && <DivForgotPassReceiver />}
            {typeForm === "forgot" && <DivForgotPass element={"down"} />}
          </div>

          {/* Errores */}
          <div>
            {error && (
              <p className="text-red-500 my-2 text-xs sm:text-sm">{error}</p>
            )}
          </div>
          {/* Botón inferior */}
          <button
            className="border w-full px-6 py-4 sm:py-5 sm:mb-5 text-sm font-bold leading-none text-white transition duration-300 rounded-full sm:rounded-2xl hover:bg-blue-600 focus:ring-4 focus:ring-blue-100 bg-blue-500"
            type="submit"
          >
            {textButton || "Aplicar"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default DivContainer;

function DivLogin() {
  return (
    <div className="flex flex-row flex-wrap justify-between mb-4 text-xs sm:text-sm font-medium">
      <Link href={"/auth/register"}>¿Eres nuevo? Regístrate</Link>
      <Link href={"/auth/resetPass"}>¿Olvidaste tu contraseña?</Link>
    </div>
  );
}

function DivRegister() {
  return (
    <div className="flex flex-row flex-wrap justify-end mb-4 text-xs sm:text-sm font-medium gap-1">
      <span>¿Ya estás registrado? </span>
      <Link href={"/auth/login"}>Inicia sesión</Link>
    </div>
  );
}

function DivGoogle({ textGoogle }) {
  return (
    <div
      className="flex items-center justify-center w-full py-2 sm:py-4 my-4 text-sm font-medium transition duration-300 rounded-full sm:rounded-2xl bg-gray-100 hover:bg-blue-600 focus:ring-4 focus:ring-gray-300 border cursor-pointer hover:text-white"
      onClick={() => signIn("google")}
    >
      <img
        className="h-5 mr-2"
        src="https://raw.githubusercontent.com/Loopple/loopple-public-assets/main/motion-tailwind/img/logos/logo-google.png"
        alt="Google logo"
      />
      {textGoogle || "Google"}
    </div>
  );
}

function DivForgotPass({ element }) {
  return (
    <div className="flex flex-row flex-wrap justify-between my-4 text-xs sm:text-sm font-medium">
      {element === "up" && (
        <p>
          Si el correo ingresado está registrado te enviaremos un enlace para
          restablecer tu contraseña. Recuerda revisar tu bandeja de spam.
        </p>
      )}
      {element === "down" && (
        <>
          <Link href={"/auth/login"}>Inicia sesión</Link>
          <Link href={"/auth/register"}>Regístrate</Link>
        </>
      )}
    </div>
  );
}

function DivForgotPassReceiver() {
  return (
    <div className="flex flex-row flex-wrap justify-between my-4 text-xs sm:text-sm font-medium">
      <p>Seis caracteres como mínimo, distingue mayúsculas de minúsculas.</p>
    </div>
  );
}
