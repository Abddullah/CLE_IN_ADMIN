"use client";

import { useState } from "react";

interface User {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline";
}

const ChatInterface: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);

  const users: User[] = [
    { id: 1, name: "John Doe", avatar: "JD", status: "online" },
    { id: 2, name: "Jane Smith", avatar: "JS", status: "offline" },
    { id: 3, name: "Mike Johnson", avatar: "MJ", status: "online" },
  ];

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
    setShowChat(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden max-h-screen">
      <div
        className={`h-screen w-full md:w-1/3 bg-white shadow-sm ${
          showChat ? "hidden md:block" : "block"
        }`}
      >
        <div
          className="overflow-y-auto"
          style={{ height: "calc(100vh - 64px)" }}
        >
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer border-b"
            >
              <div className="w-10 h-10 rounded-full bg-[#00BFFF] flex items-center justify-center">
                <span className="text-white font-semibold">{user.avatar}</span>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold">{user.name}</h3>
                <p
                  className={`text-sm ${
                    user.status === "online"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {user.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Interface - Full width on mobile when open, 2/3 width on desktop */}
      <div
        className={`h-screen w-full md:w-2/3 flex flex-col ${
          !showChat ? "hidden md:flex" : "flex"
        }`}
      >
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white shadow-sm p-4 flex items-center">
              <button
                className="md:hidden mr-2"
                onClick={() => setShowChat(false)}
              >
                <svg
                  className="w-6 h-6 "
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-[#00BFFF] flex items-center justify-center">
                <span className="text-white font-semibold">
                  {selectedUser.avatar}
                </span>
              </div>
              <div className="ml-4">
                <h2 className="font-semibold">{selectedUser.name}</h2>
                <p className="text-sm text-green-500">{selectedUser.status}</p>
              </div>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 h-[calc(100vh-180px)]">
              {/* Received Message */}
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0" />
                <div className="ml-3 bg-white rounded-lg rounded-tl-none p-3 shadow max-w-[80%] md:max-w-[60%]">
                  <p className="text-gray-800">Hey, how are you?</p>
                  <span className="text-xs text-gray-500 mt-1">10:00 AM</span>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex items-start justify-end">
                <div className="mr-3 bg-[#00BFFF] rounded-lg rounded-tr-none p-3 shadow max-w-[80%] md:max-w-[60%]">
                  <p className="text-white">I'm doing great! How about you?</p>
                  <span className="text-xs text-blue-100 mt-1">10:02 AM</span>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 shadow-lg mt-auto">
              <div className="flex items-center space-x-2">
                <button className="p-2 hover:bg-gray-100 rounded-full transition">
                  <svg
                    className="w-6 h-6 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </button>
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-[#00BFFF]"
                />
                <button className="bg-[#00BFFF] text-white rounded-full p-2 hover:bg-blue-600 transition">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="hidden md:flex items-center justify-center h-full">
            <p className="text-gray-500">Select a user to start chatting</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
