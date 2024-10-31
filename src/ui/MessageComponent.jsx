import React from "react";
import { BiSolidErrorAlt } from "react-icons/bi";
import { FaInfoCircle, FaCheckCircle } from "react-icons/fa";

export default function MessageComponent({ message, type }) {
  let icon, color, role;

  switch (type) {
    case "error":
      icon = <BiSolidErrorAlt />;
      color = "text-red-500";
      role = "alert";
      break;
    case "info":
      icon = <FaInfoCircle />;
      color = "text-blue-500";
      role = "status";
      break;
    case "success":
      icon = <FaCheckCircle />;
      color = "text-green-500";
      role = "status";
      break;
    default:
      icon = null;
      color = "text-gray-500";
      role = "status";
  }

  return (
    <div className={`flex items-center gap-2 ${color}`} role={role}>
      {icon}
      <span>{message}</span>
    </div>
  );
}
