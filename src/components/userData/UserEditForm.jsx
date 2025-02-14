"use client";
import { useState, useEffect, useRef } from "react";
import InputCustom from "@/ui/InputCustom";
import SwitchText from "@/ui/SwitchText";
import ButtonDashboard from "@/ui/ButtonDashboard";
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";
import {
  addEmailPromotional,
  addEventToHistory,
  updateDocInCollection,
} from "@/utils/firebase/fetchFirebase";
import { Timestamp } from "firebase/firestore";
import LoadingDiv from "@/ui/LoadingDiv";
import { BsQuestionCircleFill, BsFillCheckCircleFill } from "react-icons/bs";
import { setImageStorage } from "@/utils/firebase/fetchFirebase";
import { imgSizing } from "@/utils/SettingSizing";
import validateImage from "@/utils/ImageValidator";
import Image from "next/image";
import MessageComponent from "@/ui/MessageComponent";
import { revalidateSomePath } from "@/utils/actions/actions";

// Convertir la fecha de Timestamp al formato deseado
const formatDate = (date) => {
  if (!date) return "";
  const mlSeconds = Math.trunc(date.seconds) * 1000;
  return new Date(mlSeconds).toISOString().split("T")[0];
};

function UserEditForm({ userData }) {
  const [user, setUser] = useState({});
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const fileInputRef = useRef(null);
  const {
    minWidthAccepted,
    maxWidthAccepted,
    minHeightAccepted,
    maxHeigthAccepted,
    minSizeKBaccepted,
    maxSizeKBaccepted,
  } = imgSizing.profileUser;

  useEffect(() => {
    const formattedDate = userData?.fechaNacimiento
      ? formatDate(userData.fechaNacimiento)
      : "";
    setUser({ ...userData, fechaNacimiento: formattedDate });
    setLoading(false);
  }, [userData]);

  if (status === "loading" || loading) {
    return <LoadingDiv />;
  }
  //if (status === "unauthenticated" || session?.user?.role !== "admin") {
  if (status === "unauthenticated") {
    return (
      <MessageComponent
        message={"Debes iniciar sesión para editar un usuario"}
        type={"error"}
      />
    );
  }
  //handle de los eventos onChange de los inputs
  const onChangeValue = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  //handle del Switch rol user/admin
  const onSwitchChange = () => {
    setUser({ ...user, rol: user?.rol === "user" ? "admin" : "user" });
  };
  //handle submit del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();

    //comprobar campos obligatorios
    if (
      !(
        user.nombreContacto &&
        user.celTE &&
        user.direccion &&
        user.localidad &&
        user.provincia
      )
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Algunos campos obligatorios no están completos.",
      });
      return;
    }
    //Nombre debe tener más de 3 caracteres
    if (user.nombreContacto.length < 3) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El nombre debe tener al menos 3 caracteres.",
      });
      return;
    }

    //comprobar formato celular
    if (!/^\d{12}$/.test(user.celTE)) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "El número de celular debe tener 12 dígitos (54 3408 xxxxxx).",
      });
      return;
    }
    //comprobar fecha de nacimiento
    if (
      user.fechaNacimiento &&
      !/^\d{4}-\d{2}-\d{2}$/.test(user.fechaNacimiento)
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "La fecha de nacimiento debe tener el formato AAAA-MM-DD.",
      });
      return;
    }

    // Convertir fecha de nacimiento a Timestamp de Firestore
    let date = "";
    if (user.fechaNacimiento) {
      date = new Date(user.fechaNacimiento);
      date = Timestamp.fromDate(date);
    }

    try {
      await updateDocInCollection("contactos", user.id, {
        ...user,
        fechaNacimiento: date,
      });

      //actualizar nombre en emailPromocionales
      await addEmailPromotional(user.email, user.nombreContacto);
      //agregar evento de actualización al historial
      await addEventToHistory(
        user.id,
        user.email,
        "Actualización",
        "Actualizó sus datos",
        user.id
      );

      revalidateSomePath("/dashboard/userManagement");

      Swal.fire({
        icon: "success",
        title: "Bien!",
        text: "Actualizaste tus datos. Deberás reiniciar tu sesión.",
        showConfirmButton: false,
        timer: 2000,
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al actualizar los datos del usuario.",
      });
    }
  };
  //handle cuando hago clic sobre el div o imagen del profile
  const handleImageClick = () => {
    fileInputRef.current.click();
  };
  //handle para seleccionar el archivo de imagen a modificar
  const handleFileChange = async (e) => {
    try {
      const file = e.target.files[0];
      if (!file) {
        // urlImgReturn(null);
        return;
      }

      // Verificar si la extensión del archivo es válida
      const validExtensions = ["jpg", "jpeg", "png", "webp"];
      const extension = file.name.split(".").pop().toLowerCase();
      if (
        !validExtensions.includes(extension) ||
        file.type.indexOf("image/") !== 0
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Extensión de archivo no válida o tipo de archivo incorrecto. Solo se permiten imágenes jpg, jpeg, webp y png.",
        });
        // urlImgReturn(null);
        return;
      }

      // Llama a la función de validación antes de subir la imagen
      // validamos ancho, alto y tamaño de la imagen. Si todo está bien, continua la ejecución. Si no, va al bloque catch.
      await validateImage(
        file,
        minWidthAccepted,
        maxWidthAccepted,
        minHeightAccepted,
        maxHeigthAccepted,
        minSizeKBaccepted,
        maxSizeKBaccepted
      );

      // subir la imagen al Storage de Firebase en la carpeta:...
      const folder = "users";

      const downloadURL = await setImageStorage(file, folder);
      setUser({ ...user, imagen: downloadURL });
    } catch (error) {
      console.error("Error al subir archivo: ", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al subir la imagen, intenta de nuevo.",
      });
    }
  };

  return (
    <div className="container h-full bg-gray-200 p-2 md:p-8">
      {/*SECCION PRINCIPAL DE IMAGEN Y NOMBRE*/}
      <div className="bg-white rounded-lg shadow-xl pb-8">
        {/*imagen de fondo */}
        <div className="w-full h-[250px]">
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/images%2Fprofile-background.jpg?alt=media&token=c97b083a-6396-4967-99d1-998a33a98db5"
            alt="Profile background"
            width={1000}
            height={250}
            className="w-full h-full rounded-tl-lg rounded-tr-lg object-cover"
            priority
          />
        </div>

        {/*sección datos Imagen, nombre... */}
        <div className="flex flex-col items-center -mt-20">
          {user?.imagen && (
            <div onClick={handleImageClick}>
              <Image
                src={
                  user?.imagen ||
                  "https://firebasestorage.googleapis.com/v0/b/iharalondon.appspot.com/o/images%2FUserGeneric.png?alt=media&token=46f36e6c-9009-4641-ae30-841df4a23cde"
                }
                className="w-40 h-40 border-4 border-white rounded-full object-cover cursor-pointer"
                alt={
                  `Image Profile ${user?.nombreContacto}` ||
                  "User Profile Image"
                }
                width={160}
                height={160}
                priority={true}
              />
              <input
                ref={fileInputRef}
                className="hidden"
                type="file"
                id="fileInput"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={handleFileChange}
              />
            </div>
          )}
          <div className="flex items-center space-x-2 mt-2">
            <p className="text-2xl">{user?.nombreContacto || "Anónimo"}</p>
            {user?.nombreContacto.length < 3 || !user?.usuarioVerificado ? (
              <BsQuestionCircleFill
                size={20}
                className="text-blue-400"
                title="Quizás debas verificar tu email"
              />
            ) : (
              <BsFillCheckCircleFill
                size={20}
                className="text-green-600"
                title="Usuario verificado"
              />
            )}
          </div>
          {/* <p className="text-gray-700">
            Senior Software Engineer at Tailwind CSS
          </p> */}
          <p className="text-sm text-gray-500">{`${
            user?.direccion || "Sin dirección"
          }, ${user?.localidad || "Sin Localidad"}, ${
            user?.provincia || "Sin Provincia"
          }`}</p>
          <p className="text-sm font-semibold text-gray-500">{user?.email}</p>
        </div>
        {/*seccion de botones*/}
        {/* <div className="flex-1 flex flex-col items-center lg:items-end justify-end px-8 mt-2">
          <div className="flex items-center space-x-4 mt-2">
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z"></path>
              </svg>
              <span>Connect</span>
            </button>
            <button className="flex items-center bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 rounded text-sm space-x-2 transition duration-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                  clipRule="evenodd"
                ></path>
              </svg>
              <span>Message</span>
            </button>
          </div>
        </div> */}
      </div>

      {/*SECCION INFO PERSONAL Y OTROS... */}
      <div className="my-4 flex flex-col 2xl:flex-row space-y-4 2xl:space-y-0 2xl:space-x-4">
        <div className="w-full flex flex-col ">
          {/* sección edición de info */}
          <div className="flex-1 bg-white rounded-lg shadow-xl p-8">
            <h4 className="text-xl text-gray-900 font-bold">
              Información Personal
            </h4>
            <ul className="mt-2 text-gray-700">
              <li className="flex border-y py-2">
                <div className="flex flex-row flex-wrap gap-2 items-end">
                  <span className="font-light w-40">Nombre y apellido: *</span>
                  <InputCustom
                    labelText=""
                    name={"nombreContacto"}
                    inputValue={user?.nombreContacto}
                    charLimit={25}
                    onChange={onChangeValue}
                  />
                </div>
              </li>
              <li className="flex border-b py-2">
                <div className="flex flex-row flex-wrap gap-2 items-end">
                  <span className="font-light w-40">Celular: *</span>
                  <InputCustom
                    labelText=""
                    name={"celTE"}
                    inputValue={user?.celTE}
                    charLimit={12}
                    showCharLimits={false}
                    placeHolder={"543408XXXXXX"}
                    onChange={onChangeValue}
                    inputType={"number"}
                  />
                </div>
              </li>
              <li className="flex border-b py-2">
                <div className="flex flex-row flex-wrap gap-2 items-end">
                  <span className="font-light w-40">Dirección: *</span>
                  <InputCustom
                    labelText=""
                    name={"direccion"}
                    inputValue={user?.direccion}
                    charLimit={30}
                    placeHolder={"Calle y número"}
                    onChange={onChangeValue}
                  />
                </div>
              </li>
              <li className="flex border-b py-2">
                <div className="flex flex-row flex-wrap gap-2 items-end">
                  <span className="font-light w-40">Localidad: *</span>
                  <InputCustom
                    labelText=""
                    name={"localidad"}
                    inputValue={user?.localidad}
                    charLimit={30}
                    placeHolder={"Tu localidad"}
                    onChange={onChangeValue}
                  />
                </div>
              </li>
              <li className="flex border-b py-2">
                <div className="flex flex-row flex-wrap gap-2 items-end">
                  <span className="font-light w-40">Provincia: *</span>
                  <InputCustom
                    labelText=""
                    name={"provincia"}
                    inputValue={user?.provincia}
                    charLimit={20}
                    placeHolder={"Tu provincia"}
                    onChange={onChangeValue}
                  />
                </div>
              </li>
              <li className="flex border-b py-2">
                <div className="flex flex-row flex-wrap gap-2 items-end">
                  <span className="font-light w-40">Fecha de nacimiento:</span>
                  <InputCustom
                    labelText={""}
                    name={"fechaNacimiento"}
                    inputValue={user?.fechaNacimiento || ""}
                    showCharLimits={false}
                    placeHolder={"AAAA-MM-DD"}
                    onChange={onChangeValue}
                  />
                </div>
              </li>
              <li className="flex border-b py-2">
                <div className="flex flex-row flex-wrap gap-2 items-end">
                  <span className="font-light w-40">Apodo:</span>
                  <InputCustom
                    labelText=""
                    name={"sobrenombre"}
                    inputValue={user?.sobrenombre}
                    charLimit={15}
                    placeHolder={"Simple apodo"}
                    onChange={onChangeValue}
                  />
                </div>
              </li>
              {session?.user?.role === "admin" && (
                <li className="flex flex-col gap-2 border-b py-2">
                  <div className="flex flex-col sm:flex-row gap-2 items-end">
                    <span className="font-light w-40">Rol del usuario:</span>
                    <div className="ms-4 w-48">
                      <SwitchText
                        text1={"user"}
                        text2={"admin"}
                        activeTextInitial={user?.rol}
                        onClick={onSwitchChange}
                      />
                    </div>
                  </div>
                  <div className="flex flex-row flex-wrap gap-2 items-end">
                    <span className="font-light w-40">Info privada:</span>
                    <InputCustom
                      labelText=""
                      name={"privateInfo"}
                      inputValue={user?.privateInfo || ""}
                      charLimit={30}
                      placeHolder={"Info Privada"}
                      onChange={onChangeValue}
                    />
                  </div>
                </li>
              )}

              {/* <li className="flex items-center border-b py-2 space-x-2">
                <span className="font-bold w-24">Elsewhere:</span>
                <a href="#" title="Twitter">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 333333 333333"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm90493 110539c-6654 2976-13822 4953-21307 5835 7669-4593 13533-11870 16333-20535-7168 4239-15133 7348-23574 9011-6787-7211-16426-11694-27105-11694-20504 0-37104 16610-37104 37101 0 2893 320 5722 949 8450-30852-1564-58204-16333-76513-38806-3285 5666-5022 12109-5022 18661v4c0 12866 6532 24246 16500 30882-6083-180-11804-1876-16828-4626v464c0 17993 12789 33007 29783 36400-3113 845-6400 1313-9786 1313-2398 0-4709-247-7007-665 4746 14736 18448 25478 34673 25791-12722 9967-28700 15902-46120 15902-3006 0-5935-184-8860-534 16466 10565 35972 16684 56928 16684 68271 0 105636-56577 105636-105632 0-1630-36-3209-104-4806 7251-5187 13538-11733 18514-19185l17-17-3 2z"
                      fill="#1da1f2"
                    ></path>
                  </svg>
                </a>
                <a href="#" title="LinkedIn">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 333333 333333"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                  >
                    <path
                      d="M166667 0c92048 0 166667 74619 166667 166667s-74619 166667-166667 166667S0 258715 0 166667 74619 0 166667 0zm-18220 138885h28897v14814l418 1c4024-7220 13865-14814 28538-14814 30514-1 36157 18989 36157 43691v50320l-30136 1v-44607c0-10634-221-24322-15670-24322-15691 0-18096 11575-18096 23548v45382h-30109v-94013zm-20892-26114c0 8650-7020 15670-15670 15670s-15672-7020-15672-15670 7022-15670 15672-15670 15670 7020 15670 15670zm-31342 26114h31342v94013H96213v-94013z"
                      fill="#0077b5"
                    ></path>
                  </svg>
                </a>
                <a href="#" title="Github">
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="0"
                    height="0"
                    shapeRendering="geometricPrecision"
                    textRendering="geometricPrecision"
                    imageRendering="optimizeQuality"
                    fillRule="evenodd"
                    clipRule="evenodd"
                    viewBox="0 0 640 640"
                  >
                    <path d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"></path>
                  </svg>
                </a>
              </li> */}
            </ul>
            <div className="w-fit mx-auto">
              <ButtonDashboard
                textButton={"Actualizar"}
                onclick={handleSubmit}
              />
            </div>
            <span className="text-sm mx-auto my-2">
              * Indica campos obligatorios
            </span>
          </div>
          {/*seccion Actividad */}
          <div className="flex-1 bg-white rounded-lg shadow-xl mt-4 p-8">
            <h4 className="text-xl text-gray-900 font-bold">Activity log</h4>
            <div className="relative px-4">
              <div className="absolute h-full border border-dashed border-opacity-20 border-secondary"></div>

              <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">Profile informations changed.</p>
                  <p className="text-xs text-gray-500">3 min ago</p>
                </div>
              </div>

              <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">
                    Connected with{" "}
                    <a href="#" className="text-blue-600 font-bold">
                      Colby Covington
                    </a>
                    .
                  </p>
                  <p className="text-xs text-gray-500">15 min ago</p>
                </div>
              </div>

              <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">
                    Invoice{" "}
                    <a href="#" className="text-blue-600 font-bold">
                      #4563
                    </a>{" "}
                    was created.
                  </p>
                  <p className="text-xs text-gray-500">57 min ago</p>
                </div>
              </div>
              <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">
                    Message received from{" "}
                    <a href="#" className="text-blue-600 font-bold">
                      Cecilia Hendric
                    </a>
                    .
                  </p>
                  <p className="text-xs text-gray-500">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">
                    New order received{" "}
                    <a href="#" className="text-blue-600 font-bold">
                      #OR9653
                    </a>
                    .
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>

              <div className="flex items-center w-full my-6 -ml-1.5">
                <div className="w-1/12 z-10">
                  <div className="w-3.5 h-3.5 bg-blue-600 rounded-full"></div>
                </div>
                <div className="w-11/12">
                  <p className="text-sm">
                    Message received from{" "}
                    <a href="#" className="text-blue-600 font-bold">
                      Jane Stillman
                    </a>
                    .
                  </p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserEditForm;
