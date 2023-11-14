"use client";

import Card from "@/components/Card";
import Cloud from "@/components/svg/Cloud";
import Spotify from "@/components/svg/Spotify";
import Youtube from "@/components/svg/Youtube";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/svg/Loader";
import dateConverte from "@/utils/dateConverte";

const Project = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [episode, setEpisode] = useState({
    title: "",
    description: "",
  });
  const [editText, setEditText] = useState(false);
  const [text, setText] = useState("");
  const [episodeData, setEpisodeData] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const [editingIndex, setEditingIndex] = useState(null);

  const projectId = searchParams.get("projectId");

  console.log("episodedta", episodeData);

  const cancelButtonRef = useRef(null);

  const getProjectEpisode = async (projectId) => {
    try {
      setLoading(true);
      const res = await axios.get(
        `https://easy-puce-woodpecker-suit.cyclic.app/project/episode/${projectId}`
      );
      //   console.log("first", res.data.data);
      setLoading(false);
      setEpisodeData(res?.data?.data);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const addProjectEpisode = async () => {
    setOpen(false);
    try {
      setLoading(true);
      const res = await axios.post(
        `https://easy-puce-woodpecker-suit.cyclic.app/project/createEpi/${projectId}`,
        episode
      );
      getProjectEpisode(projectId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const deleteProjectEpisode = async (episodeId) => {
    try {
      setLoading(true);
      const res = await axios.delete(
        `https://easy-puce-woodpecker-suit.cyclic.app/project/episode/${episodeId}`
      );
      getProjectEpisode(projectId);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getProjectEpisode(projectId);
  }, []);

  const cardArr = [
    { icon: <Youtube height={50} width={50} />, title: "Youtube Video" },
    { icon: <Spotify height={50} width={50} />, title: "Spotify Podcast" },
    { icon: <Youtube height={50} width={50} />, title: "Youtube Video" },
    { icon: <Youtube height={50} width={50} />, title: "Youtube Video" },
    { icon: <Spotify height={50} width={50} />, title: "Spotify Podcast" },
    { icon: <Youtube height={50} width={50} />, title: "Youtube Video" },
  ];

  const cardArray = [
    { icon: <Youtube height={50} width={50} />, title: "Youtube Video" },
    { icon: <Spotify height={50} width={50} />, title: "Spotify Podcast" },
    {
      icon: <Cloud height={50} width={50} />,
      title: "or Text File",
      extra: "Media",
    },
  ];

  // const handleEdit = (epi, index) => {
  //   setEdit(true);
  //   setText(episodeData[index].description);
  // };

  const handleEdit = (epi, index) => {
    setEdit(true);
    setText(episodeData[index].description);
    setEditingIndex(index);
  };

  const handleDiscard = () => {
    setEdit(false);
    setEditText(false);
    setText(episodeData[editingIndex].description);
    setEditingIndex(null);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          {episodeData && episodeData?.length > 0 ? (
            <>
              <div>
                <div className="flex mt-8 justify-between">
                  <h1 className="text-3xl font-extrabold text-[#7E22CE]">
                    {edit
                      ? "Edit Transcript"
                      : episodeData[0].project.projectName}
                  </h1>
                  {editText ? (
                    <div className="flex gap-4 font-extrabold">
                      <p
                        className="py-2 px-6 rounded-lg border-2 border-[#FF274C] text-[#FF274C]"
                        onClick={() => setEditText(false)}
                      >
                        Discard
                      </p>
                      {/* <p className="py-2 px-6 rounded-lg text-[#F8F8F8] bg-[#211935]">
                        Save & Exit
                      </p> */}
                      <p
                        className="py-2 px-6 rounded-lg text-[#F8F8F8] bg-[#211935]"
                        onClick={() => {
                          setEditText(false);
                          setEditingIndex(null);
                        }}
                      >
                        Save & Exit
                      </p>
                    </div>
                  ) : null}
                </div>

                {edit ? (
                  <div className="border mt-10 h-[36rem] overflow-hidden p-4 rounded-2xl border-[#7E22CE]">
                    <p
                      onClick={() => setEditText(true)}
                      className="border cursor-pointer border-black pl-5 bg-[#3C3C3C] text-[#FFFFFF] text-xs mb-3 py-1 w-[9%] rounded-3xl"
                    >
                      Edit Mode
                    </p>
                    <p className="text-start text-[#7E22CE] mb-3 font-bold">
                      Speaker
                    </p>
                    {/* <p
                      className="overflow-y-scroll h-[88%]"
                      contentEditable={editText}
                      onChange={(e) => editText(e.target.value)}
                    > */}
                    {/* {text} */}
                    {/* </p> */}

                    <div
                      className="overflow-y-scroll h-[88%]"
                      contentEditable={editText}
                      onInput={(e) => setText(e.target.textContent)}
                      dangerouslySetInnerHTML={{ __html: text }}
                    />
                  </div>
                ) : (
                  <>
                    <div className="flex gap-7 mt-12">
                      {cardArray.length > 0 &&
                        cardArray.map((card, index) => {
                          return (
                            <div
                              className="cursor-pointer"
                              onClick={() => setOpen(true)}
                            >
                              <Card key={index} card={card} />
                            </div>
                          );
                        })}
                    </div>

                    <div className="flex justify-between bg-[#7E22CE] text-[#FFFFFF] p-4 rounded-lg mt-8">
                      <p className="flex items-center font-bold px-2">
                        All files are processed! Your widget is ready to go!
                      </p>
                      <div className="border border-black text-sm py-2 px-4 rounded-lg bg-[#FFFFFF] text-[#3C3C3C]">
                        Try it out!
                      </div>
                    </div>

                    <table className="min-w-full border-2 border-[#999999] rounded-2xl mt-8 cardShadow">
                      <thead>
                        <tr className="border-b border-[#999999] ">
                          <th className="py-2 px-4 text-left">Name</th>
                          <th className="py-2 px-4 text-left">
                            Upload Date & Time
                          </th>
                          <th className="py-2 px-4 text-left">Status</th>
                          <th className="py-4 px-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="font-semibold">
                        {episodeData.length > 0 &&
                          episodeData.map((episode, index) => {
                            return (
                              <>
                                <tr className="border-b border-[#999999] ">
                                  <td className="py-4 px-4 text-left">
                                    {episode.title}
                                  </td>
                                  <td className="py-2 px-4 text-left">
                                    {dateConverte(episode.createdAt)}
                                  </td>
                                  <td className="py-2 px-4 text-left">Done</td>
                                  <td className="py-2 px-4 text-left flex justify-center text-xs items-center">
                                    <p
                                      className="border border-[#D9D9D9] text-[#3C3C3C] px-3 py-2 "
                                      onClick={() => handleEdit(episode, index)}
                                    >
                                      Edit
                                    </p>
                                    <p
                                      className="border border-[#D9D9D9] px-3 text-[#FF274C] py-2"
                                      onClick={() =>
                                        deleteProjectEpisode(episode._id)
                                      }
                                    >
                                      Delete
                                    </p>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            </>
          ) : (
            <div>
              <h1 className="mt-8 text-3xl font-extrabold text-[#7E22CE]">
                Upload
              </h1>
              <div className="grid grid-cols-3 gap-x-16 gap-y-8 mt-12">
                {cardArr.length > 0 &&
                  cardArr.map((card, index) => {
                    return (
                      <div
                        className="cursor-pointer"
                        onClick={() => setOpen(true)}
                      >
                        <Card key={index} card={card} />
                      </div>
                    );
                  })}
              </div>
              <p className="flex text-2xl text-[#999999] my-6 justify-center items-center">
                or
              </p>
              <div className="border-dotted border-4 border-gray-400 rounded-xl p-4 flex flex-col items-center justify-center">
                <div className="cursor-pointer" onClick={() => setOpen(true)}>
                  <Cloud height={90} width={90} />
                </div>
                <div className="p-4">
                  <p className="text-lg">
                    Select a file or drag and drop here (Podcast Media or
                    Transcription Text)
                  </p>
                  <p className="flex justify-center text-sm text-[#00000066]">
                    MP4, MOV, MP3, WAV, PDF, DOCX or TXT file{" "}
                  </p>
                </div>

                <div
                  onClick={() => setOpen(true)}
                  className="border border-gray-500 px-8 py-3 rounded-full cursor-pointer"
                >
                  Select File
                </div>
              </div>
            </div>
          )}
        </>
      )}

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
                          className="text-xl font-bold mb-6 leading-6 text-gray-900"
                        >
                          Create Project
                        </Dialog.Title>
                        <div className="mt-2">
                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-base leading-6 text-gray-900"
                            >
                              Name
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                              <input
                                type="text"
                                name="price"
                                id="price"
                                className="block w-full rounded-md border-0 mb-2 py-3 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Type here"
                                onChange={(e) =>
                                  setEpisode({
                                    ...episode,
                                    title: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>

                          <div>
                            <label
                              htmlFor="name"
                              className="block text-sm font-base leading-6 mt-6 text-gray-900"
                            >
                              Description
                            </label>
                            <div className="relative mt-2 rounded-md shadow-sm">
                              <input
                                type="text"
                                name="price"
                                id="price"
                                className="block w-full rounded-md border-0 mb-2 py-3 pl-4 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder="Type here"
                                onChange={(e) =>
                                  setEpisode({
                                    ...episode,
                                    description: e.target.value,
                                  })
                                }
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-[#211935] px-8 py-2 text-sm font-semibold text-[#F8F8F8] shadow-sm hover:bg-[#211935] sm:ml-3 sm:w-auto"
                      onClick={addProjectEpisode}
                    >
                      Save
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
};

export default Project;
