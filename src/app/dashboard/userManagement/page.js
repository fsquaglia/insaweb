import UserCard from "./UserCard";
import MessageComponent from "@/ui/MessageComponent";

async function page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let users = [];
  let allUsers = [];

  try {
    const response = await fetch(`${apiUrl}/api/users/balance`, {
      next: { revalidate: 0 },
    });
    if (!response.ok) {
      throw new Error("Fallo en fetch users");
    }
    users = await response.json();

    //!verificar esto que sigue porque traerá todos los documentos de la colección
    const responseAllUsers = await fetch(`${apiUrl}/api/users/allUsers`, {
      next: { revalidate: 0 },
    });
    if (!responseAllUsers.ok) {
      throw new Error("Fallo en fetch all users");
    }
    allUsers = await responseAllUsers.json();
  } catch (error) {
    console.error("Error solicitando users:", error.message, error);
    return <div>Error loading users.</div>;
  }
  return (
    <div className="flex flex-col justify-center w-full text-center">
      <div className="bg-gray-50 py-4">
        <SectionComponent
          title={"Saldos de usuarios"}
          users={users}
          isBalance={true}
        />
      </div>

      <div className="py-4">
        <SectionComponent
          title={"Cuentas de usuarios"}
          users={allUsers}
          isBalance={false}
        />
      </div>
    </div>
  );
}

function SectionComponent({ title, users, isBalance }) {
  return (
    <div className="flex flex-col justify-center w-full text-center my-2">
      <h2 className="text-lg text-slate-600 my-2">{title}</h2>

      {users && users.length > 0 ? (
        users.map((user, item) => (
          <div
            key={user.id}
            className="flex flex-col justify-center w-full text-center"
          >
            <UserCard item={item} user={user} isBalance={isBalance} />
          </div>
        ))
      ) : (
        <div className="flex flex-col items-center justify-center w-full text-center my-2">
          <MessageComponent
            message="No se encontraron datos para mostrar."
            type="info"
          />
        </div>
      )}
    </div>
  );
}
export default page;
