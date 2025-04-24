export default function HeaderTitle({ titleText }) {
  return (
    <div className="flex w-full flex flex-col items-center justify-center">
      <h3 className="font-bold text-neutral-700 text-4xl mb-4">{titleText}</h3>
      <div className="w-28 h-1 bg-blue-400 mb-4"></div>
    </div>
  );
}
