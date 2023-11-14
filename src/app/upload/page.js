"use client";

import Nav from "@/components/Nav";
import Sidebar from "@/components/Sidebar";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Project from "@/components/Project";

const page = () => {
  const [loading, setLoading] = useState(false);
  const [episodeData, setEpisodeData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();

  const projectId = searchParams.get("projectId");

  const getProjectEpisode = async (projectId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://easy-puce-woodpecker-suit.cyclic.app/project/episode/${projectId}`
      );
      console.log("first", res.data.data);
      setLoading(false);
      setEpisodeData(res?.data?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectEpisode(projectId);
  }, []);

  return (
    <div className="flex">
      <div className="w-[25%]">
        <Sidebar
          loading={loading}
          projectName={episodeData[0]?.project?.projectName}
        />
      </div>
      <div className="w-[80%] px-14 py-12">
        <Nav />

        <Project />
      </div>
    </div>
  );
};

export default page;
