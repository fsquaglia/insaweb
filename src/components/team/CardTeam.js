export default function CardTeam({ imageSRC, name, text, description }) {
  return (
    <div className="w-[250px] bg-slate-100 mx-10 p-8 flex flex-col items-center">
      <div className="mb-4">
        {imageSRC && (
          <img
            className="object-center object-cover rounded-full h-36 w-36"
            src={imageSRC}
            alt="photo"
          />
        )}
      </div>
      <div className="text-center">
        <p className="text-xl text-gray-700 font-bold mb-2">{name}</p>
        <p className="text-base text-gray-400 font-normal">{text}</p>
        <p className="text-base text-gray-400 font-normal italic">
          {description}
        </p>
      </div>
    </div>
  );
}
