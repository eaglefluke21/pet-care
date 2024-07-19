import React, { useState, useEffect, useRef } from "react";
import Homesvg from "../assets/home.svg";
import Bagsvg from "../assets/bag.svg";
import Accountsvg from "../assets/account.svg";
import Dashboardsvg from "../assets/dashboard.svg";
import Datasvg from "../assets/data.svg";
import Sidebarsvg from "../assets/sidebar.svg";

const Sidebar = () => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navRef = useRef(null);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setIsNavVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <div ref={navRef}>
      <div className="absolute top-14 left-0 ">
        <img src={Sidebarsvg} className="h-24 w-14" onClick={toggleNav} />
      </div>

      <nav
        className={`absolute top-0 left-0 z-10 h-dvh w-36 bg-white font-anta font-bold rounded-r-lg transition ease-in-out delay-500 transform ${isNavVisible ? '' : '-translate-x-full'} md:w-52`}
        id="nav"
      >
        <ul>
          <li className="relative top-20">
            <span className="flex items-center text-lg rounded-lg hover:bg-gray-400">
              <img src={Homesvg} className="h-11 w-7 m-2" alt="Home" /> Home
            </span>
          </li>

          <li className="relative top-20">
            <span
              className="flex items-center text-lg rounded-lg hover:bg-gray-400"
              onClick={toggleDropdown}
            >
              <img src={Bagsvg} className="h-12 w-8 m-2" alt="Items" /> Items
            </span>
            <ul
              className={`text-lg ${isDropdownVisible ? '' : 'hidden'} md:text-xl`}
              id="dropdown"
            >
              <li className="hover:bg-gray-300 rounded-lg ml-4 mb-2">All Items</li>
              <li className="hover:bg-gray-300 rounded-lg ml-4">Cart</li>
            </ul>
          </li>

          <li className="relative top-20">
            <span className="flex items-center text-lg rounded-lg hover:bg-gray-400">
              <img src={Accountsvg} className="h-12 w-8 m-2" alt="Account" /> Account
            </span>
          </li>

          <li className="relative top-20">
            <span className="flex items-center text-lg rounded-lg hover:bg-gray-400">
              <img src={Dashboardsvg} className="h-12 w-8 m-2" alt="Admin" /> Admin
            </span>
          </li>

          <li className="relative top-20">
            <span className="flex items-center text-lg rounded-lg hover:bg-gray-400">
              <img src={Datasvg} className="h-12 w-8 m-2" alt="Data" /> Data
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
