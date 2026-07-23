import { useState, useRef, useEffect } from 'react';
import { FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const slides = [
  { id: 1, image: '/images/daladamaligawa.png', title: 'Dalada Maligawa', location: 'Central Province' },
  { id: 2, image: '/images/sigiriya.png', title: 'Sigiriya Rock Fortress', location: 'Central Province' },
  { id: 3, image: '/images/galvihara.png', title: 'Gal Viharaya', location: 'North Central Province' },
  { id: 4, image: '../src/assets/galle fort.png', title: 'Galle Fort', location: 'Southern Province' },
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
    }, 4000);

    return () => clearInterval(timer);
  }, [currentSlide]);

  return (
    /* Adjusted height to h-[440px] for a perfectly balanced mobile frame */
    <section id="home" className="relative w-full h-[440px] sm:h-[480px] md:h-[540px] lg:h-screen lg:min-h-[600px] flex flex-col justify-between overflow-hidden">
      
      {/* Background Slider */}
      <div 
        ref={scrollRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-0 flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <style dangerouslySetInnerHTML={{__html: `::-webkit-scrollbar { display: none; }`}} />
        {slides.map((slide) => (
          <div 
            key={slide.id}
            className="w-full flex-shrink-0 h-full snap-center bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
        ))}
      </div>

      {/* Gradient Overlay - Slightly softened for a more premium look */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#F8F6F1]/95 via-[#F8F6F1]/75 to-transparent sm:from-[#F8F6F1]/90 sm:via-[#F8F6F1]/50" />

      {/* Hero Content - Increased pt-10 to give it breathing room from the header */}
      <div className="relative z-20 w-full pt-10 sm:pt-14 md:pt-20 lg:pt-28 px-5 sm:px-8 md:px-[50px] lg:px-[80px]">
        <div className="pointer-events-auto max-w-[310px] sm:max-w-[440px] md:max-w-[540px] lg:max-w-[620px]">
          
          <h1 className="font-serif font-bold text-[28px] sm:text-[36px] md:text-[46px] lg:text-[60px] leading-[1.15] text-[#1F5E4E] mt-0 mb-2 sm:mb-3 lg:mb-5">
            Discover the<br />
            Timeless <span className="text-[#C5A253]">Heritage</span><br />
            Of Sri Lanka
          </h1>
          
          <p className="font-sans text-[12.5px] sm:text-[14px] md:text-[15px] lg:text-[17px] leading-[1.5] text-gray-800 mb-4 sm:mb-5 lg:mb-8 opacity-90">
            Explore ancient kingdoms, sacred temples, archaeological wonders and <br className="hidden lg:block" />
            forgotten civilizations through an immersive digital journey across Sri Lanka
          </p>
          
          {/* Contact Us Button - Restored to proper, touch-friendly proportions */}
          <a 
            href="#contact-section" 
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-[#1F5E4E] hover:bg-[#C5A253] text-white font-medium text-[0.8rem] sm:text-[0.875rem] md:text-[0.95rem] rounded-[6px] transition-all duration-300 w-fit no-underline shadow-md"
          >
            <FiPhone size={13} className="sm:w-[15px] md:w-[16px]" /> Contact Us
          </a>

        </div>
      </div>

      {/* Bottom Floating Card & Navigation Dots */}
      <div className="absolute bottom-4 right-4 md:bottom-10 md:right-[60px] z-20 flex flex-col items-end gap-1.5 pointer-events-auto">
        
        {/* Floating Site Card */}
        <div className="bg-white/95 backdrop-blur-md rounded-[10px] sm:rounded-[12px] py-2 px-3 sm:py-3 sm:px-5 md:py-3.5 md:px-6 flex items-center justify-between gap-4 sm:gap-6 md:gap-8 shadow-[0_8px_20px_rgba(0,0,0,0.08)] min-w-[190px] sm:min-w-[260px] md:min-w-[320px] border border-white/50">
          <div>
            <div className="font-bold text-[0.75rem] sm:text-[0.9rem] md:text-[1.05rem] text-[#1a3a2a] leading-tight">
              {slides[currentSlide]?.title}
            </div>
            <div className="text-[0.65rem] sm:text-[0.78rem] text-gray-500 mt-0.5">
              {slides[currentSlide]?.location}
            </div>
          </div>

          {slides[currentSlide]?.id === 1 ? (
            <Link 
              to="/temple-of-the-tooth" 
              className="text-[#1a3a2a] font-semibold text-[0.65rem] sm:text-[0.78rem] md:text-[0.85rem] no-underline hover:text-[#C5A253] flex items-center gap-1 transition-colors duration-200 whitespace-nowrap"
            >
              View Details <span className="text-[0.8rem] sm:text-[1.1rem]">&rarr;</span>
            </Link>
          ) : (
            <a 
              href="#explore" 
              className="text-[#1a3a2a] font-semibold text-[0.65rem] sm:text-[0.78rem] md:text-[0.85rem] no-underline hover:text-[#C5A253] flex items-center gap-1 transition-colors duration-200 whitespace-nowrap"
            >
              View Details <span className="text-[0.8rem] sm:text-[1.1rem]">&rarr;</span>
            </a>
          )}
        </div>

        {/* Navigation Dots */}
        <div className="flex items-center justify-center gap-1.5 pr-1 sm:pr-3">
          {slides.map((_, index) => (
            <button 
              key={index}
              onClick={() => scrollToSlide(index)}
              className={`rounded-full transition-all duration-300 cursor-pointer border-none p-0 ${
                currentSlide === index ? 'w-[20px] sm:w-[32px] h-[3.5px] sm:h-[5px] bg-white shadow-sm' : 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/50 hover:bg-white'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
};

export default HeroSection;