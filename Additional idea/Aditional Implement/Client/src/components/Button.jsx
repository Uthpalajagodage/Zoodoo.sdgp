import React from "react";

const Button = (props) => {
  return (
    <button
      className={`${props.bgColor} ${props.textColor} font-normal px-4 py-2 rounded-[5px] font-primary`}
    >
      {props.text}
    </button>
  );
};

export default Button;
