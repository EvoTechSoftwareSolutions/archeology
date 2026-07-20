import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <Link 
          to="/" 
          className="text-2xl font-bold text-blue-600"
        >
          Archeology
        </Link>


        {/* Navigation Links */}
        <div className="flex gap-6">

          <Link 
            to="/"
            className="hover:text-blue-600"
          >
            Home
          </Link>

          <Link 
            to="/heritage"
            className="hover:text-blue-600"
          >
            Heritage
          </Link>

          <Link 
            to="/about"
            className="hover:text-blue-600"
          >
            About
          </Link>

          <Link 
            to="/contact"
            className="hover:text-blue-600"
          >
            Contact
          </Link>

        </div>


        {/* Login Button */}
        <Link
          to="/login"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </Link>


      </div>
    </nav>
  );
};

export default Navbar;