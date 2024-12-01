"use client";

import { useState } from "react";
import {useTranslations} from 'next-intl';


interface User {
  id: number;
  name: string;
  avatar: string;
  status: "online" | "offline" | any;
}

const ChatInterface: React.FC = () => {
  const t = useTranslations('chats');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);

  const users: User[] = [
    { id: 1, name: "John Doe", avatar: "JD", status:(t('status_online')) },
    { id: 2, name: "Jane Smith", avatar: "JS", status: (t('status_offline')) },
    { id: 3, name: "Mike Johnson", avatar: "MJ", status:(t('status_online')) },
  ];

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
    setShowChat(true);
  };

  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <div
        className={`h-screen px-6 w-full md:w-1/3 bg-white shadow-lg border-r ${
          showChat ? "hidden md:block" : "block"
        }`}
      >
        <div className="p-4 border-b">
          <h2 className="text-lg font-bold text-gray-800">{(t('chats'))}</h2>
        </div>
        <div className="overflow-y-auto" style={{ height: "calc(100vh - 64px)" }}>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-all border-b"
            >
              <div className="w-10 h-10 rounded-full bg-[#00BFFF] flex items-center justify-center">
                <span className="text-white font-semibold">{user.avatar}</span>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p
                  className={`text-sm ${
                    user.status === "online" ? "text-green-500" : "text-gray-500"
                  }`}
                >
                  {user.status === "online" ? "Online" : "Offline"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div
        className={`h-screen w-full px-8 md:w-2/3 flex flex-col bg-gray-50 ${
          !showChat ? "hidden md:flex" : "flex"
        }`}
      >
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 shadow-sm flex items-center">
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
                    selectedUser.status === "online"
                      ? "text-green-500"
                      : "text-gray-500"
                  }`}
                >
                  {selectedUser.status}
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-6  space-y-4 bg-gray-50">
              <div className="flex items-start">
                <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                <div className="ml-3 bg-white rounded-lg p-4 shadow max-w-[70%]">
                  <p className="text-gray-800">{(t('message'))}</p>
                  <span className="text-xs text-gray-500 mt-1 block">
                    10:00 AM
                  </span>
                </div>
              </div>
              <div className="flex items-end justify-end">
                <div className="mr-3 bg-[#00BFFF] text-white rounded-lg p-4 shadow max-w-[70%]">
                  <p>{(t('message'))}</p>
                  <span className="text-xs text-blue-200 mt-1 block">
                    10:02 AM
                  </span>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t shadow-lg">
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
                  placeholder={(t('type_message'))}
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
          <div className="flex items-center justify-center flex-1">
            <p className="text-gray-500">{(t('select_a_user'))}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
