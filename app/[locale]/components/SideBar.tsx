"use client";

import Image from "next/image";
import { useState, useEffect, useRef } from "react";

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
  faMessage,
  faCreditCard,
  faImage
} from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// import Link from "next/link";
import { usePathname } from "next/navigation";
import {useTranslations} from 'next-intl';
import { use } from "i18next";
import { useRouter } from "next/router";
import {Link} from '@/i18n/routing';

const Sidebar = () => {
  const t = useTranslations('sideBar');
  // const { locale } = useRouter();

  const [pathName, setPathName] = useState("");

  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const path = usePathname()
  const segments = path.split('/').filter(Boolean); 
  const language = segments[0]; 
  const actualPath = segments.slice(1).join('/'); 

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
    } else if (path.includes("dashboard")) {
      setPathName("dashboard");
    } else if (path.includes("payments")) {
      setPathName("/payments");
    }else if (path.includes("banner")) {
      setPathName("/banner");
      
    } else if (path.includes('chat')) {
      setPathName("/chat");
      return
    } 
  }, [path]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current) {
      setIsOpen(false);
      return
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


  const hidePath = ["/it" , "/en"];

  if (hidePath.includes(path)) {
    return null;
  }

 
  

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
        <Link href={`/dashboard`}>
          <div className="flex items-center p-4 ml-1 mb-5 mt-1 ">
            <Image
              src="/assets/Logo.png"
              alt="Logo"
              width={38}
              height={388}
              className="mr-2 ml-4 mt-1"
            />
            <h1 className="text-xl font-bold text-[#343C6A] mt-2 ml-2">
              Pulizie Di Casa
            </h1>
          </div>
        </Link>

        <nav className="mt-4 ml-7">
          <ul className="space-y-2 mr-3">
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href={`/dashboard`} passHref>
              
                <FontAwesomeIcon
                  icon={faHome}
                  className={`mr-[1.68rem] text-xl ${
                    pathName === "dashboard"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`mr-2 ${
                    pathName === "dashboard"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                >
                  {(t('dashboard'))}
                  
                </span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href={`/categories`}  passHref>
                <FontAwesomeIcon
                  icon={faList}
                  className={`mr-7 text-xl ${
                    pathName === "/categories"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`mr-[1.70rem] ${
                    pathName === "/categories"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                >
                   {(t('categories'))}
                </span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/additionalServices" passHref>
                <FontAwesomeIcon
                  icon={faWrench}
                  className={`mr-7 text-xl ${
                    pathName === "/additionalServices"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`mr-2 ${
                    pathName === "/additionalServices"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                >
                 
                 {(t('additional_services'))}
                </span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/users" passHref>
                <FontAwesomeIcon
                  icon={faUser}
                  className={`mr-7 text-xl ${
                    pathName === "/users" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`ml-1 ${
                    pathName === "/users" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                >
                  
                  {(t('users'))}
                </span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/bookings" passHref>
                <FontAwesomeIcon
                  icon={faCalendarAlt}
                  className={`mr-7 text-xl ${
                    pathName === "/bookings"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`ml-1 ${
                    pathName === "/bookings"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                >
                  
                  {(t('bookings'))}
                </span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/services" passHref>
                <FontAwesomeIcon
                  icon={faSuitcase}
                  className={`mr-7 text-xl ${
                    pathName === "/services"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`ml-[0.7px] ${
                    pathName === "/services"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                >
                  
                  {(t('services'))}
                </span>
              </Link>
            </li>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/jobs" passHref>
                <FontAwesomeIcon
                  icon={faSuitcase}
                  className={`mr-7 text-xl ${
                    pathName === "/jobs" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`mr-2 ${
                    pathName === "/jobs" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                >
                  
                  {(t('jobs'))}
                </span>
              </Link>
            </li>

            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/payments" passHref>
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className={`mr-7 text-xl ${
                    pathName === "/payments" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`mr-2 ${
                    pathName === "/payments" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                >
                  
                  {(t('payments'))}
                </span>
              </Link>
            </li>



            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/banner" passHref>
                <FontAwesomeIcon
                  icon={faImage}
                  className={`mr-7 text-xl ${
                    pathName === "/banner" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`mr-2 ${
                    pathName === "/banner" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                >
                  
                  {(t('banner'))}
                </span>
              </Link>
            </li>



           

            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/chat" passHref>
                <FontAwesomeIcon
                  icon={faMessage}
                  className={`mr-7 text-xl ${
                    pathName === "/chat" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                />
                <span
                  className={`ml-[0.7px] ${
                    pathName === "/chat" ? "text-[#00BFFF]" : "text-gray-400"
                  }`}
                >
                  
                  {(t('chat'))}
                </span>
              </Link>
            </li>
            
            
            <li className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer ml-1">
              <Link href="/settings" passHref>
                <FontAwesomeIcon
                  icon={faGear}
                  className={`mr-7 text-xl ${
                    pathName === "/settings"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                />
                <span
                  className={`mr-2 ${
                    pathName === "/settings"
                      ? "text-[#00BFFF]"
                      : "text-gray-400"
                  }`}
                >
                  
                  {(t('settings'))}
                </span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="absolute bottom-4 left-0 w-full px-9">
          <button className="flex items-center w-full p-2 hover:bg-red-100 rounded cursor-pointer">
            <Link href="/logout" passHref>
              <p className="flex items-center">
                <FontAwesomeIcon
                  icon={faSignOutAlt}
                  className="text-gray-400 mr-7 mt-2 text-xl"
                />
                <span className="text-gray-500 mt-2 mr-2">  {(t('logout'))}</span>
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






































































