export default function CardCarousel({ photo }) {
  return (
    <div className="h-full w-[200px] m-2 flex-shrink-0">
      <div className="overflow-hidden my-4 relative h-[160px]">
        <img
          src={photo}
          alt="Repuesto maquinaria"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
