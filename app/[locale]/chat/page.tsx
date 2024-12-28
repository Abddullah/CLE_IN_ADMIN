"use client";

import { useEffect, useState } from "react";
import { db } from "../config/Firebase/FirebaseConfig";
import { collection, query, onSnapshot, addDoc, doc } from "firebase/firestore";
import moment from 'moment'
  interface Message {
  id: string;
  text: string;
  senderId: string;
  timestamp: any;
}

interface User {
  id: string;
  name: string;
  avatar: string;
  status: string; // "online" | "offline" | string;
  lastMessage: string;
}

const ChatInterface: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showChat, setShowChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>("");

  // Fetch chat list and user data from Firebase
  useEffect(() => {
    const fetchChats = async () => {
      const usersRef = collection(db, "chats"); // Fetching all users from the "chats" collection
      const q = query(usersRef);

      const unsubscribe = onSnapshot(q, (snapshot) => {
        const fetchedUsers: User[] = snapshot.docs.map((doc) => ({
          id: doc.id,
          name: doc.data().name || "Unknown User",
          avatar: doc.data().avatar || "NA",
          status: doc.data().status || "offline",
          lastMessage: doc.data().lastMessage?.text || "No messages yet",
        }));
        setUsers(fetchedUsers);
      });

      return () => unsubscribe();
    };

    fetchChats();
  }, []);

  const handleUserSelect = (user: User): void => {
    setSelectedUser(user);
    setShowChat(true);
    
  };

  // Fetch messages for selected user (in the correct subcollection)
  useEffect(() => {
    if (selectedUser) {
      const chatId = selectedUser.id;

      const unsubscribe = onSnapshot(
        doc(db, "chats", chatId),
        (docSnapshot) => {
          if (docSnapshot.exists()) {
            setMessages(docSnapshot.data()?.messages || []); // Set messages state with fetched data
          } else {
            setMessages([]); // Handle case where no data exists
          }
        }
      );

      // Cleanup on unmount
      return () => unsubscribe();
    }
  }, [selectedUser]); // Runs when selectedUser changes

  // Send new message to Firebase
  const sendMessage = async () => {
    if (newMessage.trim() !== "") {
      const messageData = {
        text: newMessage,
        senderId: "xgcSKfSkZSRtFQgSezLiSOQ2E3n2", 
        timestamp: new Date(),
      };

      // Save the message to the messages collection for the selected user
      const messagesRef = collection(db, "chats", selectedUser?.id || "", "messages");
      await addDoc(messagesRef, messageData);

      // Clear input field
      setNewMessage("");
    }
  };

  // Scroll to the bottom of the chat area when messages are updated
  useEffect(() => {
    const chatArea = document.getElementById("chat-area");
    if (chatArea) {
      chatArea.scrollTop = chatArea.scrollHeight;
    }
  }, [messages]); // Trigger scroll when messages change

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar: Chat List */}
      <div className={`h-screen w-full sm:w-1/3 md:w-1/4 bg-white shadow-lg border-r ${showChat ? "hidden md:block" : "block"}`}>
        <div>
          {users.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user)}
              className="flex items-center p-4 cursor-pointer transition-all mb-2 w-full"
            >
              <div className="w-10 h-10 rounded-full bg-[#00BFFF] flex items-center justify-center">
                <span className="text-white font-semibold">{user.avatar}</span>
              </div>
              <div className="ml-4">
                <h3 className="font-semibold text-gray-800">{user.name}</h3>
                <p className={`text-sm ${user.status === "online" ? "text-green-500" : "text-gray-500"}`}>
                  {user.status}
                </p>
                <p className="text-sm text-gray-400">{user.lastMessage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`flex-1 flex flex-col z-10 ${showChat ? "block" : "hidden md:flex"} space-y-4`}>
        {selectedUser ? (
          <>
            {/* Chat Header */}
            <div className="bg-white p-4 shadow-md flex items-center sticky top-0 z-10 border-b">
              <button className="md:hidden mr-3" onClick={() => setShowChat(false)}>
                <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <div className="w-10 h-10 rounded-full bg-[#00BFFF] flex items-center justify-center">
                <span className="text-white font-semibold">{selectedUser.avatar}</span>
              </div>
              <div className="ml-4">
                <h2 className="font-semibold text-gray-800">{selectedUser.name}</h2>
                <p className={`text-sm ${selectedUser.status === "online" ? "text-green-500" : "text-gray-500"}`}>
                  {selectedUser.status}
                </p>
              </div>
            </div>

            {/* Chat Messages */}
            <div id="chat-area" className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100">
              {messages.length > 0 ? (
                messages.map((message) => (
                  // <div
                  //   key={message.id}
                  //   className={`p-2 rounded-lg ${message.senderId === "yourUserIdHere" ? "bg-blue-100 self-end text-right" : "bg-gray-200 self-start text-left"}`}
                  // >
                  //   <p className="text-sm text-gray-800">{message.text}</p>
                  //   <p className="text-xs text-gray-500">
                  //     {
                  //       moment(message.timestamp).format('hh:mm A')
                  //     }
                  //   </p>
                  // </div>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gray-100"> {/* Scrollable Chat Messages */}
                  <div className="flex items-start">
                    <div className="w-8 h-8 rounded-full bg-gray-300 flex-shrink-0"></div>
                    <div className="ml-3 bg-white rounded-lg p-4 shadow max-w-[70%]">
                      <p className="text-gray-800">{message.text}</p>
                      <span className="text-xs text-gray-500 mt-1 block">
                       {
                         moment(message.timestamp).format('hh:mm A')
                      }
                      </span>
                    </div>
                  </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-500">No messages yet</p>
              )}
            </div>

            {/* Message Input */}
            <div className="bg-white p-4 border-t shadow-lg sticky bottom-0 z-10">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type a message"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1 border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:ring focus:ring-blue-200"
                />
                <button
                  onClick={sendMessage}
                  className="bg-[#00BFFF] text-white p-2 rounded-full hover:bg-blue-600 transition"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex items-center justify-center flex-1 z-20">
            <p className="text-gray-500 z-10">Select a user to chat with</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
