import React from "react";
import Youtube from "./svg/Youtube";

const Card = ({ card }) => {
  return (
    <div className="flex gap-2 gap-x-6 rounded-xl p-4 cardShadow border border-[#999999]">
      <div className="p-1">{card.icon}</div>
      <div className="p-1 mr-2">
        <p className="font-semibold">Upload {card.extra ? card.extra : ""}</p>
        <p className="font-semibold">{card.title}</p>
      </div>
    </div>
  );
};

export default Card;
