export default function HeaderTitle({ titleText }) {
  return (
    <div className="flex w-full justify-center text-red-600">
      <p className="font-bold text-red text-4xl pb-10 mb-20">{titleText}</p>
    </div>
  );
}
