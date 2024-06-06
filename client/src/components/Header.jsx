import React from 'react';
import Logo from './Logo';
import Nav from './Nav';

const Header = ({ hasjwt, handleLogout }) => {
    
    return (
        <>
            <header className=" bg-white top-0 z-[20] mx-auto flex  w-full items-center justify-center flex-wrap py-4">

                  <Logo/>
                    
                    <Nav hasjwt={hasjwt} handleLogout={handleLogout} />

            </header>
        </>
    )
}

export default Header;