"use client";

import Hero from "@/components/Hero";
import HeroII from "@/components/HeroII";
import Navbar from "@/components/Navbar";
import UserModal from "@/components/UserModal";
import HomeLogo from "@/components/svg/HomeLogo";
import axios from "axios";
import { useEffect, useState } from "react";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectData, setProjectData] = useState([]);
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userInfo");

    if (!storedUserInfo) {
      setIsModalOpen(true);
    }

    if (storedUserInfo) {
      const data = JSON.parse(storedUserInfo);
      getProjects(data._id);
    }
  }, [userInfo]);

  const getProjects = async (id) => {
    try {
      const res = await axios.get(
        `https://easy-puce-woodpecker-suit.cyclic.app/project/${id}`
      );
      console.log("response", res.data.data);
      setProjectData(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveUserInfo = async (data) => {
    localStorage.setItem("userInfo", JSON.stringify(data));
    setUserInfo(data);
    setIsModalOpen(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Navbar />

      <div className="flex justify-start items-center w-4/5 m-auto">
        <div className="flex px-4 py-0 gap-x-2 font-sans text-sm justify-start items-center border-2 border-[#999] cardShadow text-[#3C3C3C] rounded-full">
          <HomeLogo height={30} width={20} />
          <p className="text-xs ">Back to Home</p>
        </div>
      </div>

      {projectData && projectData.length > 0 ? (
        <HeroII getProjects={getProjects} projectData={projectData} />
      ) : (
        <Hero getProjects={getProjects} />
      )}

      <UserModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        onSave={handleSaveUserInfo}
      />
    </>
  );
}
