function layout({ children }) {
  return (
    <div>
      <div className="h-24"></div>
      <div className="max-w-8xl mx-auto">{children}</div>
    </div>
  );
}

export default layout;
