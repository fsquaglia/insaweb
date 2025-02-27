// ícono circular
export default function DivCircle({ children, className = "" }) {
  return (
    <div
      className={`flex items-center justify-center size-9 rounded-full shrink-0 cursor-pointer text-gray-300 ${className}`}
    >
      {children}
    </div>
  );
}
