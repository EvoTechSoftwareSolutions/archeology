import React, { useState } from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/v1/newsletter/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.message || "Unable to subscribe right now.");
      }

      setStatusMessage(payload.message || "You are subscribed!");
      setEmail("");
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <footer
      className="relative overflow-hidden border-t-[3px] border-[#2a4a3a] shadow-[0_-10px_20px_rgba(0,0,0,0.03)] rounded-t-[10px]"
      style={{ backgroundColor: "#F8F6F1" }}
    >
     {/* Decorative Background */}
      <div
        className="absolute inset-0 z-0 opacity-80 pointer-events-none footer-decorative-bg"
        style={{
          backgroundImage: "url('/images/Group_47.png')",
          backgroundRepeat: "repeat-x",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-10 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-6 md:gap-10 pb-10">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="inline-flex">
              <img
                src="/images/LOGO.png"
                alt="Sri Lanka Heritage"
                className="h-[55px] w-auto mb-4 object-contain"
              />
            </Link>

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
                href="https://www.facebook.com/Arch.SriLanka"
                target="_blank"
                rel="noopener noreferrer"
                className="w-7 h-7 rounded flex items-center justify-center bg-[#2a4a3a] text-white hover:opacity-80"
              >
                <FaFacebookF className="w-4 h-4" />
              </a>

              {/* YouTube */}
              <a
                href="https://www.youtube.com/channel/UCej4Z-DEipbbHUctEDJJ4Fg"
                target="_blank"
                rel="noopener noreferrer"
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
            <h4 className="text-base lg:text-lg font-bold mb-4">Explore</h4>

            <ul className="space-y-2 md:space-y-2 lg:space-y-3 text-xs sm:text-sm lg:text-base">
              <li><Link to="/" className="block py-0.5 md:py-0">Home</Link></li>
              <li><Link to="/all-places" className="block py-0.5 md:py-0">All Places</Link></li>
              <li><Link to="/our-mission" className="block py-0.5 md:py-0">Our Mission</Link></li>
              <li><Link to="/contact-us" className="block py-0.5 md:py-0">Contact Us</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h4 className="text-base lg:text-lg font-bold mb-4">Resources</h4>

            <ul className="space-y-2 md:space-y-2 lg:space-y-3 text-xs sm:text-sm lg:text-base">
              <li><Link to="/privacy-policy" className="block py-0.5 md:py-0">Privacy Policy</Link></li>
              <li><Link to="/terms-and-conditions" className="block py-0.5 md:py-0">Terms &amp; Conditions</Link></li>
              <li><Link to="/faqs" className="block py-0.5 md:py-0">FAQs</Link></li>
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
              onSubmit={handleSubscribe}
              className="flex border border-gold rounded-lg overflow-hidden"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-transparent outline-none"
                required
              />

              <button
                type="submit"
                disabled={isLoading}
                className="px-4 hover:text-deep-green transition disabled:opacity-60"
              >
                {isLoading ? "..." : "→"}
              </button>
            </form>

            {statusMessage && (
              <p className="text-sm mt-3 text-[#2a4a3a]">{statusMessage}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="relative z-10 bg-white border-t py-4 px-6 md:px-10">
        <div className="max-w-[1200px] mx-auto text-[10px] md:text-xs">
          {/* Row 1 — copyright left, Login right (both screens) */}
          <div className="flex items-center justify-between mb-1 md:mb-0 md:hidden">
            <span className="whitespace-nowrap">© 2026 HeritageSriLanka</span>
            <Link to="/admin/login" className="whitespace-nowrap">Login as Admin</Link>
          </div>

          {/* Row 2 — Design by centred on mobile only */}
          <div className="text-center md:hidden">
            <span className="whitespace-nowrap">Design by Evon Technology Software Solution (PVT) Ltd</span>
          </div>

          {/* Desktop — all three in one row */}
          <div className="hidden md:flex items-center justify-between">
            <span className="whitespace-nowrap">© 2026 HeritageSriLanka</span>
            <Link to="/admin/login" className="whitespace-nowrap">Login as Admin</Link>
            <span className="whitespace-nowrap text-right">Design by Evon Technology Software Solution (PVT) Ltd</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
