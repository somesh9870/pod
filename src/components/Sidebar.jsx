"use client";

import React, { useState } from "react";
import Setting from "./svg/Setting";
import Logo from "./svg/Logo";

const Sidebar = ({ projectName, loading }) => {
  const [activeTab, setActiveTab] = useState("projects");

  console.log(activeTab, "setActiveTab");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const tabs = [
    { id: "projects", label: "Projects" },
    { id: "widget configuration", label: "Widget Configurations" },
    { id: "deployment", label: "Deployment" },
    { id: "pricing", label: "Pricing" },
  ];

  const bottomTabs = [
    {
      id: "settings",
      label: "Settings",
      icon: <Setting width={30} height={20} />,
    },
  ];

  return (
    <div className="bg-[#F3E8FF] rounded-2xl h-screen w-[22rem] p-4 fixed top-0 left-0 overflow-y-auto flex flex-col">
      {/* sidebar header */}
      <div className="py-2 px-4">
        <div className="flex items-start mb-6">
          <Logo width={35} height={35} />
          <p className="text-[#7E22CE] font-extrabold ml-2 text-2xl">LAMA.</p>
        </div>
        {loading ? (
          <p>...Loading</p>
        ) : (
          <p className="text-black text-sm font-normal mb-2">{projectName}</p>
        )}
      </div>

      {/* tab section */}
      <ul className="text-white flex-1">
        {tabs.map((tab, index) => (
          <li
            key={tab.id}
            className={`flex items-center p-3 font-semibold text-[#49454F] text-xs rounded-full cursor-pointer ${
              activeTab === tab.id
                ? "bg-[#7E22CE] text-[#FFFF] rounded-full"
                : "hover:bg-[#CAC4D0]"
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <div
              className={`rounded-full text-xs h-7 w-7 flex items-center justify-center mr-3 font-semibold ${
                activeTab === tab.id
                  ? "bg-[#211935] text-[#FFFF]"
                  : "bg-[#CAC4D0]"
              }`}
            >
              {index + 1}
            </div>
            {tab.label}
          </li>
        ))}
        <hr className="border-t-2 border-[#CAC4D0] my-4" />
      </ul>

      {/* bottom tab section */}
      <div>
        <ul className="text-white">
          <hr className="border-t-2 border-[#CAC4D0] mb-4" />
          {bottomTabs.map((tab) => (
            <li
              key={tab.id}
              className={`flex items-center p-3 font-semibold text-[#49454F] text-sm rounded-full cursor-pointer ${
                activeTab === tab.id
                  ? "bg-[#7E22CE] text-[#FFFF] rounded-full"
                  : "hover:bg-[#CAC4D0] "
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              <div
                className={`rounded-full text-sm h-8 w-8 flex items-center justify-center mr-3 font-semibold ${
                  activeTab === tab.id
                    ? "bg-[#211935] text-[#FFFF]"
                    : "bg-[#CAC4D0]"
                }`}
              >
                {tab.icon}
              </div>
              {tab.label}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
