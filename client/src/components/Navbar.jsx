import React from 'react';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[2000] border-b border-gold/25 px-10 flex items-center justify-between h-[80px]" style={{ backgroundColor: '#F8F6F1' }}>
      {/* Left Side: Logo */}
      <a href="#" className="flex items-center no-underline">
        <img src="/images/LOGO.png" alt="Sri Lanka Heritage Logo" className="h-[44px] w-auto" />
      </a>
      
     
     
    </nav>
  );
};

export default Navbar;
