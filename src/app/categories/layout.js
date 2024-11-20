import React from "react";

function layout({ children }) {
  return (
    <div className="bg-neutral-100 flex flex-col">
      <div className="text-center py-4">
        <span className="text-slate-500 antialiased">
          Okey, no te apresures, me están construyendo. Ihara & London Web
        </span>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default layout;
