"use client";

import React from "react";

const Button = ({ text, color, bgColor, logo }) => {
  return (
    <button
      style={{ color: color, backgroundColor: 'bgColor' }}
      className="flex border-5 border-red-800 justify-center align-middle font-bold py-2 px-4 rounded"
    >
      {logo ? <div>{logo}</div> : null}
      {text}
    </button>
  );
};

export default Button;
