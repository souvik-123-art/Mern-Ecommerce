import React from "react";

const Badge = (props) => {
  return (
    <span
      className={`flex items-center gap-2 justify-center capitalize  ${
        (props.status === "pending" && "text-yellow-500") ||
        (props.status === "confirmed" && "text-green-500") ||
        (props.status === "dispatched" && "text-green-500 ") ||
        (props.status === "out for delivery" && "text-green-500 ") ||
        (props.status === "delivered" && "text-green-700") ||
        (props.status === "cancelled" && "text-red-600")
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full  flex items-center justify-center border-2 ${
          (props.status === "pending" && "border-yellow-400 animate-pulse") ||
          (props.status === "confirmed" && "border-green-500 animate-pulse") ||
          (props.status === "dispatched" && "border-green-500 animate-pulse") ||
          (props.status === "out for delivery" &&
            "border-green-500 animate-pulse") ||
          (props.status === "delivered" && "border-green-700") ||
          (props.status === "cancelled" && "border-red-500")
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            (props.status === "pending" && "bg-yellow-400 animate-pulse") ||
            (props.status === "confirmed" && "bg-green-500 animate-pulse") ||
            (props.status === "dispatched" && "bg-green-500 animate-pulse") ||
            (props.status === "out for delivery" &&
              "bg-green-500 animate-pulse") ||
            (props.status === "delivered" && "bg-green-700") ||
            (props.status === "cancelled" && "bg-red-600")
          }`}
        ></div>
      </div>

      {props.status}
    </span>
  );
};
export default Badge;
