export default function ButtonDashboard({ onclick }) {
  return (
    <button
      className="mt-6 block w-full select-none rounded-lg bg-blue-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-500/20 transition-all hover:shadow-lg hover:shadow-blue-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button"
      data-ripple-light="true"
      onClick={onclick}
    >
      Actualizar
    </button>
  );
}
