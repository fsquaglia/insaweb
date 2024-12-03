import UserCard from "./UserCard";

async function page() {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let users = [];

  try {
    const response = await fetch(`${apiUrl}/api/users/balance`, {
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error("Fallo en fetch users");
    }

    users = await response.json();
  } catch (error) {
    console.error("Error solicitando users:", error.message, error);
    return <div>Error loading users.</div>;
  }
  return (
    <div className="flex flex-col justify-center w-full text-center">
      <h2 className="text-lg font-semibold text-slate-800 my-2">
        Cuentas y saldos de usuarios
      </h2>

      {users && users.length > 0 ? (
        users.map((user, item) => (
          <div
            key={user.id}
            className="flex flex-col justify-center w-full text-center my-2"
          >
            <UserCard item={item} user={user} />
          </div>
        ))
      ) : (
        <div className="flex flex-col justify-center w-full text-center my-2">
          <h2 className="text-lg font-semibold text-slate-800 my-2">
            No hay usuarios para mostrar
          </h2>
        </div>
      )}
    </div>
  );
}

export default page;
