import React from "react";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import close from "../assets/close.svg"
import { useEffect } from "react";

const NavLinks = () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false); // Initial login state

    useEffect(() => {
      const jwtToken = sessionStorage.getItem('jwToken');
      setIsLoggedIn(!!jwtToken); // Set login state based on token existence
    }, []); // Run only once on component mount
  
    const handleLogout = () => {
      sessionStorage.removeItem('jwToken');
      setIsLoggedIn(false); // Update state for immediate UI change
    };


    return (
        <>
            <NavLink to="/home" className="  sm:text-xl font-quick  w-full text-center lg:w-auto hover:bg-gray-200 lg:hover:bg-transparent  "> Home</NavLink>
            <NavLink to="/Breeds" className="  sm:text-xl font-quick   w-full text-center lg:w-auto hover:bg-gray-200 lg:hover:bg-transparent "> Breeds</NavLink>
            <NavLink to="/Adoption" className=" sm:text-xl font-quick w-full text-center lg:w-auto hover:bg-gray-200 lg:hover:bg-transparent ">Adoption</NavLink>
            <NavLink to="/Health" className=" sm:text-xl font-quick  w-full text-center lg:w-auto hover:bg-gray-200 lg:hover:bg-transparent "> Health & Care</NavLink>
            <NavLink to="/Blog" className=" sm:text-xl font-quick  w-full text-center lg:w-auto hover:bg-gray-200 lg:hover:bg-transparent "> Blog</NavLink>
            <NavLink to="/Admin" className=" sm:text-xl font-quick  w-full text-center lg:w-auto hover:bg-gray-200 lg:hover:bg-transparent ">Admin</NavLink>
            <NavLink to="/" className="lg:ml-auto lg:pr-8"> {isLoggedIn ? (<button onClick={handleLogout} className="bg-black sm:py-2 sm:px-3 py-1 px-8 rounded-md text-sm font-quick text-white "> Logout </button>) : (<button className="bg-black sm:py-2 sm:px-3 py-1 px-8 rounded-md text-sm font-quick text-white "> Log In</button>)  }  </NavLink>
        </>
    )

};

const Nav = () => {
    const [isOpen, SetIsOpen] = useState(false);

    const toggleNavbar = () => {
        SetIsOpen(!isOpen);
    };


    return (
        <>
            <nav className="">
                <div className="hidden lg:flex  gap-x-10 ">
                    <NavLinks  />
                </div>

                <div className="lg:hidden">
                    <button onClick={toggleNavbar} className="pr-8">
                        {isOpen ? <span className="   text-3xl font-quick text-black" > <img src={close} className="h-8 w-8" /> </span> : <span className="bg-black py-2 px-3 rounded-lg text-sm font-comic text-white "> Menu</span>}
                    </button>
                </div>

            </nav>

            {isOpen && (
                <div className="flex flex-col basis-full items-center gap-2 shadow-md py-4 lg:hidden">
                    <NavLinks />
                </div>
            )}

        </>
    )
};

export default Nav;