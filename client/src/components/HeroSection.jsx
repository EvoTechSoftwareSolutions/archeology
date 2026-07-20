import React, { useState, useRef, useEffect } from 'react';

const slides = [
  { id: 1, image: '/images/daladamaligawa.png', title: 'Dalada Maligawa', location: 'Central Province' },
  { id: 2, image: '/images/sigiriya.png', title: 'Sigiriya Rock Fortress', location: 'Central Province' },
  { id: 3, image: '/images/galvihara.png', title: 'Gal Viharaya', location: 'North Central Province' },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = scrollRef.current.scrollLeft;
      const width = scrollRef.current.offsetWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentSlide(index);
    }
  };

  const scrollToSlide = (index) => {
    if (scrollRef.current) {
      const width = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: width * index,
        behavior: 'smooth'
      });
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = (currentSlide + 1) % slides.length;
      scrollToSlide(nextIndex);
    }, 4000); // Auto-scroll every 4 seconds

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    <section id="home" className="relative h-screen min-h-[450px] flex items-stretch overflow-hidden">
      
      {/* Horizontally Scrolling Backgrounds */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-0 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Hide Webkit Scrollbar */}
        <style dangerouslySetInnerHTML={{__html: `
          ::-webkit-scrollbar { display: none; }
        `}} />
        
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="w-full flex-shrink-0 h-full snap-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          ></div>
        ))}
      </div>

      {/* Left Content Pane with linear gradient overlay (pointer-events-none so we can swipe background) */}
      <div 
        className="absolute inset-0 z-10 w-full flex flex-col justify-center px-[80px] py-[50px] pointer-events-none"
        style={{ background: "linear-gradient(to right, rgba(245, 240, 232, 1) 0%, rgba(245, 240, 232, 0.85) 35%, rgba(245, 240, 232, 0) 75%)" }}
      >
        <div className="pointer-events-auto w-fit">
          <h1 className="font-serif font-bold text-[75px] leading-[1.15] text-[#1F5E4E] mb-6">
            Discover the<br />
            Timeless <span className="text-gold">Heritage</span><br />
            Of Sri Lanka
          </h1>
          
          <p className="font-sans text-[18px] leading-[1.6] text-text-dark max-w-[500px] mb-8 opacity-90">
            Explore ancient kingdoms, sacred temples, archaeological wonders and 
            forgotten civilizations through an immersive digital journey across Sri Lanka
          </p>
          
          <a 
            href="#contact-section" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1F5E4E] hover:bg-gold text-white hover:text-deep-green font-semibold text-[0.95rem] rounded-[6px] transition-all duration-200 w-fit no-underline shadow-md"
          >
            <span>📞</span> Contact Us
          </a>
        </div>
      </div>

      {/* Floating Site Card - Bottom Right */}
      <div className="absolute bottom-[40px] right-[60px] z-20 bg-white rounded-[12px] py-4 px-6 flex items-center justify-between gap-10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] min-w-[340px] pointer-events-auto transition-all duration-300">
        <div>
          <div className="font-bold text-[1.1rem] text-[#1a3a2a]">{slides[currentSlide]?.title}</div>
          <div className="text-[0.85rem] text-[#7a7a6a] mt-0.5">{slides[currentSlide]?.location}</div>
        </div>
        <a href="#explore" className="text-[#1a3a2a] font-semibold text-[0.85rem] no-underline hover:text-gold flex items-center gap-1 transition-colors duration-200">
          View Details <span className="text-[1.1rem]">&rarr;</span>
        </a>
      </div>

      {/* Slide Dots - Centered under the Card */}
      <div className="absolute bottom-[20px] right-[215px] z-20 flex items-center gap-1.5 pointer-events-auto">
        {slides.map((_, index) => (
          <button 
            key={index}
            onClick={() => scrollToSlide(index)}
            className={`rounded-full transition-all duration-300 cursor-pointer border-none p-0 ${
              currentSlide === index ? 'w-[32px] h-[5px] bg-white' : 'w-1.5 h-1.5 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      
    </section>
  );
};

export default HeroSection;
