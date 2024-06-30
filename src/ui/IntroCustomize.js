import React from "react";

export default function IntroCustomize({ description }) {
  return (
    <div className="my-2">
      <span
        className="text-sm font-normal leading-tight text-blue-gray-400 leading-relaxed antialiased"
        style={{ whiteSpace: "pre-line" }}
      >
        {description.map((line, index) => (
          <React.Fragment key={index}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </span>
    </div>
  );
}
