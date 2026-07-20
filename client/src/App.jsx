import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import PartnersSection from './components/PartnersSection';
import MapSection from './components/MapSection';
import FeaturesSection from './components/FeaturesSection';
import ContactSection from './components/ContactSection';

function App() {
  return (
    <div className="font-sans antialiased text-text-dark bg-cream selection:bg-gold selection:text-deep-green">
      <Navbar />
      <main>
        <HeroSection />
        <PartnersSection />
        <MapSection />
        <FeaturesSection />
        <ContactSection />
      </main>

      <footer className="relative overflow-hidden border-t-[3px] border-[#2a4a3a] shadow-[0_-10px_20px_rgba(0,0,0,0.03)] rounded-t-[10px]" style={{ backgroundColor: '#F8F6F1' }}>
        {/* Decorative heritage pattern background */}
        <div className="absolute inset-0 z-0 opacity-[0.8] pointer-events-none"
          style={{
            backgroundImage: "url('/images/Group_47.png')",
            backgroundRepeat: 'repeat-x',
            backgroundPosition: 'center 75%',
            backgroundSize: 'contain',
          }}
        ></div>

        {/* Footer Main Content */}
        <div className="relative z-10 max-w-[1200px] mx-auto px-10 pt-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr_1fr_1.4fr] gap-10 pb-10">

            {/* Brand Column */}
            <div>
              <img src="/images/LOGO.png" alt="Sri Lanka Heritage" className="h-[55px] w-auto mb-4 object-contain" />
              <p className="text-text-muted text-[0.8rem] leading-[1.65] max-w-[240px] mb-5">
                Explore ancient kingdoms, sacred temples, archaeological wonders and forgotten civilizations through an immersive digital journey across Sri Lanka.
              </p>
              {/* Social Icons */}
              <div className="flex gap-2">
                <a href="#" className="w-[28px] h-[28px] rounded flex items-center justify-center text-white text-[0.7rem] no-underline transition-opacity duration-200 hover:opacity-80 bg-[#2a4a3a]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" /></svg>
                </a>
                <a href="#" className="w-[28px] h-[28px] rounded flex items-center justify-center text-white text-[0.8rem] no-underline transition-opacity duration-200 hover:opacity-80 bg-[#2a4a3a]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 320 512"><path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" /></svg>
                </a>
                <a href="#" className="w-[28px] h-[28px] rounded flex items-center justify-center text-white text-[0.7rem] no-underline transition-opacity duration-200 hover:opacity-80 bg-[#2a4a3a]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 576 512"><path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" /></svg>
                </a>
                <a href="#" className="w-[28px] h-[28px] rounded flex items-center justify-center text-white text-[0.7rem] no-underline transition-opacity duration-200 hover:opacity-80 bg-[#2a4a3a]">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 448 512"><path d="M448 209.91a210.06 210.06 0 0 1-122.77-39.25V349.38A162.55 162.55 0 1 1 185 188.31V278.2a74.62 74.62 0 1 0 52.23 71.18V0l88 0a121.18 121.18 0 0 0 1.86 22.17h0A122.18 122.18 0 0 0 381 102.39a121.43 121.43 0 0 0 67 20.14Z" /></svg>
                </a>
              </div>
            </div>

            {/* Explore Column */}
            <div>
              <div className="mb-5">
                <h4 className="text-text-dark text-[1.05rem] font-bold">Explore</h4>
                <div className="w-[40px] h-[2px] bg-gold mt-1.5 rounded-full"></div>
              </div>
              <ul className="list-none p-0 m-0 space-y-3">
                {['Collaboration', 'All Places', 'Our Mission', 'Contact Us'].map((item) => (
                  <li key={item}><a href="#" className="text-text-muted hover:text-deep-green no-underline transition-colors text-[0.85rem] font-medium">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Resources Column */}
            <div>
              <div className="mb-5">
                <h4 className="text-text-dark text-[1.05rem] font-bold">Resourses</h4>
                <div className="w-[40px] h-[2px] bg-gold mt-1.5 rounded-full"></div>
              </div>
              <ul className="list-none p-0 m-0 space-y-3">
                {['Privacy & Policy', 'Terms & Conditions', 'FAQs'].map((item) => (
                  <li key={item}><a href="#" className="text-text-muted hover:text-deep-green no-underline transition-colors text-[0.85rem] font-medium">{item}</a></li>
                ))}
              </ul>
            </div>

            {/* Stay Updated Column */}
            <div>
              <div className="mb-5">
                <h4 className="text-text-dark text-[1.05rem] font-bold">Stay Updated</h4>
                <div className="w-[40px] h-[2px] bg-gold mt-1.5 rounded-full"></div>
              </div>
              <p className="text-text-muted text-[0.8rem] leading-[1.55] mb-4">
                Subscribe to our newsletter for the latest<br />heritage stories & updates
              </p>
              <form onSubmit={(e) => e.preventDefault()} className="flex items-center border border-gold rounded-[8px] overflow-hidden bg-transparent">
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className="flex-1 bg-transparent px-4 py-2.5 text-[0.8rem] text-text-dark outline-none placeholder:text-text-muted font-medium"
                />
                <button type="submit" className="px-4 py-2.5 text-text-muted font-bold text-[1.2rem] hover:text-deep-green transition-colors duration-200 cursor-pointer bg-transparent border-none">→</button>
              </form>
            </div>

          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="relative z-10 bg-white py-4 px-10 border-t border-[#e8e8e8]">
          <div className="max-w-[1200px] mx-auto grid grid-cols-3 items-center gap-4 text-text-dark text-[0.7rem] font-medium">
            <span className="text-left">2026@HeritageSriLanka</span>
            <a href="#" className="text-text-dark hover:text-deep-green no-underline transition-colors text-center">Login as a Admin</a>
            <span className="text-right">Design by Evon Technology Software Solution (PVT) Ltd</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
