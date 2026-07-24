import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer
      className="relative overflow-hidden border-t-[3px] border-[#2a4a3a] shadow-[0_-10px_20px_rgba(0,0,0,0.03)] rounded-t-[10px]"
      style={{ backgroundColor: "#F8F6F1" }}
    >
      {/* Decorative Background */}
      <div
        className="absolute left-1/2 bottom-[70px] z-0 h-[110px] w-[92%] max-w-[420px] -translate-x-1/2 opacity-100 pointer-events-none md:bottom-0 md:h-[160px]"
        style={{
          backgroundImage: "url('/images/Group_47.png')",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center bottom",
          backgroundSize: "100% auto",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-10 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-6 md:gap-10 pb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <img
              src="/images/LOGO.png"
              alt="Sri Lanka Heritage"
              className="h-[55px] w-auto mb-4 object-contain"
            />

            <p className="text-text-muted text-[0.8rem] leading-[1.65] max-w-[240px] mb-5">
              Explore ancient kingdoms, sacred temples, archaeological
              wonders, and forgotten civilizations through an immersive
              digital journey across Sri Lanka.
            </p>

            <div className="flex gap-2">
              {/* Instagram */}
              <a
                href="#"
                className="w-7 h-7 rounded flex items-center justify-center bg-[#2a4a3a] text-white hover:opacity-80"
              >
                <FaInstagram className="w-4 h-4" />
              </a>

              {/* Facebook */}
              <a
                href="#"
                className="w-7 h-7 rounded flex items-center justify-center bg-[#2a4a3a] text-white hover:opacity-80"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a
                href="#"
                className="w-7 h-7 rounded flex items-center justify-center bg-[#2a4a3a] text-white hover:opacity-80"
              >
                <FaYoutube className="w-4 h-4" />
              </a>

              {/* TikTok */}
              <a
                href="#"
                className="w-7 h-7 rounded flex items-center justify-center bg-[#2a4a3a] text-white hover:opacity-80"
              >
                <FaTiktok className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Explore */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">Explore</h4>

            <ul className="space-y-3">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/">All Places</Link></li>
              <li><Link to="/">Our Mission</Link></li>
              <li><Link to="/">Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-lg font-bold mb-4">Resources</h4>

            <ul className="space-y-3">
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms & Conditions</Link></li>
              <li><Link to="/">FAQs</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-lg font-bold mb-4">Stay Updated</h4>

            <p className="text-sm mb-4">
              Subscribe to our newsletter for the latest heritage stories &
              updates.
            </p>

            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex border border-gold rounded-lg overflow-hidden"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent outline-none"
              />

              <button
                type="submit"
                className="px-4 hover:text-deep-green transition"
              >
                →
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 bg-white border-t py-4 px-10">
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 gap-2 text-[10px] md:grid-cols-3 md:text-xs">
          <span className="whitespace-nowrap">© 2026 HeritageSriLanka</span>

          <div className="text-center whitespace-nowrap">
            <Link to="/admin">Login as Admin</Link>
          </div>

          <span className="col-span-2 text-center whitespace-nowrap md:col-span-1 md:text-right">
            Design by Design by Evon Technology Software Solution (PVT) Ltd
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;