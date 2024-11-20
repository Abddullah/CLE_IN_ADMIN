"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

import logo from "../../assets/Logo.png";

import {
  faBars,
  faHome,
  faList,
  faUser,
  faCalendarAlt,
  faGear,
  faSuitcase,
  faSignOutAlt,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const [pathName, setPathName] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current) {
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

  const path = usePathname();

  const hidePath = ["/login"];

  if (hidePath.includes(path)) {
    return null;
  }

  useEffect(() => {
    if (path.includes("services")) {
      setPathName("/services");
    } else if (path.includes("categories")) {
      setPathName("/categories");
    } else if (path.includes("settings")) {
      setPathName("/settings");
    } else if (path.includes("bookings")) {
      setPathName("/bookings");
    } else if (path.includes("jobs")) {
      setPathName("/jobs");
    } else if (path.includes("users")) {
      setPathName("/users");
    } else if (path === "/logout") {
      setPathName("/logout");
    } else if (path.includes("additionalServices")) {
      setPathName("/additionalServices");
    } else if (path === "/") {
      setPathName("/");
    } else {
      setPathName("");
    }
  }, [path]);
  

  return (
    <div className="flex relative h-screen">
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-1 left-1 p-4 z-30 ${
          isOpen ? "hidden" : ""
        }`}
      >
        <FontAwesomeIcon
          icon={faBars}
          className="text-gray-600 text-xl mt-3.5"
        />
      </button>

      <div
        ref={sidebarRef}
        className={`bg-white shadow-md h-full w-64 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 fixed md:relative z-20 top-0`}
      >
        <Link href={"/"}>
          <div className="flex items-center p-4 ml-1 mb-5 mt-1 ">
            <Image
              src="/assets/Logo.png"
              alt="Logo"
              width={38}
              height={388}
              className="mr-2 ml-4 mt-1"
            />
            <h1 className="text-xl font-bold text-[#343C6A] mt-2 ml-2">
              Pulizie Di Casa
            </h1>
          </div>
        </Link>
        <nav className="mt-4 ml-7">
          <ul className="space-y-2 mr-2">
            {[
              { icon: faHome, label: "Dashboard", link: "/" },
              { icon: faList, label: "Categories", link: "/categories" },
              { icon: faUser, label: "Users", link: "/users" },
              { icon: faCalendarAlt, label: "Bookings", link: "/bookings" },
              { icon: faSuitcase, label: "Services", link: "/services" },
              { icon: faSuitcase, label: "Jobs", link: "/jobs" },
              {
                icon: faWrench,
                label: "Additional Services",
                link: "/additionalServices",
              },
              { icon: faGear, label: "Settings", link: "/settings" },
            ].map(({ icon, label, link }) => (
              <Link
                href={link}
                passHref
                key={label}
                className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1"
              >
                <li>
                  <p className="flex items-center">
                    <FontAwesomeIcon
                      icon={icon}
                      className={`mr-7 text-xl ${
                        pathName === link ? "text-[#00BFFF]" : "text-gray-400"
                      }`}
                    />

                    <span
                      className={`mr-2  ${
                        pathName === link ? "text-[#00BFFF] " : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  </p>
                </li>
              </Link>
            ))}
          </ul>
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-9">
          <button className="flex items-center w-full p-2 hover:bg-red-100 rounded cursor-pointer">
            <Link href="/logout" passHref>
              <p className="flex items-center">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="text-gray-400 mr-2 mt-2 text-xl"
                />

                <span className="text-gray-500 mt-2 ml-6">Logout</span>
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






