'use client';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faClipboard, faBriefcase, faGear, faClipboardList, faList, faBars } from '@fortawesome/free-solid-svg-icons';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

// Import logo image 
import logo from '../../assets/Logo.png';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="flex relative">
      <button
        onClick={toggleSidebar}
        className={`md:hidden fixed top-1 left-1 p-4 z-30 ${isOpen ? 'hidden' : ''}`}
      >
        <FontAwesomeIcon icon={faBars} className="text-gray-600 text-xl" />
      </button>

      <div
        ref={sidebarRef}
        className={`bg-white shadow-md h-screen w-64 transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 fixed md:relative z-20 top-0`}
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
              { icon: faHome, label: 'Dashboard' },
              { icon: faList, label: 'Categories' },
              { icon: faUser, label: 'User' },
              { icon: faClipboard, label: 'Booking' },
              { icon: faClipboardList, label: 'Services' },
              { icon: faBriefcase, label: 'Jobs' },
              { icon: faGear, label: 'Settings' },
            ].map(({ icon, label }) => (
              <li key={label} className="flex items-center p-2 hover:bg-gray-100 rounded cursor-pointer">
                <FontAwesomeIcon icon={icon} className="text-gray-400 mr-6" />
                <span className="text-gray-500">{label}</span>
              </li>
            ))}
          </ul>
        </nav>
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
