import React from "react";

function layout({ children }) {
  return (
    <div className="bg-neutral-100">
      <div>{children}</div>
    </div>
  );
}

export default layout;
