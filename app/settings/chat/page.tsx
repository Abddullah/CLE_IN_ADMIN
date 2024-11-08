"use client";

import React, { useState } from "react";
import MessageInterface from "../../components/settingsComponents/MessageInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [showPrivacyPolicy, setShowPrivacyPolicy] = useState(false);
  const [termCondition, setTermCondition] = useState(false);
  const [showMessageWindow, setShowMessageWindow] = useState(true);

  return (
    <>
      <div className="bg-[#F5F7FA] min-h-screen w-full flex flex-col md:flex-row pt-2 mt-3">
        <div className="w-full md:w-[70%] p-4 md:p-6 flex flex-col md:flex-row justify-start">
          <div
            className={`w-full md:w-[100%] bg-white p-4 md:p-3 px-6 md:px-5 border md:mt-0 md:ml-8 transition-all duration-500 lg:h-full lg:mb-8`}
          >
            <MessageInterface />
          </div>

          <div className="w-full mt-3 md:w-[calc(100%-20px)] lg:w-[calc(100%-20px)] bg-white p-4 md:p-3 px-6 md:px-5 border md:mt-0 md:ml-8 lg:h-full lg:mb-8 transition-all duration-500 flex flex-col justify-between mx-auto">
            <div className="flex flex-col space-y-3 overflow-y-auto h-[80vh]">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-blue-200 flex-shrink-0"></div>
                <div className="ml-3 bg-blue-100 p-3 rounded-lg max-w-[80%] text-gray-800">
                  <p className="text-sm">Hey there! How are you doing today?</p>
                </div>
              </div>

              <div className="flex items-start justify-end">
                <div className="mr-3 bg-green-100 p-3 rounded-lg max-w-[80%] text-gray-800">
                  <p className="text-sm">
                    I’m doing great! Thanks for asking. What about you?
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-green-200 flex-shrink-0"></div>
              </div>
            </div>

            {/* Message Input Area */}
            <div className="flex items-center mt-3 p-3 border-t border-gray-200">
              <input
                type="text"
                placeholder="Type a message..."
                className="flex-grow p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition duration-200"
                onClick={() => alert("Message sent!")} // Replace with send function
              >
                <FontAwesomeIcon icon={faPaperPlane} className="text-white" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
