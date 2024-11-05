"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import logo from "../../assets/Logo.png";
import homeIcon from "../../assets/SideBarIcons/home icon.png";
import listIcon from "../../assets/SideBarIcons/categories icon.png";
import userIcon from "../../assets/SideBarIcons/user icon.png";
import bookingIcon from "../../assets/SideBarIcons/bookings icon.png";
import servicesIcon from "../../assets/SideBarIcons/service icon.png";
import jobsIcon from "../../assets/SideBarIcons/job icon.png";
import settingsIcon from "../../assets/SideBarIcons/settings icon.png";
import logoutIcon from "../../assets/SideBarIcons/logout icon.png";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";



const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      sidebarRef.current &&
      !sidebarRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex relative h-screen">
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-1 left-1 p-4 z-30 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <FontAwesomeIcon icon={faBars} className="text-gray-600 text-xl" />
      </button>

      <div
        ref={sidebarRef}
        className={`bg-white shadow-md h-full w-64 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-20 top-0`}
      >
        <div className="flex items-center p-4">
          <Image
            src={logo}
            alt="Logo"
            width={35}
            height={35}
            className="mr-2 ml-4 mt-4"
          />
          <h1 className="text-2xl font-bold text-[#343C6A]">CLE IN</h1>
        </div>
        <nav className="mt-4 ml-8">
          <ul className="space-y-2">
            {[
              { icon: homeIcon, label: "Dashboard", link: "/" },
              { icon: listIcon, label: "Categories", link: "/categories" },
              { icon: userIcon, label: "User", link: "/users" },
              { icon: bookingIcon, label: "Booking", link: "/booking" },
              { icon: servicesIcon, label: "Services", link: "/services" },
              { icon: jobsIcon, label: "Jobs", link: "/jobs" },
              { icon: settingsIcon, label: "Settings", link: "/settings" },
            ].map(({ icon, label, link }) => (
              <li
                key={label}
                className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer"
              >
                <Link href={link} passHref>
                  <p className="flex items-center">
                    <Image
                      src={icon}
                      alt={label}
                      width={24}
                      height={24}
                      className="text-gray-400 mr-6"
                    />
                    <span className="text-gray-500">{label}</span>
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-9">
          <button className="flex items-center w-full p-2 hover:bg-red-100 rounded cursor-pointer">
            <Link href="/logout" passHref>
              <p className="flex items-center">
                <Image
                  src={logoutIcon}
                  alt="Logout"
                  width={24}
                  height={24}
                  className="text-gray-400 mr-2"
                />
                <span className="text-gray-500 mt-2">Logout</span>
              </p>
            </Link>
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setIsOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;



