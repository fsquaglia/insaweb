import CardTeam from "./CardTeam";
import Header from "../../ui/HeaderTitle";

export default function Team({ team }) {
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
          imageSCR={team.she.imagen}
          name={team.she.nombre}
          text={team.she.titulo}
          description={team.she.descripcion}
        />
        <CardTeam
          imageSCR={team.he.imagen}
          name={team.he.nombre}
          text={team.he.titulo}
          description={team.he.descripcion}
        />
      </div>
    </section>
  );
}
