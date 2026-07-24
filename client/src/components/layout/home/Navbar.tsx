

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-[2000] border-b border-gold/25 px-4 md:px-10 flex items-center justify-between h-[80px]" style={{ backgroundColor: '#F8F6F1' }}>
      {/* Left Side: Logo */}
      <a href="#" className="flex items-center no-underline">
        <img src={logoImg} alt="Sri Lanka Heritage Logo" className="h-[36px] md:h-[44px] w-auto" />
      </a>
      
     
     
    </nav>
  );
};

export default Navbar;
