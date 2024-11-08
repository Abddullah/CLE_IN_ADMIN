"use client";

import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import userProfile from "../../../assets/settingsIcons/userProfile.svg";
import Link from "next/link";

const ChatInterface = () => {
  const users = [
    {
      name: "John Doe",
      profilePic: userProfile,
      message: "Hey, how are you doing?",
      time: "10:30 AM",
    },
    {
      name: "Jane Smith",
      profilePic: userProfile,
      message: "I will send the report by 5 PM.",
      time: "11:00 AM",
    },
    {
      name: "Alice Johnson",
      profilePic: userProfile,
      message: "Looking forward to our meeting!",
      time: "11:15 AM",
    },
    {
      name: "Bob Lee",
      profilePic: userProfile,
      message: "Got it, thanks for the update!",
      time: "12:00 PM",
    },
    {
      name: "Charlie Brown",
      profilePic: userProfile,
      message: "Can you send me the files?",
      time: "12:30 PM",
    },
    {
      name: "Eva Green",
      profilePic: userProfile,
      message: "Let's catch up later!",
      time: "1:00 PM",
    },
    {
      name: "David Blue",
      profilePic: userProfile,
      message: "On my way to the meeting.",
      time: "1:45 PM",
    },
    {
      name: "Olivia White",
      profilePic: userProfile,
      message: "Please check your inbox.",
      time: "2:00 PM",
    },
  ];

  return (
    <div className="bg-white min-h-screen px-1 ml-3">
      {/* Top Message Section */}
      <div className="text-[#00BFFF] items-start mb-2">
        <h2 className="text-md font-semibold underline">Messages</h2>
      </div>

      <div className="mb-2">
        <input
          type="text"
          placeholder="Search"
          className="w-full p-2 bg-gray-100 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
        />
      </div>

      <div
        className="max-w-full mx-auto space-y-2 sm:space-y-3 overflow-y-auto"
        style={{ maxHeight: "100vh" }}
      >
        {users.map((user, index) => (
          <Link href={'/settings/chat'} key={index}>
          <div
            
            className="flex items-start space-x-4 sm:space-x-4 bg-white shadow-md rounded-lg p-2 hover:bg-gray-50 transition duration-200"
          >
            <div className="relative w-10 h-10 sm:w-12 sm:h-12">
              <Image
                src={user.profilePic}
                alt={user.name}
                width={48}
                height={48}
                className="rounded-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                {/* User Name and Time */}
                <h2 className="font-semibold text-gray-800 text-sm sm:text-base">
                  {user.name}
                </h2>
                <span className="text-xs text-gray-500">{user.time}</span>
              </div>

              <p className="text-gray-700 text-xs sm:text-sm">{user.message}</p>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ChatInterface;
