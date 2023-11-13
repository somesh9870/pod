"use client";

import HeroImg from "./svg/HeroImg";
import Plus from "./svg/Plus";
import { Fragment, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";

const Hero = ({ getProjects }) => {
  const [open, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

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

  return (
    <div className="bg-white  flex-row justify-center items-center w-4/5 border-0 border-red-600 m-auto">
      <div className="flex justify-center text-[#7E22CE] text-5xl font-bold">
        Create a New Project
      </div>
      <div className="flex justify-center items-center">
        <HeroImg />
      </div>
      <div className="text-center px-4 text-2xl font-roboto text-[#838383]">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in
      </div>
      <div
        onClick={() => setOpen(true)}
        className="flex justify-center items-center bg-[#211935] w-[370px] rounded-xl text-3xl m-auto px-4 py-4 mt-8 text-[#F8F8F8] gap-x-4 cursor-pointer"
      >
        <Plus width={37} height={37} />
        <p>Create New Project</p>
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

export default Hero;
