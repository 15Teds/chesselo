import React, { useState } from "react";

export default function Navbar() {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div className="fixed top-0 left-0">
        <div className="flex justify-between items-center w-full h-16 px-5 space-x-10 md:space-x-4">
          <div className="flex space-x-4">
            <div
              onClick={() => setSidebar(!sidebar)}
              className="h-8 w-8 flex items-center justify-center md:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#F9F9F9]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </div>
          <div className="hidden md:flex">
            {/* About, Top Players, and Help */}
            <div className="bg-[#312E2B] rounded-full flex items-center justify-center font-bold space-x-10">
              <a href="/">Home</a>
              <a href="/about">About</a>
              <a href="/top-players">Top Players</a>
              <a href="/help">Help</a>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div
        className={`${
          sidebar ? "translate-x-0" : "-translate-x-full"
        } fixed top-0 left-0 h-screen w-64 bg-[#312E2B] text-[#F9F9F9] transform transition duration-200 ease-in-out`}
      >
        <div className="flex justify-between items-center w-full h-16 px-5">
          <div className="flex space-x-4">
            <div
              onClick={() => setSidebar(!sidebar)}
              className="h-8 w-8 bg-[#312E2B] rounded-full flex items-center justify-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-[#F9F9F9]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-4 px-5">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/top-players">Top Players</a>
          <a href="/help">Help</a>
        </div>
      </div>
    </>
  );
}
