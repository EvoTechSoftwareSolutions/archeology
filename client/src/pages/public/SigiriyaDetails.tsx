import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FiClock, FiMapPin, FiPhone, FiCheck, FiInfo, FiUsers, FiSun, FiCoffee, FiHome, FiDroplet, FiPlus, FiWind, FiTruck, FiMap, FiCamera, FiNavigation, FiXCircle, FiCheckCircle } from 'react-icons/fi';
import buddhaImg from '../../assets/image 35.png';
import mandalaImg from '../../assets/image 36.png';
import galleFort from '../../assets/places-gallefort.png';
import galViharaya from '../../assets/galvihara.png';
import sigiriya from '../../assets/places-sigiriya.png';
import s1 from '../../assets/lionfoot.jpg';
import s2 from '../../assets/painting.jpg';
import s3 from '../../assets/planning.webp';
import polonnaruwa from '../../assets/Polonnaruwa.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import avatarImg from '../../assets/avatar.png';

const heroSlides = [
  {
    id: 1,
    image: s1,
    subtitle: 'THE LION ROCK',
    desc: 'A dramatic ancient rock fortress rising above landscaped gardens, reservoirs, frescoes, and royal palace ruins.',
  },
  {
    id: 2,
    image: s2,
    subtitle: 'ROYAL REFUGE',
    desc: 'Built as a palace and fortress by King Kashyapa, Sigiriya blends monumental architecture with dramatic natural beauty.',
  },
  {
    id: 3,
    image: s3,
    subtitle: 'ANCIENT CITY PLANNING',
    desc: 'Its symmetrical water gardens, terraced walls, and hydraulic systems showcase the engineering skill of the 5th century.',
  },
];

const SigiriyaDetails = () => {
  const [routeMode, setRouteMode] = useState<'driving' | 'walking'>('driving');
  const [reviewCards, setReviewCards] = useState<{ name: string; role: string; review: string; image: string | null; rating: number; }[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);

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
        console.error('SigiriyaDetails loadReviews error:', error);
        setReviewCards([]);
        setReviewError('Unable to load visitor reviews.');
      }
    };

    void loadReviews();
  }, [API]);

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Colombo,+Sri+Lanka&destination=Sigiriya+Rock+Fortress,+Sri+Lanka&travelmode=${routeMode}`;
  const routeInfo = routeMode === 'driving'
    ? { distance: '170 KM', time: '4 HR' }
    : { distance: '170 KM', time: '35 HR' };

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero Section — updates when a gallery thumbnail is clicked */}
      <section ref={heroRef} className="relative h-[80vh] min-h-[450px] flex flex-col justify-center px-6 md:px-[80px]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('${selectedSlide.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[800px] pt-12">
          <h1 className="font-serif text-white text-[45px] md:text-[64px] font-bold leading-[1.2] mb-1 uppercase tracking-wide">
            Sigiriya Rock Fortress
          </h1>
          <h2 className="font-serif text-white text-[18px] md:text-[22px] font-bold tracking-wide uppercase mb-6 opacity-95">
            {selectedSlide.subtitle}
          </h2>

          {selectedSlide.desc && (
            <p className="text-white font-sans font-medium text-[16px] md:text-[18px] leading-[1.6] max-w-[700px]">
              {selectedSlide.desc}
            </p>
          )}
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 relative z-20">
        <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 snap-x">
          {heroSlides.map((slide) => (
            <div
              key={slide.id}
              onClick={() => handleSelectSlide(slide)}
              className={`relative group overflow-hidden aspect-[16/9] bg-black shrink-0 w-[280px] sm:w-[360px] md:w-auto snap-start cursor-pointer transition-all duration-200 ${
                selectedSlide.id === slide.id
                  ? 'ring-[3px] ring-[#1C5F46] ring-offset-2'
                  : 'opacity-90 hover:opacity-100'
              }`}
            >
              <img src={slide.image} alt={slide.subtitle} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-white font-serif text-[1.2rem] md:text-[1.4rem] font-bold uppercase truncate mb-0.5">Sigiriya Rock Fortress</span>
                <span className="text-white/90 font-sans text-[0.85rem] md:text-[0.95rem] truncate">{slide.subtitle}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/50 backdrop-blur-sm rounded-full p-3">
                  <FiCamera className="text-white w-5 h-5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

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
              <p className="text-[#4b5563] text-[1.1rem] leading-[1.8] mb-4 font-sans">
                Sigiriya is an ancient rock fortress and palace complex, celebrated for its frescoes, engineered gardens, and dramatic royal architecture carved into the granite monolith.
              </p>
              <p className="text-[#4b5563] text-[1.1rem] leading-[1.8] mb-4 font-sans">
                The site was built by King Kashyapa in the 5th century and later returned to monastic use. Its terraces, mirrors, and water gardens make it one of Sri Lanka's most remarkable archaeological sites.
              </p>
            </div>

            {/* Historical Timeline */}
            <div className="relative z-10">
              <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">THROUGH TIME</p>
              <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-8">Historical Timeline</h3>

              <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-10">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#C89B3C] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">477-495 CE</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">KING KASHYAPA</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">Construction of the summit palace and gardens began as a royal stronghold.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">495 CE</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">MONASTERY RETURN</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">After King Kashyapa fled, the site was converted into a Buddhist monastery.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">1982</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">UNESCO INSCRIPTION</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">Sigiriya is designated a UNESCO World Heritage Site.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#C66846] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">TODAY</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">ICONIC LANDMARK</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">It remains a major visitor destination and symbol of Sri Lanka's cultural heritage.</p>
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
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">170 KM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiClock className="text-[#1C5F46]" /> Travel Time</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">4 HR</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Recommended Departure</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937] text-center">6:00 AM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiSun className="text-[#1C5F46]" /> Weather</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">Warm</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Temperature</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">29°C</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Best Photography</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">6:30 AM</div>
                </div>
              </div>

              <h4 className="font-bold text-[#1f2937] text-[1.1rem] mb-6">Nearby essentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  { icon: FiCoffee, title: "Restaurants", subtitle: "Sigiriya Village Area" },
                  { icon: FiHome, title: "Hotels", subtitle: "Hotel Sigiriya" },
                  { icon: FiDroplet, title: "Fuel Stations", subtitle: "Inamaluwa Junction" },
                  { icon: FiPlus, title: "Hospitals", subtitle: "Dambulla Base Hospital" },
                  { icon: FiWind, title: "Washrooms", subtitle: "Visitor Facilities" },
                  { icon: FiTruck, title: "Bus Stops", subtitle: "Sigiriya Bus Stop" },
                  { icon: FiMapPin, title: "Parking", subtitle: "Main Visitor Parking" },
                  { icon: FiMap, title: "Railway", subtitle: "Habarana Railway Station" }
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
          <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">SIGIRIYA ROCK FORTRESS</p>
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
              The rock fortress has timed visitor access; climbing early gives the clearest views and helps avoid the midday heat.
            </p>

            <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-8 mb-10 ml-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#C89B3C] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Early Morning</h5>
                <p className="text-[#6b7280] text-[0.9rem]">7:00 AM – 10:00 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Midday</h5>
                <p className="text-[#6b7280] text-[0.9rem]">10:00 AM – 2:00 PM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#C66846] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Late Afternoon</h5>
                <p className="text-[#6b7280] text-[0.9rem]">2:00 PM – 5:30 PM</p>
              </div>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] font-sans leading-relaxed pr-10">
              Local guides often recommend arriving before <span className="font-bold text-[#1f2937]">8 AM</span> for the best light, cooler climb, and less crowded access to the site.
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
                  <p className="text-[#6b7280] text-[0.95rem]">Sigiriya Rock Fortress, Sigiriya, Sri Lanka</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Visitor Information</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">+94 25 222 2222</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Ticket Office</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">+94 25 222 2323</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Official Website</h5>
                  <a href="https://www.sigiriya.lk" target="_blank" rel="noreferrer" className="text-[#4b5563] text-[0.95rem] underline underline-offset-4 decoration-gray-400 hover:text-[#1C5F46] transition-colors">www.sigiriya.lk</a>
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
              title="Sigiriya Rock Fortress Map"
              src="https://maps.google.com/maps?q=Sigiriya+Rock+Fortress,+Sri+Lanka&output=embed"
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
                <p className="text-[#6b7280] text-[0.9rem]">Visitors should wear clothing that covers shoulders, arms and knees when exploring religious or heritage sections.</p>
              </div>
            </div>
            <div className="p-6 border-b border-gray-100 flex gap-4 items-start">
              <FiCamera className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Photography rules</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Photography is restricted in some fresco and protected areas; strictly follow site signage.</p>
              </div>
            </div>
            <div className="p-6 flex gap-4 items-start">
              <FiCheckCircle className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Accessibility</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Most garden areas are accessible; the summit climb is steep and not wheelchair friendly.</p>
              </div>
            </div>
          </div>

          {/* Right Column Dos and Donts */}
          <div className="space-y-4 flex flex-col">
            <div className="bg-[#F4F9F7] border border-[#1C5F46] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#1C5F46] mb-4 flex items-center gap-2"><FiCheckCircle /> Do's</h5>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Climb early in the morning to beat the heat</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Stay hydrated and bring sun protection</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Respect the heritage site and follow official guides</li>
              </ul>
            </div>

            <div className="bg-[#FFF6F5] border border-[#C66846] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#C66846] mb-4 flex items-center gap-2"><FiXCircle /> Don'ts</h5>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not climb during heavy rain or lightning</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not litter or damage the ancient ruins</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not leave marked paths to ensure safety</li>
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
            { img: galleFort, title: 'Galle Fort', loc: 'Galle - Southern Province', route: '/galle-fort' },
            { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province', route: '/temple-of-the-tooth' },
            { img: galViharaya, title: 'Gal Viharaya', loc: 'Polonnaruwa - North Central Province', route: '/gal-viharaya' },
            { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province', route: '/ruwanwelisaya' }
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

export default SigiriyaDetails;
