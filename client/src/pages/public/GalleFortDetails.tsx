
import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiPhone, FiCheck, FiInfo, FiUsers, FiSun, FiCoffee, FiHome, FiDroplet, FiPlus, FiWind, FiTruck, FiMap, FiCamera, FiNavigation, FiXCircle, FiCheckCircle, FiX, FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import avatarImg from '../../assets/avatar.png';
import buddhaImg from '../../assets/image 35.png';
import mandalaImg from '../../assets/image 36.png';
import galleFort from '../../assets/places-gallefort.png';
import gf2 from '../../assets/GF2.png';
import gf3 from '../../assets/GF3.jpg';
import sigiriya from '../../assets/places-sigiriya.png';
import galViharaya from '../../assets/galvihara.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import EmergencyContactsCard from '../../components/EmergencyContactsCard';

const heroSlides = [
  {
    id: 1,
    image: galleFort,
    subtitle: 'FORTIFIED COASTAL CITY',
    desc: 'A living colonial-era fort city overlooking the Indian Ocean, shaped by Portuguese, Dutch, British, and Sri Lankan history.',
  },
  {
    id: 2,
    image: gf2,
    subtitle: 'RAMPARTS AND LIGHTHOUSE',
    desc: 'The sea-facing ramparts, lighthouse, and colonial streets make Galle Fort one of Sri Lanka\'s most atmospheric coastal heritage walks.',
  },
  {
    id: 3,
    image: gf3,
    subtitle: 'FORT STREETS AT NIGHT',
    desc: 'The narrow streets inside Galle Fort are ideal for night walking, with softly lit colonial buildings, cafes, boutique shops, and a calm historic atmosphere.',
  },
];

const GalleFortDetails = () => {
  const [routeMode, setRouteMode] = useState<'driving' | 'walking'>('driving');
  const [reviewCards, setReviewCards] = useState<{ name: string; role: string; review: string; image: string | null; rating: number; }[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const visibleReviewCards = reviewCards.slice(0, 3);
  const [activeCard, setActiveCard] = useState<(typeof heroSlides)[number] | null>(null);

  const API = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
    : '/api/v1';

  const [selectedSlide, setSelectedSlide] = useState(heroSlides[0]);
  const heroRef = useRef<HTMLElement>(null);

  const handleSelectSlide = (slide: typeof heroSlides[0]) => {
    setSelectedSlide(slide);
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const openCard = (slide: typeof heroSlides[number]) => {
    setSelectedSlide(slide);
    setActiveCard(slide);
  };

  const closeCard = () => {
    setActiveCard(null);
  };

  const navigateCard = (direction: 'prev' | 'next') => {
    if (!activeCard) return;

    const currentIndex = heroSlides.findIndex((slide) => slide.id === activeCard.id);
    if (currentIndex === -1) return;

    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % heroSlides.length
      : (currentIndex - 1 + heroSlides.length) % heroSlides.length;

    const nextSlide = heroSlides[nextIndex];
    setSelectedSlide(nextSlide);
    setActiveCard(nextSlide);
  };

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setReviewError(null);
        const res = await fetch(`${API}/reviews`, { credentials: 'include' });
        const json = await res.json();
        if (!res.ok) {
          throw new Error(json?.message || 'Failed to load reviews.');
        }

        const activeReviews = (json.data ?? [])
          .filter((review: any) => review?.isActive !== false)
          .map((review: any) => ({
            name: review.reviewerName || 'Guest Reviewer',
            role: review.reviewerRole || 'Visitor',
            review: review.reviewText || '',
            image: review.image || null,
            rating: Number(review.rating) || 5,
          }));

        setReviewCards(activeReviews);
        if (activeReviews.length === 0) {
          setReviewError('No active reviews were returned by the API.');
        }
      } catch (error) {
        console.error('GalleFortDetails loadReviews error:', error);
        setReviewCards([]);
        setReviewError('Unable to load visitor reviews.');
      }
    };

    void loadReviews();
  }, [API]);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Colombo,+Sri+Lanka&destination=Galle+Fort,+Galle,+Sri+Lanka&travelmode=${routeMode}`;
  const routeInfo = routeMode === 'driving'
    ? { distance: '125 km', time: '2 hr 20 min' }
    : { distance: '125 km', time: '24 hr 40 min' };

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-[520px] md:min-h-[600px] flex flex-col justify-center px-5 md:px-[28px] py-10 mb-8 md:mb-12 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.16) 75%, rgba(0,0,0,0.10) 100%), url('${selectedSlide.image}')` }}
        />

        <div className="relative z-10 max-w-[760px] pt-8 md:pt-12 pl-1 md:pl-2">
          <h1 className="font-serif text-white text-[34px] md:text-[58px] font-bold leading-[1.1] mb-2 uppercase tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            Galle Fort
          </h1>
          <h2 className="font-serif text-white text-[16px] md:text-[20px] font-bold tracking-wide uppercase mb-5 opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {selectedSlide.subtitle}
          </h2>

          {selectedSlide.desc && (
            <p className="text-white font-sans font-medium text-[0.95rem] md:text-[1rem] leading-[1.55] max-w-[640px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
              {selectedSlide.desc}
            </p>
          )}
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 relative z-20">
        <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 snap-x">
          {heroSlides.map((slide) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => openCard(slide)}
              className={`relative group overflow-hidden aspect-[16/9] bg-black shrink-0 w-[280px] sm:w-[360px] md:w-auto snap-start cursor-pointer transition-all duration-200 text-left ${
                selectedSlide.id === slide.id
                  ? 'ring-[3px] ring-[#1C5F46] ring-offset-2'
                  : 'opacity-90 hover:opacity-100'
              }`}
            >
              <img src={slide.image} alt={slide.subtitle} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-white font-serif text-[1.2rem] md:text-[1.4rem] font-bold uppercase truncate mb-0.5">Galle Fort</span>
                <span className="text-white/90 font-sans text-[0.85rem] md:text-[0.95rem] truncate">{slide.subtitle}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                  <FiCamera className="text-white w-5 h-5" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {activeCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-sm" onClick={closeCard}>
          <div
            className="relative mt-4 w-full max-w-5xl overflow-hidden rounded-[28px] bg-[#0f172a] shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeCard}
              className="absolute right-4 top-8 z-10 rounded-full bg-black/55 p-2 text-white transition hover:bg-black/75"
              aria-label="Close image preview"
            >
              <FiX size={20} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigateCard('prev');
              }}
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-3 text-white transition hover:bg-black/75"
              aria-label="Previous image"
            >
              <FiChevronLeft size={22} />
            </button>
            <button
              type="button"
              onClick={(event) => {
                event.stopPropagation();
                navigateCard('next');
              }}
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 rounded-full bg-black/55 p-3 text-white transition hover:bg-black/75"
              aria-label="Next image"
            >
              <FiChevronRight size={22} />
            </button>
            <div className="flex h-[70vh] min-h-[420px] items-center justify-center overflow-hidden bg-black p-4 md:h-[78vh] md:min-h-[520px] md:p-6">
              <img
                src={activeCard.image}
                alt={activeCard.subtitle}
                className="h-full w-full max-w-full object-contain object-center"
              />
            </div>
            <div className="space-y-2 bg-[#111827] px-6 py-5 text-white md:px-8">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#C89B3C]">Galle Fort</p>
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wide">{activeCard.subtitle}</h3>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Split */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12">

          {/* Left Column - Main Details */}
          <div className="space-y-16 relative overflow-hidden md:overflow-visible">
            <img
              src={buddhaImg}
              alt=""
              className="absolute right-[-20px] md:right-[-40px] bottom-[-20px] w-[300px] md:w-[450px] opacity-[0.15] pointer-events-none mix-blend-multiply"
            />

            {/* Historical Significance */}
            <div className="relative z-10">
              <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">THE STORY</p>
              <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-6">Historical Significance</h3>
              <p className="text-[#4b5563] text-[0.95rem] md:text-[1rem] leading-[1.8] mb-4 font-sans">
                Galle Fort is a fortified coastal city first established by the Portuguese and later expanded by the Dutch in the 17th century. Its ramparts, bastions, and street grid still define the old town.
              </p>
              <p className="text-[#4b5563] text-[0.95rem] md:text-[1rem] leading-[1.8] mb-4 font-sans">
                Today the fort is both a protected heritage site and a living neighborhood, with museums, religious buildings, boutiques, cafes, and sea-facing walks.
              </p>
            </div>

            {/* Historical Timeline */}
            <div className="relative z-10">
              <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">THROUGH TIME</p>
              <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-8">Historical Timeline</h3>

              <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-10">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#C89B3C] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">1588</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">PORTUGUESE FORT</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">The Portuguese establish early fortifications at Galle.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">17TH CENTURY</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">DUTCH EXPANSION</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">The Dutch strengthen the ramparts, bastions, and urban layout.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">1988</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">UNESCO INSCRIPTION</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">Old Town of Galle and its Fortifications is inscribed as a World Heritage Site.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#8D8579] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">TODAY</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">LIVING HERITAGE</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">The fort remains a working historic town and major visitor destination.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Smart Travel Assistant */}
          <div className="relative z-20">
            <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-fit sticky top-24 border border-gray-50">
              <h3 className="font-serif text-[1.5rem] font-bold text-[#1f2937] mb-3 uppercase tracking-wide">SMART TRAVEL ASSISTANT</h3>
              <p className="text-[#6b7280] text-[0.95rem] mb-6">
                You are currently in <span className="text-[#1C5F46] font-bold">Colombo</span>, here is everything you need for the journey
              </p>

              <div className="flex items-center text-[#C66846] font-bold text-[0.85rem] mb-8 gap-2">
                <FiUsers size={16} /> High Crowd
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-2 mb-10 pb-8 border-b border-[#E2DED5]">
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiMapPin className="text-[#1C5F46]" /> Distance</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">125 KM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiClock className="text-[#1C5F46]" /> Travel Time</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">2 HR 20MIN</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Recommended Departure</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">5:30 AM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiSun className="text-[#1C5F46]" /> Weather</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">HUMID</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Temperature</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">28°C</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Best Photography</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">6:00 PM</div>
                </div>
              </div>

              <h4 className="font-bold text-[#1f2937] text-[1.1rem] mb-6">Nearby essentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  { icon: FiCoffee, title: "Restaurants", subtitle: "The Rampart View Café" },
                  { icon: FiHome, title: "Hotels", subtitle: "Amangalla Hotel" },
                  { icon: FiDroplet, title: "Fuel Stations", subtitle: "Ceypetco Galle" },
                  { icon: FiPlus, title: "Hospitals", subtitle: "Karapitiya Hospital" },
                  { icon: FiWind, title: "Washrooms", subtitle: "Fort Public Facilities" },
                  { icon: FiTruck, title: "Bus Stops", subtitle: "Galle Bus Stand" },
                  { icon: FiMapPin, title: "Parking", subtitle: "Fort Parking Lot" },
                  { icon: FiMap, title: "Railway", subtitle: "Galle Railway Station" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col border border-[#E2DED5] rounded-[16px] p-3 transition-colors hover:border-[#1C5F46]/30 cursor-pointer">
                    <div className="flex items-center gap-2 font-bold text-[0.85rem] text-[#1f2937] mb-1">
                      <item.icon className="text-[#1C5F46]" size={16} /> {item.title}
                    </div>
                    <div className="text-[#6b7280] text-[0.75rem] truncate">{item.subtitle}</div>
                  </div>
                ))}
              </div>

              <EmergencyContactsCard
                contacts={[
                  { label: 'Police Emergency', value: '119' },
                  { label: 'Ambulance / Suwaseriya', value: '1990' },
                ]}
              />

            </div>
          </div>

        </div>
      </section>

      {/* Opening Hours & Contact Details */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] relative mt-16">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 overflow-hidden">
          <img src={mandalaImg} alt="" className="w-[500px] opacity-[0.06] mix-blend-multiply" />
        </div>

        <div className="relative z-10 mb-12">
          <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">GALLE FORT</p>
          <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937]">Opening Hours & Contact Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          {/* Left Column */}
          <div>
            <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 mb-8 w-full md:w-max pr-6 md:pr-16">
              <h4 className="font-bold text-[1.2rem] text-[#1f2937] mb-1">Opening Hours</h4>
              <p className="text-[#6b7280] text-[0.95rem]">Open Daily from 7:00 AM to 7:00 PM</p>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] mb-8 font-sans leading-relaxed">
              The <span className="font-bold text-[#1f2937]">fort walls and ramparts</span> can be walked at any time,<br />while museums and buildings follow these windows
            </p>

            <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-8 mb-10 ml-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#C89B3C] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Morning</h5>
                <p className="text-[#6b7280] text-[0.9rem]">7:00 AM – 12:00 PM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Afternoon</h5>
                <p className="text-[#6b7280] text-[0.9rem]">12:00 PM – 4:00 PM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#C66846] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Sunset Walk</h5>
                <p className="text-[#6b7280] text-[0.9rem]">4:00 PM – 7:00 PM</p>
              </div>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] font-sans leading-relaxed pr-10">
              The <span className="font-bold text-[#1f2937]">sunset rampart walk</span> is one of the most popular experiences at Galle Fort, offering panoramic views of the Indian Ocean.
            </p>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-[24px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 h-full">
              <h4 className="font-bold text-[1.3rem] text-[#1f2937] mb-6">Contact Details</h4>

              <div className="h-[1px] w-full bg-gradient-to-r from-gray-100 to-transparent mb-8"></div>

              <div className="space-y-6">
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Address</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">Galle Fort, Galle, Sri Lanka</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Managed By</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">Department of Archaeology, Sri Lanka</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Phone</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">+94 91 222 8880</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Official Website</h5>
                  <a href="#" className="text-[#4b5563] text-[0.95rem] underline underline-offset-4 decoration-gray-400 hover:text-[#1C5F46] transition-colors">Galle Fort Heritage Official Website</a>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Email</h5>
                  <a href="mailto:info@archaeology.gov.lk" className="text-[#6b7280] text-[0.95rem] hover:text-[#1C5F46] transition-colors">info@archaeology.gov.lk</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Plan Your Route */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] pt-10 text-center">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">GETTING THERE</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Plan Your Route</h3>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-start min-h-[400px] relative overflow-hidden text-left">
          <div className="absolute inset-0 z-0 bg-[#F4F9F7]">
            <iframe
              title="Galle Fort Map"
              src="https://maps.google.com/maps?q=Galle%20Fort%2C%20Galle%2C%20Sri%20Lanka&output=embed"
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="relative z-10 mt-auto w-full flex flex-col md:flex-row items-center justify-between bg-white rounded-[16px] p-4 shadow-sm border border-gray-100">
            <div className="flex gap-2 mb-4 md:mb-0">
              <button
                type="button"
                onClick={() => setRouteMode('driving')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-[0.85rem] font-bold transition-colors ${routeMode === 'driving' ? 'bg-[#E8F3EE] text-[#1C5F46] border border-[#1C5F46]/20' : 'bg-white text-[#6b7280] border border-gray-200'}`}
              >
                <FiTruck /> Driving
              </button>
              <button
                type="button"
                onClick={() => setRouteMode('walking')}
                className={`flex items-center gap-2 px-5 py-2 rounded-full text-[0.85rem] font-bold transition-colors ${routeMode === 'walking' ? 'bg-[#E8F3EE] text-[#1C5F46] border border-[#1C5F46]/20' : 'bg-white text-[#6b7280] border border-gray-200'}`}
              >
                <FiMapPin /> Walking
              </button>
            </div>

            <div className="flex gap-6 md:gap-10">
              <div>
                <span className="block text-[#6b7280] text-[0.75rem] uppercase">Distance from Colombo</span>
                <span className="font-bold text-[#1f2937]">{routeInfo.distance}</span>
              </div>
              <div>
                <span className="block text-[#6b7280] text-[0.75rem] uppercase">Estimated {routeMode === 'driving' ? 'driving' : 'walking'} time</span>
                <span className="font-bold text-[#1f2937]">{routeInfo.time}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.open(directionsUrl, '_blank')}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.9rem] font-bold bg-[#1C5F46] text-white shadow-md hover:bg-[#154633] transition-colors mt-4 md:mt-0"
            >
              <FiNavigation /> Navigate
            </button>
          </div>
        </div>
      </section>

      {/* Travel Tips & Etiquette */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">BEFORE YOU GO</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Travel Tips & Etiquette</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">

          {/* Left Column Tips */}
          <div className="bg-white rounded-[24px] shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex gap-4 items-start">
              <FiInfo className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Dress Code</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Visitors are requested to wear clothing that covers shoulders, arms and knees when entering religious buildings.</p>
              </div>
            </div>
            <div className="p-6 border-b border-gray-100 flex gap-4 items-start">
              <FiCamera className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Photography rules</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Photography is allowed throughout the fort. Be respectful in residential areas.</p>
              </div>
            </div>
            <div className="p-6 flex gap-4 items-start">
              <FiCheckCircle className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Accessibility</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Ground-floor ramparts and public courtyards are wheelchair accessible.</p>
              </div>
            </div>
          </div>

          {/* Right Column Dos and Donts */}
          <div className="space-y-4 flex flex-col">
            <div className="bg-[#F4F9F7] border border-[#1C5F46] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#1C5F46] mb-4 flex items-center gap-2"><FiCheckCircle /> Do's</h5>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Walk the ramparts near sunset</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Visit the lighthouse, clock tower, and museums</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Keep streets clean and respect residential areas</li>
              </ul>
            </div>

            <div className="bg-[#FFF6F5] border border-[#C66846] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#C66846] mb-4 flex items-center gap-2"><FiXCircle /> Don'ts</h5>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not block narrow streets or private entrances for photos</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not climb unsafe rampart edges</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not disturb residents or religious observances</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visitors Reviews */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center relative">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">COMMUNITY</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Visitors Reviews</h3>

        <div className="overflow-hidden rounded-[24px] flex justify-center">
          <div className="review-carousel-track flex gap-6 text-left pb-4">
            {visibleReviewCards.length > 0 ? (
              visibleReviewCards.map((item, index) => (
                <div
                  key={`${item.name}-${index}`}
                  className="review-card bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 shrink-0 w-[280px] sm:w-[320px] md:w-[320px]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={item.image || avatarImg}
                      alt={item.name}
                      className="w-12 h-12 rounded-full object-cover bg-gray-200"
                      onError={(event) => {
                        event.currentTarget.src = avatarImg;
                      }}
                    />
                    <div>
                      <h5 className="font-bold text-[1rem] text-[#1f2937]">{item.name}</h5>
                      <p className="text-[#6b7280] text-[0.75rem]">{item.role}</p>
                    </div>
                  </div>
                  <div className="flex gap-1 text-[#C89B3C] text-[0.8rem] mb-4">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span key={starIndex}>{starIndex < item.rating ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="text-[#4b5563] text-[0.95rem] leading-relaxed">"{item.review}"</p>
                </div>
              ))
            ) : (
              <div className="w-full bg-white rounded-[24px] p-10 shadow-sm border border-gray-100">
                <p className="text-[#6b7280] mb-2">No reviews are available at the moment. Please check back later.</p>
                {reviewError && <p className="text-[#b91c1c] text-[0.95rem]">{reviewError}</p>}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Nearby Places */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">OTHER HERITAGE PLACES</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Nearby Places</h3>

        <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-4 gap-4 text-left pb-4 md:pb-0 snap-x">
          {[
            { img: sigiriya, title: 'Sigiriya Rock Fortress', loc: 'Matale - Central Province', route: '/sigiriya-rock-fortress' },
            { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province', route: '/temple-of-the-tooth' },
            { img: galViharaya, title: 'Gal Viharaya', loc: 'Polonnaruwa - North Central Province', route: '/gal-viharaya' },
            { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province', route: '/ruwanwelisaya' },
          ].map((place, idx) => (
            <Link key={idx} to={place.route} className="bg-white rounded-[16px] overflow-hidden shadow-sm group border border-gray-100 flex flex-col shrink-0 w-[240px] sm:w-[280px] md:w-auto snap-start">
              <div className="h-[150px] md:h-[120px] overflow-hidden relative">
                <img src={place.img} alt={place.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h4 className="font-bold text-[#1f2937] text-[0.85rem] mb-0.5 truncate">{place.title}</h4>
                <p className="text-[0.7rem] text-[#6b7280] mb-3 truncate">{place.loc}</p>
                <span className="text-[#1C5F46] font-bold text-[0.75rem] mt-auto cursor-pointer hover:text-[#C89B3C] transition-colors">View Details &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalleFortDetails;
