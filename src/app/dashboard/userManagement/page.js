import MessageComponent from "@/ui/MessageComponent";
import Users from "./Users";

export default async function page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let allUsers = [];

  try {
    //! OJO verificar esto que sigue porque traerá todos los documentos de la colección, puede paginarse?
    const responseAllUsers = await fetch(`${apiUrl}/api/users/allUsers`);
    if (!responseAllUsers.ok) {
      throw new Error("Fallo en fetch all users");
    }
    allUsers = await responseAllUsers.json();
  } catch (error) {
    console.error("Error solicitando users:", error.message, error);
    return (
      <div className="flex items-center justify-center">
        <MessageComponent
          message={"Error mostrando usuarios."}
          type={"error"}
        />
      </div>
    );
  }
  return (
    <div className="flex flex-col justify-center w-full text-center">
      <h2 className="text-slate-500 my-4 font-semibold">
        Gestión de usuarios y cuentas
      </h2>

      <div className="flex flex-col justify-center w-full text-center my-2">
        <Users allUsers={allUsers} />
      </div>
    </div>
  );
}
