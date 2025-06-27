import React from "react";

const Progress = (props) => {
  const bgColor = () => {
    return props.value >= 50
      ? "bg-green-500"
      : props.value >= 30
      ? "bg-yellow-500"
      : "bg-red-500";
  };
  return (
    <div className="w-[100px] mt-1 h-[5px] overflow-hidden rounded-md bg-[#ccc]">
      <span
        style={{ width: `${props.value}%` }}
        className={`flex items-center h-full ${bgColor()}`}
      ></span>
    </div>
  );
};

export default Progress;
