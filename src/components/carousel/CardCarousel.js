export default function CardCarousel({ photo }) {
  return (
    <div className=" w-[200px] h-[200px] m-2 flex-shrink-0 ">
      <div className="overflow-hidden my-4 relative">
        <img
          src={photo}
          alt="Repuesto maquinaria"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
