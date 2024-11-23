export default async function layout({ children }) {
  return (
    <div>
      <div className="h-24"></div>
      <div>{children}</div>
    </div>
  );
}
