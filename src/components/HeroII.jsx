"use client";

import Plus from "./svg/Plus";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useRef, useState } from "react";

const HeroII = ({ projectData, getProjects }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const router = useRouter();

  const [projectName, setprojectName] = useState("");

  const handleCreateProject = async () => {
    setOpen(false);
    try {
      const userData = JSON.parse(localStorage.getItem("userInfo"));
      const res = await axios.post(
        `https://easy-puce-woodpecker-suit.cyclic.app/project/create/${userData._id}`,
        { projectName }
      );
      getProjects(userData._id);
      console.log("add project response", res);
    } catch (error) {
      console.log(error);
    }
  };

  const getEpisodes = async () => {
    try {
      const data = await axios.get(
        `https://easy-puce-woodpecker-suit.cyclic.app/project`
      );
    } catch (error) {}
  };

  useEffect(() => {
    getEpisodes();
  }, []);

  function getInitials(name) {
    const words = name.split(" ");

    const initials = words.map((word) => word.charAt(0));

    return initials.join("");
  }

  const handleClick = async () => {
    router.push("/upload");
  };

  return (
    <div className="w-[80%] m-auto mt-8">
      <div className="flex justify-between">
        <h1 className="flex justify-center text-[#7E22CE] text-5xl font-bold">
          Projects
        </h1>
        <div
          onClick={() => setOpen(true)}
          className="flex justify-center items-center cursor-pointer text-lg bg-[#211935] px-5 py-2 rounded text-[#F8F8F8] gap-x-4"
        >
          <Plus width={27} height={27} />
          <p>Create New Project</p>
        </div>
      </div>

      <div className="mt-12 grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-16">
        {projectData && projectData.length > 0
          ? projectData.map((project) => {
              return (
                <div
                  className="flex border-2 gap-x-6 rounded-xl p-2 cursor-pointer border-[#999999]"
                  onClick={handleClick}
                >
                  <div className="bg-[#7E22CE] px-6 h-[100px] rounded-xl font-bold flex justify-center items-center text-6xl text-[#FFFFFF]">
                    {getInitials(project.projectName)}
                  </div>
                  <div className="flex flex-col mt-4 justify-between items-start ">
                    <div className="">
                      <p className="text-lg text-[#7E22CE] font-bold">
                        {project.projectName}
                      </p>
                      <p className="text-[#3C3C3C] text-[12px]">
                        {projectData.length}{" "}
                        {projectData.length > 1 ? "Episodes" : "Episode"}
                      </p>
                    </div>
                    <p className="text-[#969696] text-[12px]">
                      Last edited a week ago
                    </p>
                  </div>
                </div>
              );
            })
          : ""}
      </div>

      {/* modal  */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-2xl bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 ">
                    <div className="sm:flex sm:items-start">
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full ">
                        <Dialog.Title
                          as="h3"
                          className="text-xl font-bold mb-8 leading-6 text-gray-900"
                        >
                          Create Project
                        </Dialog.Title>
                        <div className="mt-2">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-base leading-6 text-gray-900"
                            >
                              Enter Project Name:
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                              <input
                                type="text"
                                name="price"
                                id="price"
                                className="block w-full rounded-md border-0 mb-2 py-3 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Type here"
                                onChange={(e) => setprojectName(e.target.value)}
                                required
                              />
                              <span className="text-xs px-2 text-[#FF274C]">
                                Project Name Can't be empty
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-[#7E22CE] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#7E22CE] sm:ml-3 sm:w-auto"
                      onClick={handleCreateProject}
                    >
                      Create
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-[#FF274C] shadow-sm hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default HeroII;
