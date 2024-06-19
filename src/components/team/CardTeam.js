export default function CardTeam({ imageSCR, name, text, description }) {
  return (
    <div className="w-[250px] bg-slate-100 mx-10 p-8 flex flex-col items-center">
      <div className="mb-4">
        {imageSCR && (
          <img
            className="object-center object-cover rounded-full h-36 w-36"
            src={imageSCR}
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
