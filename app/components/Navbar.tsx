"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faSearch } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [pathName, setPathName] = useState("");
  const notificationsRef = useRef<HTMLDivElement>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationsRef.current &&
      !notificationsRef.current.contains(event.target as Node)
    ) {
      setIsNotificationsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const path = usePathname();
  const hidePath = ["/"];

  if (hidePath.includes(path)) {
    return null;
  }

  

  useEffect(() => {
    if (path.includes("services")) {
      setPathName("Services");
    } else if (path.includes("categories")) {
      setPathName("Categories");
    } else if (path.includes("settings")) {
      setPathName("Settings");
    } else if (path.includes("bookings")) {
      setPathName("Bookings");
    } else if (path.includes("jobs")) {
      setPathName("Jobs");
    } else if (path.includes("users")) {
      setPathName("Users");
    } else if(path.includes('/logout')){
      setPathName('Settings')
    }else if (path.includes('/dashboard')){
      setPathName('Dashboard')
    }else if(path.includes('additionalServices') ){
      setPathName('Additional Services')
    }
     else {
      setPathName("");
    }
  }, [path]);

  return (
    <aside>
      <div className="w-full flex items-center justify-between bg-white p-5 sm:p-4 md:px-6 md:py-3 rounded-lg relative">
        <div className="hidden md:block text-2xl font-bold text-[#343C6A] mt-2">
          {pathName}
        </div>

        <div className="flex-1 gap-3 mt-2 max-w-[75%] sm:max-w-[50%] md:max-w-[40%] lg:max-w-[30%] relative ml-auto sm:mr-4 md:mr-9 px-2 ">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search for something"
            className="w-full h-9 sm:h-12 bg-gray-100 rounded-full py-1 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 "
          />
        </div>

        <div className="flex items-center space-x-3 mr-2 sm:space-x-4 relative">
          <div
            className="relative cursor-pointer"
            onClick={toggleNotifications}
          >
            <FontAwesomeIcon
              icon={faBell}
              className="text-gray-600 text-lg sm:text-xl mt-2"
            />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center transform translate-x-1/2 -translate-y-1/2 mt-2">
              3
            </span>
          </div>

          <div className="flex items-center">
            <Image
              src="/assets/Mask Group.png"
              alt="User Profile"
              width={32}
              height={32}
              className="rounded-full border border-gray-300 shadow-md"
            />
          </div>

          {isNotificationsOpen && (
            <div
              ref={notificationsRef}
              className="absolute right-0 top-12 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50 overflow-y-auto max-h-90 "
            >
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Notifications
                </h3>
                <div className="space-y-4 mt-2">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div
                      key={index}
                      className="flex items-start p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition duration-150 ease-in-out"
                    >
                      <Image
                        src="/assets/Mask Group.png"
                        alt="Notification Icon"
                        width={40}
                        height={40}
                        className="rounded-full mr-3"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-700">
                          Notification received
                        </p>
                        <p className="text-xs text-gray-400">Today | 9:00 AM</p>
                        <p className="text-sm text-gray-600 mt-1">
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit.
                        </p>
                      </div>
                    </div>
                  ))}
                  <div className="items-center text-center">
                    <Button
                      variant="outline"
                      className="border-[#4BB1D3] w-[150px] text-blue-500 hover:bg-blue-500 hover:text-white"
                    >
                      Show all
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Navbar;
