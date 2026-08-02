import { useState, useRef, useEffect } from 'react';
import { FiPhone } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const slides = [
  { id: 1, image: '/images/daladamaligawa.png', title: 'Dalada Maligawa', location: 'Central Province', route: '/temple-of-the-tooth' },
  { id: 2, image: '/images/sigiriya.png', title: 'Sigiriya Rock Fortress', location: 'Central Province', route: '/sigiriya-rock-fortress' },
  { id: 3, image: '/images/galvihara.png', title: 'Gal Viharaya', location: 'North Central Province', route: '/gal-viharaya' },
  { id: 4, image: '/images/galle fort.png', title: 'Galle Fort', location: 'Southern Province', route: '/galle-fort' },
];

const HeroSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const scrollLeft = (scrollRef.current as HTMLDivElement).scrollLeft;
      const width = (scrollRef.current as HTMLDivElement).offsetWidth;
      const index = Math.round(scrollLeft / width);
      setCurrentSlide(index);
    }
  };

  const scrollToSlide = (index: number) => {
    if (scrollRef.current) {
      const width = (scrollRef.current as HTMLDivElement).offsetWidth;
      (scrollRef.current as HTMLDivElement).scrollTo({
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

      {/* Gradient Overlay - Smooth transition to transparent */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-[#F8F6F1] via-[#F8F6F1]/80 to-transparent sm:from-[#F8F6F1] sm:via-[#F8F6F1]/70" />

      {/* Hero Content - Matching the design's typography */}
      <div className="relative z-20 w-full pt-4 sm:pt-6 md:pt-8 lg:pt-10 px-6 sm:px-8 md:px-[60px] lg:px-[100px]">
        {/* Constrained heading container */}
        <div className="pointer-events-auto max-w-[680px] lg:max-w-[820px]">
          <h1 className="font-serif font-medium text-[28px] sm:text-[38px] md:text-[42px] lg:text-[52px] leading-[1.1] text-[#1F5E4E] mt-0 mb-3 sm:mb-5 lg:mb-6 drop-shadow-sm">
            Discover the<br />
            Timeless <span className="text-[#CBA853]">Heritage</span><br />
            Of Sri Lanka
          </h1>
        </div>

        {/* Full width flex container - always horizontal row */}
        <div className="pointer-events-auto flex flex-row items-center justify-between gap-2 sm:gap-8 md:gap-20 lg:gap-32 mb-2 sm:mb-3 lg:mb-4 w-full">
          <p className="font-sans text-[10px] sm:text-[13px] md:text-[15px] lg:text-[16px] leading-[1.5] font-medium text-gray-700 opacity-90 max-w-[140px] sm:max-w-[300px] md:max-w-[320px] lg:max-w-[500px] shrink-0">
            Explore ancient kingdoms, sacred temples, archaeological wonders and <span className="hidden xl:inline-block"><br /></span>
            forgotten civilizations through an immersive digital journey across Sri Lanka
          </p>

          {/* Small Site Card & Navigation Dots */}
          <div className="z-50 flex flex-col items-start gap-1.5 shrink-0 w-fit">
            <div className="bg-[#F8F6F1] rounded-[6px] py-1.5 px-2 sm:py-2.5 sm:px-4 flex items-center justify-between gap-2 sm:gap-4 shadow-md border border-white/50">
              <div>
                <div className="font-bold text-[10px] sm:text-[14px] text-[#333] leading-tight">
                  {slides[currentSlide]?.title}
                </div>
                <div className="text-[9px] sm:text-[11px] text-gray-500 font-medium mt-0.5">
                  {slides[currentSlide]?.location}
                </div>
              </div>

              {slides[currentSlide]?.route.startsWith('/') ? (
                <Link 
                  to={slides[currentSlide].route}
                  className="text-[#1F5E4E] font-bold text-[8px] sm:text-[12px] no-underline hover:text-[#CBA853] flex items-center gap-0.5 sm:gap-1 transition-colors duration-200 whitespace-nowrap"
                >
                  View Details &rarr;
                </Link>
              ) : (
                <a 
                  href={slides[currentSlide]?.route}
                  className="text-[#1F5E4E] font-bold text-[8px] sm:text-[12px] no-underline hover:text-[#CBA853] flex items-center gap-0.5 sm:gap-1 transition-colors duration-200 whitespace-nowrap"
                >
                  View Details &rarr;
                </a>
              )}
            </div>

            <div className="flex items-center justify-start gap-1.5 pl-1">
              {slides.map((_, index) => (
                <button 
                  key={index}
                  onClick={() => scrollToSlide(index)}
                  className={`rounded-full transition-all duration-300 cursor-pointer border-none p-0 ${
                    currentSlide === index ? 'w-[20px] sm:w-[24px] h-[3px] bg-[#1F5E4E] shadow-sm' : 'w-1.5 h-1.5 bg-gray-400/50 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="pointer-events-auto">
          <a
            href="#contact-section"
            className="inline-flex items-center justify-center gap-1.5 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-[#1F5E4E] hover:bg-[#C5A253] text-white font-medium rounded-[6px] transition-all duration-300 w-fit no-underline shadow-md"
          >
            <FiPhone size={13} className="sm:w-[14px] md:w-[16px]" /> <span className="text-[0.75rem] sm:text-[0.8rem] md:text-[0.85rem]">Contact Us</span>
          </a>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-1 sm:bottom-1 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center pointer-events-none opacity-90">
        <span className="text-[10px] md:text-[11px] uppercase tracking-[0.25em] text-[#333] font-bold mb-1 ml-1">Scroll</span>
        <div className="w-[1px] h-[25px] sm:h-[35px] bg-[#CBA853]"></div>
      </div>
    </section>
  );
};

export default HeroSection;
