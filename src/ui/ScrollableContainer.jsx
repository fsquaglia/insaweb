import React from "react";

const ScrollableContainer = ({ children }) => {
  return (
    <div className="flex justify-center">
      <div
        className="flex justify-start overflow-x-auto mx-2"
        style={{
          overscrollBehaviorX: "contain",
          scrollSnapType: "x proximity",
        }}
      >
        <div className="flex flex-row gap-2 justify-center items-center text-center my-4">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ScrollableContainer;
