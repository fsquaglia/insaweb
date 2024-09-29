import { signOut } from "next-auth/react";

export const onClickSignOut = () => {
  //los estoy eliminando de ambos (local y session) porque no sé aún con cuál me voy a quedar
  localStorage.removeItem("variations");
  localStorage.removeItem("codeProduct");
  sessionStorage.removeItem("variations");
  sessionStorage.removeItem("codeProduct");
  signOut();
};
