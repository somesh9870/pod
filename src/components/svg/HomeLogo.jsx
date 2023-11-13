import React from "react";

const HomeLogo = ({ color = "#3C3C3C", height, width }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="home">
        <path
          id="Vector"
          d="M15.0613 8.18399L21.1252 13.6415V23.1132H18.6996V15.8366H11.423V23.1132H8.99746V13.6415L15.0613 8.18399ZM15.0613 4.92163L2.93359 15.8366H6.57191V25.5388H13.8486V18.2621H16.2741V25.5388H23.5507V15.8366H27.1891L15.0613 4.92163Z"
          fill={color}
        />
      </g>
    </svg>
  );
};

export default HomeLogo;
