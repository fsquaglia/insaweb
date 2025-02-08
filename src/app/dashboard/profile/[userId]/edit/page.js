import UserEditForm from "@/components/userData/UserEditForm";

async function page({ params }) {
  // Tomamos la URL base desde las variables de entorno
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const userID = params.userId;
  let user = null;
  try {
    const response = await fetch(`${apiUrl}/api/users/userById/${userID}`, {
      method: "GET",
      headers: {
        "x-full-data": "true",
        "x-no-cache": "true",
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch user");
    user = await response.json();
  } catch (error) {
    console.error("Error fetching user:", error);
    return (
      <div className="flex justify-center text-center">
        Error obteniendo el usuario.
      </div>
    );
  }

  return <UserEditForm userData={user} />;
}

export default page;
