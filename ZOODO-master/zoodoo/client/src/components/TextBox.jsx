import React from "react";

const TextBox = (props) => {
  return (
    <input
      type={`${props.type}`}
      name=""
      className="rounded-lg border border-gray-400 h-11 outline-none w-full font-primary pl-3 mt-2 lg:mt-0"
      placeholder={`${props.fieldName}`}
    />
  );
};

export default TextBox;
