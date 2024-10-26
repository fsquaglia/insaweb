import UserCard from "./UserCard";

async function page() {
  // Tomamos la URL base desde las variables de entorno
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    // Hacemos la petición a la API
    const response = await fetch(`${apiUrl}/api/users/balance`);

    // Verificamos si la respuesta es válida
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    // Parseamos la respuesta
    const users = await response.json();

    // Renderizamos los datos de los usuarios
    return (
      <div className="flex flex-col justify-center w-full text-center">
        <h2 className="text-lg font-semibold text-slate-800 my-2">
          Cuentas y saldos de usuarios
        </h2>

        {users?.map((user, item) => (
          <div
            key={user.id}
            className="flex flex-col justify-center w-full text-center my-2"
          >
            <UserCard item={item} user={user} />
          </div>
        ))}
      </div>
    );
  } catch (error) {
    // Manejo de errores
    console.error("Error fetching users:", error);
    return <div>Error loading users.</div>;
  }
}

export default page;
