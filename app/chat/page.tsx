"use client";
import React, { useState } from "react";

type User = {
  id: number;
  name: string;
  lastMessage: string;
};

type Message = {
  sender: string;
  message: string;
};

const ChatPage = () => {
  const users: User[] = [
    { id: 1, name: "John Doe", lastMessage: "Hello, how are you?" },
    { id: 2, name: "Jane Smith", lastMessage: "Meeting tomorrow" },
    { id: 3, name: "Alice Johnson", lastMessage: "Let's catch up soon!" },
  ];

  const [activeUser, setActiveUser] = useState<User | null>(null);
  const [message, setMessage] = useState<string>("");

  const messages: Message[] = [
    { sender: "John Doe", message: "Hello, how are you?" },
    { sender: "You", message: "I'm good, thank you! How about you?" },
    { sender: "John Doe", message: "All is great! Let's catch up soon." },
  ];

  const handleUserClick = (user: User) => {
    setActiveUser(user);
  };

  const handleBackClick = () => {
    setActiveUser(null);
  };

  return (
    <div className="flex h-screen bg-gradient-to-b from-[#f8f8f8] to-[#d1e8e2]">
      {/* Sidebar: Show all chats */}
      <aside
        className={`md:flex flex-col w-full md:w-1/4 bg-white shadow-lg border-r border-gray-300 ${activeUser ? "hidden" : "block"} md:block rounded-xl`}
      >
        <div className="p-4 space-y-4 overflow-y-auto">
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={`flex items-center gap-4 p-4 rounded-lg cursor-pointer hover:bg-[#00BFFF] hover:text-white transition-all ease-in-out duration-300 ${
                activeUser?.id === user.id ? "bg-[#00BFFF] text-white" : "text-[#333]"
              }`}
            >
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-[#00BFFF] text-white text-xl font-semibold">
                {user.name[0]}
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600 truncate">{user.lastMessage}</p>
              </div>
            </li>
          ))}
        </div>
      </aside>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col relative rounded-xl shadow-lg overflow-hidden bg-white">
        {/* Header */}
        <header className="bg-[#00BFFF] text-white px-4 py-3 flex items-center shadow-md">
          {activeUser && (
            <>
              <div className="h-14 w-14 flex items-center justify-center rounded-full bg-white text-[#00BFFF] text-xl font-semibold">
                {activeUser.name[0]}
              </div>
              <div className="ml-4 flex-1">
                <h2 className="text-lg font-semibold">{activeUser.name}</h2>
                <p className="text-sm text-gray-200">Online</p>
              </div>
              <button
                className="md:hidden bg-[#00BFFF] text-white p-3 rounded-full hover:bg-[#0097CC] transition-all ease-in-out duration-300"
                onClick={handleBackClick}
              >
                &larr; Back
              </button>
            </>
          )}
        </header>

        {/* Messages Section */}
        <div className="flex-1 overflow-auto p-4 space-y-4">
          {activeUser ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.sender === "You" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs p-3 rounded-xl shadow-lg transition-all transform ${
                    msg.sender === "You"
                      ? "bg-[#00BFFF] text-white"
                      : "bg-[#F1F1F1] text-gray-800"
                  } hover:scale-105 ease-in-out duration-300`}
                >
                  {msg.message}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Select a chat to start messaging</p>
          )}
        </div>

        {/* Message Input Area */}
        {activeUser && (
          <div className="sticky bottom-0 bg-white border-t border-gray-200 px-4 py-3 flex items-center shadow-md">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 px-6 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-[#00BFFF] transition-all ease-in-out"
            />
            <button
              onClick={() => {
                if (message.trim()) {
                  alert("Message Sent!");
                  setMessage("");
                }
              }}
              className="ml-4 bg-[#00BFFF] text-white px-5 py-3 rounded-full shadow-md hover:bg-[#0097CC] transition-all ease-in-out"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPage;
