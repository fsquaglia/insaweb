"use client";
import bcrypt from "bcryptjs";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  addNewContactFirestore,
  getUserByEmail,
} from "@/utils/firebase/fetchFirebase";
import { newUserDataInitial } from "@/utils/SettingInitialData";
import InputSection from "./InputSection";
import DivContainer from "./DivContainer";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "@/utils/validations";

function RegisterForm() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState(null);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Limpiar errores anteriores

    // Validaciones, si hay un error la Fn retorna un objeto con false y el mensaje de error
    const { isValid, errorMsg } = validateName(values.name);
    if (!isValid) {
      setError(errorMsg);
      return;
    }

    const { isValid: isValidEmail, errorMsg: errorMsgEmail } = validateEmail(
      values.email
    );
    if (!isValidEmail) {
      setError(errorMsgEmail);
      return;
    }

    const { isValid: isValidPass, errorMsg: errorMsgPass } = validatePassword(
      values.password,
      values.confirmPassword
    );
    if (!isValidPass) {
      setError(errorMsgPass);
      return;
    }

    setError(""); // Limpiar el error si es válido

    try {
      // Verificar si el email ya está registrado
      const existingUser = await getUserByEmail(values.email);
      if (existingUser.length > 0) {
        setError("Este email ya está registrado");
        return;
      }

      // Hashear la contraseña
      const hashedPassword = await bcrypt.hash(values.password, 10);

      // Crear nuevo usuario en Firestore
      const newUser = newUserDataInitial(
        values.name,
        values.email,
        hashedPassword,
        "user",
        "",
        false
      );

      await addNewContactFirestore(newUser);

      // enviamos el email de validación
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: values.email }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.error);
        return;
      }

      // Intentar loguear al usuario automáticamente después del registro
      const res = await signIn("credentials", {
        redirect: false,
        email: values.email,
        password: values.password, // Usamos la contraseña sin hash para el login
      });

      if (res.error) {
        setError("Error logueando usuario: ", res.error);
      } else {
        // Redirigir al users si el registro y login son exitosos
        router.push("/users");
      }
    } catch (error) {
      console.error("Error durante el registro:", error);
      setError("Ocurrió un error durante el registro. Inténtalo más tarde.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return (
    <DivContainer
      typeForm={"register"}
      handleSubmit={handleSubmit}
      error={error}
    >
      {/*NOMBRE Y APELLIDO*/}
      <InputSection
        label={"Nombre y Apellido"}
        name={"name"}
        value={values.name}
        showEye={false}
        placeholder={"Juan Perez"}
        onChange={handleChange}
      />

      {/*EMAIL*/}
      <InputSection
        label={"Email"}
        name={"email"}
        value={values.email}
        showEye={false}
        placeholder={"mail@loopple.com"}
        onChange={handleChange}
      />

      {/*CONTRASEÑA*/}
      <InputSection
        label={"Contraseña"}
        name={"password"}
        value={values.password}
        showEye={true}
        placeholder={"Ingresa una contraseña"}
        onChange={handleChange}
      />

      {/*Confirmar CONTRASEÑA */}
      <InputSection
        label={"Repite la contraseña"}
        name={"confirmPassword"}
        value={values.confirmPassword}
        showEye={true}
        placeholder={"Repite la contraseña"}
        onChange={handleChange}
      />
    </DivContainer>
  );
}

export default RegisterForm;
