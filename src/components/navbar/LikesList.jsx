import React from "react";

function LikesList({ likes }) {
  return <div>{likes ? "hay likes!" : "Danos el primer Like!"}</div>;
}

export default LikesList;
