import CardTeam from "./CardTeam";
import Header from "../../ui/HeaderTitle";

export default function Team({
  team = {
    data: {
      descripcion:
        "En nuestra tienda, la calidad y la atención personalizada son nuestra prioridad. Somos un equipo apasionado,...",
      titulo: "El equipo",
    },
    he: {
      descripcion: "Para completar el equipo",
      imagen: "",
      nombre: "Fer",
      titulo: "He/Él",
    },
    she: {
      descripcion: "Nacida para la moda",
      imagen: "",
      nombre: "Aye",
      titulo: "She/Ella",
    },
  },
}) {
  return (
    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
      <div className="text-center pb-12">
        <Header titleText={team.data.titulo} />
        <p className="max-w-xl mx-auto text-gray-800">
          {team.data.descripcion}
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-1">
        <CardTeam
          imageSRC={team.she.imagen}
          name={team.she.nombre}
          text={team.she.titulo}
          description={team.she.descripcion}
        />
        <CardTeam
          imageSRC={team.he.imagen}
          name={team.he.nombre}
          text={team.he.titulo}
          description={team.he.descripcion}
        />
      </div>
    </section>
  );
}
