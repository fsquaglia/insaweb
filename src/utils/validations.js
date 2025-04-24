export const validateEmail = (email) => {
  if (!email.trim()) {
    return { isValid: false, errorMsg: "El email no puede estar vacío" };
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return { isValid: false, errorMsg: "Por favor ingresa un email válido" };
  }

  return { isValid: true, errorMsg: "" };
};

// Fn validación de passwords
export const validatePassword = (password, confirmPassword) => {
  if (!password.trim() || !confirmPassword.trim()) {
    return {
      isValid: false,
      errorMsg: "Las contraseñas no pueden estar vacías",
    };
  }
  if (password.length < 6) {
    return {
      isValid: false,
      errorMsg: "La contraseña debe tener al menos 6 caracteres",
    };
  }
  if (password !== confirmPassword) {
    return {
      isValid: false,
      errorMsg: "Las contraseñas no coinciden.",
    };
  }
  return { isValid: true, errorMsg: "" };
};

// Fn validación de nombre de usuario
export const validateName = (name) => {
  if (!name.trim()) {
    return {
      isValid: false,
      errorMsg: "El nombre de usuario no puede estar vacío.",
    };
  }
  if (name.length < 3) {
    return {
      isValid: false,
      errorMsg: "El nombre de usuario debe tener al menos 3 caracteres.",
    };
  }
  return { isValid: true, errorMsg: "" };
};
