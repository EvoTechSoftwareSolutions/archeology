import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiPhone, FiCheck, FiInfo, FiUsers, FiSun, FiCoffee, FiHome, FiDroplet, FiPlus, FiWind, FiTruck, FiMap, FiCamera, FiNavigation, FiXCircle, FiCheckCircle, FiX } from 'react-icons/fi';
import avatarImg from '../../assets/avatar.png';
import buddhaImg from '../../assets/image 35.png';
import mandalaImg from '../../assets/image 36.png';
import galleFort from '../../assets/places-gallefort.png';
import galViharaya from '../../assets/galvihara.png';
import g3 from '../../assets/g3.jpg';
import g4 from '../../assets/g4.jpg';
import polonnaruwa from '../../assets/Polonnaruwa.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import sigiriya from '../../assets/places-sigiriya.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';

const heroSlides = [
  {
    id: 1,
    image: galViharaya,
    subtitle: 'THE RECLINING BUDDHA',
    desc: 'A monumental granite image of the Buddha in parinirvana, carved directly into the living rock at Polonnaruwa.',
  },
  {
    id: 2,
    image: g3,
    subtitle: 'ANCIENT POLONNARUWA',
    desc: 'Gal Viharaya belongs to the sacred landscape of Polonnaruwa, the medieval capital shaped by royal patronage and Buddhist scholarship.',
  },
  {
    id: 3,
    image: g4,
    subtitle: 'SACRED STUPA TRADITION',
    desc: 'The site reflects Sri Lanka\'s long tradition of devotional architecture, meditation spaces, and sculptural mastery.',
  },
];

const GalViharayaDetails = () => {
  const [routeMode, setRouteMode] = useState<'driving' | 'walking'>('driving');
  const [reviewCards, setReviewCards] = useState<{ name: string; role: string; review: string; image: string | null; rating: number; }[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<(typeof heroSlides)[number] | null>(null);

  const API = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
    : '/api/v1';

  // Selected slide drives the hero section
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
        console.error('GalViharayaDetails loadReviews error:', error);
        setReviewCards([]);
        setReviewError('Unable to load visitor reviews.');
      }
    };

    void loadReviews();
  }, [API]);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Colombo,+Sri+Lanka&destination=Gal+Viharaya,+Polonnaruwa,+Sri+Lanka&travelmode=${routeMode}`;
  const routeInfo = routeMode === 'driving'
    ? { distance: '225 km', time: '4 hr 45 min' }
    : { distance: '225 km', time: '46 hr' };

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero Section — updates when a gallery thumbnail is clicked */}
      <section ref={heroRef} className="relative min-h-[520px] md:min-h-[600px] flex flex-col justify-center px-5 md:px-[28px] py-10 mb-8 md:mb-12 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.16) 75%, rgba(0,0,0,0.10) 100%), url('${selectedSlide.image}')` }}
        />

        <div className="relative z-10 max-w-[760px] pt-8 md:pt-12 pl-1 md:pl-2">
          <h1 className="font-serif text-white text-[34px] md:text-[58px] font-bold leading-[1.1] mb-2 uppercase tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            Gal Viharaya
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
                <span className="text-white font-serif text-[1.2rem] md:text-[1.4rem] font-bold uppercase truncate mb-0.5">Gal Viharaya</span>
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
            <div className="flex items-center justify-center bg-black p-4 md:p-6">
              <img
                src={activeCard.image}
                alt={activeCard.subtitle}
                className="max-h-[70vh] w-auto max-w-full object-contain object-top md:max-h-[78vh]"
              />
            </div>
            <div className="space-y-2 bg-[#111827] px-6 py-5 text-white md:px-8">
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#C89B3C]">Gal Viharaya</p>
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
                Gal Viharaya is one of Polonnaruwa's most admired rock-cut Buddhist monuments. Its serene Buddha figures were carved from a single granite face during the reign of King Parakramabahu I.
              </p>
              <p className="text-[#4b5563] text-[0.95rem] md:text-[1rem] leading-[1.8] mb-4 font-sans">
                The shrine is celebrated for its quiet expression, balanced proportions, and masterful treatment of stone, making it a defining achievement of medieval Sri Lankan sculpture.
              </p>
            </div>

            {/* Historical Timeline */}
            <div className="relative z-10">
              <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">THROUGH TIME</p>
              <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-8">Historical Timeline</h3>

              <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-10">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#C89B3C] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">12TH CENTURY</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">ROYAL PATRONAGE</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">The carvings are attributed to the reign of King Parakramabahu I.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">MEDIEVAL ERA</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">MONASTIC WORSHIP</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">The figures formed part of a sacred Buddhist monastic complex.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">1982</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">UNESCO CONTEXT</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">Ancient Polonnaruwa was inscribed as a World Heritage Site.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#C66846] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">TODAY</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">PROTECTED MONUMENT</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">Visitors come to study, worship, and experience the rock-cut sculptures.</p>
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
                <FiUsers size={16} /> Medium Crowd
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-2 mb-10 pb-8 border-b border-[#E2DED5]">
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiMapPin className="text-[#1C5F46]" /> Distance</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">225 KM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiClock className="text-[#1C5F46]" /> Travel Time</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">4 HR 45MIN</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Recommended Departure</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">4:30 AM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiSun className="text-[#1C5F46]" /> Weather</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">WARM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Temperature</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">31°C</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Best Photography</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">7:00 AM</div>
                </div>
              </div>

              <h4 className="font-bold text-[#1f2937] text-[1.1rem] mb-6">Nearby essentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  { icon: FiCoffee, title: "Restaurants", subtitle: "Polonnaruwa Rest House" },
                  { icon: FiHome, title: "Hotels", subtitle: "Seyara Holiday Resort" },
                  { icon: FiDroplet, title: "Fuel Stations", subtitle: "Polonnaruwa Town" },
                  { icon: FiPlus, title: "Hospitals", subtitle: "Polonnaruwa Hospital" },
                  { icon: FiWind, title: "Washrooms", subtitle: "Visitor Facilities" },
                  { icon: FiTruck, title: "Bus Stops", subtitle: "Polonnaruwa Bus Stand" },
                  { icon: FiMapPin, title: "Parking", subtitle: "Site Parking Area" },
                  { icon: FiMap, title: "Railway", subtitle: "Polonnaruwa Station" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col border border-[#E2DED5] rounded-[16px] p-3 transition-colors hover:border-[#1C5F46]/30 cursor-pointer">
                    <div className="flex items-center gap-2 font-bold text-[0.85rem] text-[#1f2937] mb-1">
                      <item.icon className="text-[#1C5F46]" size={16} /> {item.title}
                    </div>
                    <div className="text-[#6b7280] text-[0.75rem] truncate">{item.subtitle}</div>
                  </div>
                ))}
              </div>

              <div className="bg-[#F8F6F1] rounded-[16px] p-4 flex flex-col xl:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-[#1f2937] font-bold text-[0.9rem] whitespace-nowrap">
                  <FiPhone className="text-[#C66846]" size={18} /> Emergency contacts
                </div>
                <div className="flex w-full flex-wrap justify-center gap-2 xl:justify-end">
                  <span className="bg-white rounded-full px-4 py-1.5 text-[0.75rem] font-bold shadow-sm whitespace-nowrap text-[#1f2937]">
                    Police Emergency <span className="ml-1 text-[#1f2937]">119</span>
                  </span>
                  <span className="bg-white rounded-full px-4 py-1.5 text-[0.75rem] font-bold shadow-sm whitespace-nowrap text-[#1f2937]">
                    Ambulance / Suwaseriya <span className="ml-1 text-[#1f2937]">1990</span>
                  </span>
                </div>
              </div>

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
          <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">GAL VIHARAYA</p>
          <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937]">Opening Hours & Contact Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          {/* Left Column */}
          <div>
            <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 mb-8 w-full md:w-max pr-6 md:pr-16">
              <h4 className="font-bold text-[1.2rem] text-[#1f2937] mb-1">Opening Hours</h4>
              <p className="text-[#6b7280] text-[0.95rem]">Open Daily from 7:00 AM to 5:30 PM</p>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] mb-8 font-sans leading-relaxed">
              Gal Viharaya is an outdoor sacred site, so early morning and late afternoon visits are more comfortable for walking and photography.
            </p>

            <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-8 mb-10 ml-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#C89B3C] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Morning</h5>
                <p className="text-[#6b7280] text-[0.9rem]">7:00 AM – 10:00 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Midday</h5>
                <p className="text-[#6b7280] text-[0.9rem]">10:00 AM – 2:30 PM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#C66846] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Evening</h5>
                <p className="text-[#6b7280] text-[0.9rem]">2:30 PM – 5:30 PM</p>
              </div>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] font-sans leading-relaxed pr-10">
              On <span className="font-bold text-[#1f2937]">Poya days</span>, the site can be very busy with local pilgrims, adding to the cultural experience but requiring more time.
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
                  <p className="text-[#6b7280] text-[0.95rem]">Gal Viharaya, Polonnaruwa Ancient City, Sri Lanka</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Managed By</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">Department of Archaeology, Sri Lanka</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Phone</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">+94 11 269 2840</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Official Website</h5>
                  <a href="#" className="text-[#4b5563] text-[0.95rem] underline underline-offset-4 decoration-gray-400 hover:text-gold transition-colors">Department of Archaeology</a>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Email</h5>
                  <a href="mailto:info@archaeology.gov.lk" className="text-[#6b7280] text-[0.95rem] hover:text-gold transition-colors">info@archaeology.gov.lk</a>
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
              title="Gal Viharaya Map"
              src="https://maps.google.com/maps?q=Gal%20Viharaya%2C%20Polonnaruwa%2C%20Sri%20Lanka&output=embed"
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
                <p className="text-[#6b7280] text-[0.9rem]">Wear modest clothing suitable for a sacred Buddhist site. Shoulders and knees must be covered.</p>
              </div>
            </div>
            <div className="p-6 border-b border-gray-100 flex gap-4 items-start">
              <FiCamera className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Photography rules</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Photography is allowed, but do not pose with your back towards the Buddha statues.</p>
              </div>
            </div>
            <div className="p-6 flex gap-4 items-start">
              <FiCheckCircle className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Footwear</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Remove shoes where required before entering the immediate shrine area.</p>
              </div>
            </div>
          </div>

          {/* Right Column Dos and Donts */}
          <div className="space-y-4 flex flex-col">
            <div className="bg-[#F4F9F7] border border-[#1C5F46] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#1C5F46] mb-4 flex items-center gap-2"><FiCheckCircle /> Do's</h5>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Visit early to avoid heat and crowds</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Keep voices low around worshippers</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Carry water and sun protection</li>
              </ul>
            </div>

            <div className="bg-[#FFF6F5] border border-[#C66846] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#C66846] mb-4 flex items-center gap-2"><FiXCircle /> Don'ts</h5>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not climb on protected stonework</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not turn your back to Buddha images for disrespectful photos</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visitors Reviews */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center relative">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">COMMUNITY</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Visitors Reviews</h3>

        <div className="overflow-hidden rounded-[24px]">
          <div className="review-carousel-track flex gap-6 text-left pb-4">
            {reviewCards.length > 0 ? (
              reviewCards.map((item, index) => (
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
            { img: polonnaruwa, title: 'Polonnaruwa Ancient City', loc: 'Polonnaruwa - North Central Province', route: '/all-places' },
            { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province', route: '/ruwanwelisaya' },
            { img: sigiriya, title: 'Sigiriya - The Lion Rock', loc: 'Matale - Central Province', route: '/sigiriya-rock-fortress' },
            { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province', route: '/temple-of-the-tooth' },
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

export default GalViharayaDetails;
