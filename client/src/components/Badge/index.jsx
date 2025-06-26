import React from "react";

const Badge = (props) => {
  return (
    <span
      className={`flex items-center gap-2 justify-center  capitalize  ${
        (props.status === "pending" && "text-yellow-500") ||
        (props.status === "confirm" && "text-green-500") ||
        (props.status === "delivered" && "text-green-700") ||
        (props.status === "cancelled" && "text-red-600")
      }`}
    >
      <div
        className={`w-2 h-2 rounded-full ${
          (props.status === "pending" && "bg-yellow-400") ||
          (props.status === "confirm" && "bg-green-500") ||
          (props.status === "delivered" && "bg-green-700") ||
          (props.status === "cancelled" && "bg-red-600")
        }`}
      ></div>
      {props.status}
    </span>
  );
};
export default Badge;
