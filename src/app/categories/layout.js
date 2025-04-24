import React from "react";

function layout({ children }) {
  return (
    <div className="bg-neutral-100 flex flex-col">
      <div className="h-24"></div>
      <div>{children}</div>
    </div>
  );
}

export default layout;
