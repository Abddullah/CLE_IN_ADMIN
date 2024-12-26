"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

interface User {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | string;
}

const ChatInterface: React.FC = () => {
  const t = useTranslations("chats");
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);

  const users: User[] = [
    { id: 1, name: "John Doe", avatar: "JD", status: t("status_online") },
    { id: 2, name: "Jane Smith", avatar: "JS", status: t("status_offline") },
    { id: 3, name: "Mike Johnson", avatar: "MJ", status: t("status_online") },
    { id: 4, name: "Alex Turner", avatar: "AT", status: t("status_online") },
    { id: 5, name: "Emily Davis", avatar: "ED", status: t("status_online") },
    { id: 6, name: "Chris Lee", avatar: "CL", status: t("status_online") },
    { id: 7, name: "Sarah Brown", avatar: "SB", status: t("status_online") },
    { id: 8, name: "David Williams", avatar: "DW", status: t("status_online") },
  ];

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
    setShowChat(true);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar: Chat List */}
      <div
        className={`h-screen w-full sm:w-1/3 md:w-1/4 bg-white shadow-lg border-r ${showChat ? "hidden md:block" : "block"}`}
      >
        <div className="relative h-full max-w-full">
          <div className="h-full p-2 space-y-4 fixed overflow-y-auto w-full sm:max-w-[50%] lg:max-w-[50%] max-w-full">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleUserSelect(user)}
                className={`flex items-center p-4 cursor-pointer transition-all mb-2 w-full `}
              >
                <div className="w-10 h-10 rounded-full bg-[#00BFFF] flex items-center justify-center">
                  <span className="text-white font-semibold">{user.avatar}</span>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-gray-800">{user.name}</h3>
                  <p
                    className={`text-sm ${
                      user.status === t("status_online") ? "text-green-500" : "text-gray-500"
                    }`}
                  >
                    {user.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`flex-1 flex flex-col z-10 ${showChat ? "block" : "hidden md:flex"} space-y-4`}
      >
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 shadow-md flex items-center sticky top-0 z-10 border-b">
              <button
                className="md:hidden mr-3"
                onClick={() => setShowChat(false)}
              >
                <svg
                  className="w-6 h-6 text-gray-600"
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
                <h2 className="font-semibold text-gray-800">
                  {selectedUser.name}
                </h2>
                <p
                  className={`text-sm ${
                    selectedUser.status === t("status_online")
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {selectedUser.status}
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100"> {/* Scrollable Chat Messages */}
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-3 bg-white rounded-lg p-4 shadow max-w-[70%]">
                  <p className="text-gray-800">{t("message")}</p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    10:00 AM
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <div className="mr-3 bg-[#00BFFF] text-white rounded-lg p-4 shadow max-w-[70%]">
                  <p>{t("message")}</p>
                  <span className="text-xs text-blue-200 mt-1 block">
                    10:02 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t shadow-lg sticky bottom-0 z-10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder={t("type_message")}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button className="bg-[#00BFFF] text-white p-2 rounded-full hover:bg-blue-600 transition">
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
          <div className="flex items-center justify-center flex-1 z-20">
            <p className="text-gray-500 z-10">{t("select_a_user")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
