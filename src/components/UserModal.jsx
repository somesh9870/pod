import axios from "axios";
import React, { useState } from "react";

const UserModal = ({ isOpen, onClose, onSave }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  const handleSave = async () => {
    if (username && email) {
      try {
        const data = await axios.post("http://localhost:5000/user/login", {
          UserName: username,
          email,
        });

        console.log("data", data.data.data);

        if (data.data.status === true) {
          onSave(data.data.data);
          onClose();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-50"
          onClick={onClose}
        />
      )}

      <div className={`fixed inset-0 z-50 ${isOpen ? "" : "hidden"}`}>
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-white p-8 shadow-md rounded-md">
            <h2 className="text-2xl font-semibold mb-4">
              Welcome to new world!
            </h2>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex justify-end">
              <button
                className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                onClick={handleSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserModal;
