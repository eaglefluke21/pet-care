import React, { useState, useEffect, useRef } from "react";
import Breedssvg from "../assets/breeds.svg";
import Adoptsvg from "../assets/adopt.svg";
import Healthcaresvg from "../assets/healthcare.svg";
import Blogsvg from "../assets/blog.svg";
import Sidebarsvg from "../assets/sidebar.svg";



const Sidebar = ({onNavClick}) => {
  const [isNavVisible, setIsNavVisible] = useState(false);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navRef = useRef(null);

  const toggleNav = () => {
    setIsNavVisible(!isNavVisible);
  };

  // const toggleDropdown = () => {
  //   setIsDropdownVisible(!isDropdownVisible);
  // };

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
         

          <li className="relative top-20 " onClick={() => onNavClick('AdminBreed')}>
            <span
              className="flex items-center text-lg rounded-lg hover:bg-gray-400"
              // onClick={toggleDropdown}
            >
              <img src={Breedssvg} className="h-12 w-8 m-2" alt="Items" /> Breeds
            </span>
            {/* <ul
              className={`text-lg ${isDropdownVisible ? '' : 'hidden'} md:text-xl`}
              id="dropdown"
            >
              <li className="hover:bg-gray-300 rounded-lg ml-4 mb-2">All Items</li>
              <li className="hover:bg-gray-300 rounded-lg ml-4">Cart</li>
            </ul> */}
          </li>

          
          <li className="relative top-20" onClick={() => onNavClick('AdminAdopt')}>
            <span className="flex items-center text-lg rounded-lg hover:bg-gray-400">
             <img src={Adoptsvg} className="h-12 w-8 m-2" alt="Account" /> Adoption 
            </span>
          </li>
          

          <li className="relative top-20" onClick={()=> onNavClick('AdminHealthCare')}>
            <span className="flex items-center text-lg rounded-lg hover:bg-gray-400">
              <img src={Healthcaresvg} className="h-12 w-8 m-2" alt="Admin" /> Health & care
            </span>
          </li>

          <li className="relative top-20" onClick={() => onNavClick('AdminBlog')}>
            <span className="flex items-center text-lg rounded-lg hover:bg-gray-400">
              <img src={Blogsvg} className="h-12 w-8 m-2" alt="Data" /> Blog
            </span>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
