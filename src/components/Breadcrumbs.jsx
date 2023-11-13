// Breadcrumbs.js
import React from "react";
import Link from "next/link";

const Breadcrumbs = ({ items }) => {
  return (
    <nav className="text-gray-600">
      <ol className="list-none p-0 inline-flex">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && <span className="mx-2">/</span>}
            {item.href ? (
              <Link className="font-bold text-[#7E22CE]" href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span className="font-bold text-[#999999]">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
