

import { FiClock, FiMapPin, FiPhone, FiCheck, FiInfo, FiUsers, FiSun, FiCoffee, FiHome, FiDroplet, FiPlus, FiWind, FiTruck, FiMap, FiCamera, FiNavigation, FiHeart, FiXCircle, FiCheckCircle } from 'react-icons/fi';
import buddhaImg from '../assets/image 35.png';
import mandalaImg from '../assets/image 36.png';
import galleFort from '../assets/places-gallefort.png';
import templeTooth from '../assets/places-daladamaligawa.png';
import polonnaruwa from '../assets/polonnaruwa.png';
import sigiriya from '../assets/places-sigiriya.png';
import avatarImg from '../assets/avatar.png';
import ruwanweliseya from '../assets/Ruwansweliseya.png';

import dm1 from '../dm1.png';
import dm2 from '../dm2.png';
import dm3 from '../dm3.png';
import dm4 from '../dm4.png';
import dm5 from '../dm5.png';
import dm6 from '../dm6.png';
import dm7 from '../dm7.png';

const heroSlides = [
  {
    id: 1,
    image: dm1,
    subtitle: "PATHTHIRIPPUWA (THE OCTAGON)",
    desc: "Built during the reign of King Sri Vikrama Rajasinha, this iconic octagonal tower is a hallmark of Kandyan architecture. It was originally used by kings to address the public and is now a repository for ancient ola-leaf manuscripts."
  },
  {
    id: 2,
    image: dm2,
    subtitle: "Vadahitina Maligawa (Inner Chamber)",
    desc: ""
  },
  {
    id: 3,
    image: dm3,
    subtitle: "Hevisi Mandapaya (Drummers' Courtyard)",
    desc: ""
  },
  {
    id: 4,
    image: dm4,
    subtitle: "Natha Devalaya",
    desc: ""
  },
  {
    id: 5,
    image: dm7,
    subtitle: "Walakulu Bamma (Cloud Wall)",
    desc: ""
  },
  {
    id: 6,
    image: dm6,
    subtitle: "Sri Dalada Museum",
    desc: ""
  },
  {
    id: 7,
    image: dm5,
    subtitle: "Makara Thorana (Dragon Arch)",
    desc: ""
  }
];

const TempleOfToothDetails = () => {
  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[450px] flex flex-col justify-center px-6 md:px-[80px]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${heroSlides[0].image}')` }}
        >
          {/* Gradient to darken the left side for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-[800px] pt-12">
          <h1 className="font-serif text-white text-[45px] md:text-[64px] font-bold leading-[1.2] mb-1 uppercase tracking-wide">
            Temple Of The Tooth
          </h1>
          <h2 className="font-serif text-white text-[18px] md:text-[22px] font-bold tracking-wide uppercase mb-6 opacity-95">
            {heroSlides[0].subtitle}
          </h2>

          <p className="text-white font-sans font-medium text-[16px] md:text-[18px] leading-[1.6] max-w-[700px]">
            {heroSlides[0].desc}
          </p>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 relative z-20">
        <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-3 gap-6 pb-4 md:pb-0 snap-x">
          {heroSlides.slice(1).map((slide) => (
            <div
              key={slide.id}
              className="relative group overflow-hidden aspect-[16/9] bg-black shrink-0 w-[280px] sm:w-[360px] md:w-auto snap-start"
            >
              <img src={slide.image} alt={slide.subtitle} className="w-full h-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-5">
                <span className="text-white font-serif text-[1.2rem] md:text-[1.4rem] font-bold uppercase truncate mb-0.5">Temple Of The Tooth</span>
                <span className="text-white/90 font-sans text-[0.85rem] md:text-[0.95rem] truncate">{slide.subtitle}</span>
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
                Sri Dalada Maligawa enshrines a tooth relic of the Buddha, historically the palladium of Sinhalese kingship. The temple complex sits within the former royal palace of Kandy beside a serene lake.
              </p>
              <p className="text-[#4b5563] text-[1.1rem] leading-[1.8] mb-4 font-sans">
                Each August the relic is honoured with the Esala Perahera, one of Asia's grandest processions of dancers, drummers and caparisoned elephants.
              </p>
            </div>

            {/* Historical Timeline */}
            <div className="relative z-10">
              <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">THROUGH TIME</p>
              <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-8">Historical Timeline</h3>

              <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-10">
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#C89B3C] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">1595</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">RELIC ARRIVES IN KANDY</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">The tooth relic is brought to the hill capital.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">1687</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">TEMPLE BUILD</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">Construction of the main shrine begins.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">1988</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">UNESCO INSCRIPTION</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">Inscribed as part of the Sacred City of Kandy.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#C66846] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">1998</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">RESTORATION</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">The temple is restored after damage.</p>
                </div>
                <div className="relative">
                  <div className="absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full bg-[#8D8579] border-[4px] border-[#F8F6F1]"></div>
                  <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">TODAY</span>
                  <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">DAILY POOJA</h4>
                  <p className="text-[#6b7280] text-[0.95rem]">Ceremonies are held three times a day.</p>
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
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">115 KM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiClock className="text-[#1C5F46]" /> Travel Time</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">3 HR 10MIN</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Recommended Departure</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937] text-center">2:30 PM</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiSun className="text-[#1C5F46]" /> Weather</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">MILD</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Temperature</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">26°C</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Best Photography</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">5:30 PM</div>
                </div>
              </div>

              <h4 className="font-bold text-[#1f2937] text-[1.1rem] mb-6">Nearby essentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {[
                  { icon: FiCoffee, title: "Restaurants", subtitle: "The Empire Café" },
                  { icon: FiHome, title: "Hotels", subtitle: "Queen's Hotel" },
                  { icon: FiDroplet, title: "Fuel Stations", subtitle: "Ceypetco Kandy" },
                  { icon: FiPlus, title: "Hospitals", subtitle: "Kandy General Hospital" },
                  { icon: FiWind, title: "Washrooms", subtitle: "Temple Facilities" },
                  { icon: FiTruck, title: "Bus Stops", subtitle: "Kandy Clock Tower" },
                  { icon: FiMapPin, title: "Parking", subtitle: "Temple Public Parking" },
                  { icon: FiMap, title: "Railway", subtitle: "Kandy Railway Station" }
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
                <div className="flex flex-wrap gap-2 justify-end w-full">
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
          <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">SRI DALADA MALIGAWA</p>
          <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937]">Opening Hours & Contact Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          {/* Left Column */}
          <div>
            <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 mb-8 w-full md:w-max pr-6 md:pr-16">
              <h4 className="font-bold text-[1.2rem] text-[#1f2937] mb-1">Opening Hours</h4>
              <p className="text-[#6b7280] text-[0.95rem]">Open Daily from 5.30AM to 8.30PM</p>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] mb-8 font-sans leading-relaxed">
              The <span className="font-bold text-[#1f2937]">daily Thevava</span> (ritual services and drumming)<br />take place during the following windows
            </p>

            <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-8 mb-10 ml-8">
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#C89B3C] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Early Morning</h5>
                <p className="text-[#6b7280] text-[0.9rem]">5:30 AM – 7:00 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#1C5F46] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Mid-Morning</h5>
                <p className="text-[#6b7280] text-[0.9rem]">9:30 AM – 11:00 AM</p>
              </div>
              <div className="relative">
                <div className="absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full bg-[#C66846] border-[4px] border-[#F8F6F1]"></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">Evening</h5>
                <p className="text-[#6b7280] text-[0.9rem]">6:30 PM – 8:00 PM</p>
              </div>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] font-sans leading-relaxed pr-10">
              On <span className="font-bold text-[#1f2937]">Wednesdays</span>, a special ritual called <span className="font-bold text-[#1f2937]">Nanumura Mangallaya</span> takes place, featuring a symbolic bathing of the sacred relic with a fragrant herbal preparation.
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
                  <p className="text-[#6b7280] text-[0.95rem]">Sri Dalada Maligawa, Kandy Lake Road, Kandy, Sri Lanka</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Administration Division</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">+94 81 220 4867 (for prior appointments)</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Emergency & WhatsApp Contact</h5>
                  <p className="text-[#6b7280] text-[0.95rem]">+94 70 156 4347</p>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Official Website</h5>
                  <a href="#" className="text-[#4b5563] text-[0.95rem] underline underline-offset-4 decoration-gray-400 hover:text-gold transition-colors">Sri Dalada Maligawa Official Website</a>
                </div>
                <div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">Donations Email</h5>
                  <a href="mailto:donation@sridaladamaligawa.lk" className="text-[#6b7280] text-[0.95rem] hover:text-gold transition-colors">donation@sridaladamaligawa.lk</a>
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
          {/* Map Placeholder */}
          <div className="absolute inset-0 bg-[#F4F9F7] z-0"></div>

          <div className="relative z-10 bg-white shadow-md rounded-full px-4 py-2 flex items-center gap-2 font-bold text-[0.85rem] text-[#1f2937] mt-4 ml-4">
            <FiMapPin className="text-[#1C5F46]" /> Temple of the Sacred Tooth Relic
          </div>

          <div className="relative z-10 mt-auto w-full flex flex-col md:flex-row items-center justify-between bg-white rounded-[16px] p-4 shadow-sm border border-gray-100">
            <div className="flex gap-2 mb-4 md:mb-0">
              <button className="flex items-center gap-2 px-5 py-2 rounded-full text-[0.85rem] font-bold bg-[#E8F3EE] text-[#1C5F46] border border-[#1C5F46]/20">
                <FiTruck /> Driving
              </button>
              <button className="flex items-center gap-2 px-5 py-2 rounded-full text-[0.85rem] font-bold bg-white text-[#6b7280] border border-gray-200">
                <FiMapPin /> Walking
              </button>
            </div>

            <div className="flex gap-6 md:gap-10">
              <div>
                <span className="block text-[#6b7280] text-[0.75rem] uppercase">Distance from Colombo</span>
                <span className="font-bold text-[#1f2937]">115 km</span>
              </div>
              <div>
                <span className="block text-[#6b7280] text-[0.75rem] uppercase">Estimated driving time</span>
                <span className="font-bold text-[#1f2937]">3 hr 10 min</span>
              </div>
            </div>

            <button className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[0.9rem] font-bold bg-[#1C5F46] text-white shadow-md hover:bg-[#154633] transition-colors mt-4 md:mt-0">
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
                <p className="text-[#6b7280] text-[0.9rem]">Visitors are requested clothing should round from cover of shoulders, arms and knees.</p>
              </div>
            </div>
            <div className="p-6 border-b border-gray-100 flex gap-4 items-start">
              <FiCamera className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Photography rules</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Photography allowed except during certain rituals.</p>
              </div>
            </div>
            <div className="p-6 flex gap-4 items-start">
              <FiCheckCircle className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Accessibility</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Ground-floor shrine areas are wheelchair accessible.</p>
              </div>
            </div>
          </div>

          {/* Right Column Dos and Donts */}
          <div className="space-y-4 flex flex-col">
            <div className="bg-[#F4F9F7] border border-[#1C5F46] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#1C5F46] mb-4 flex items-center gap-2"><FiCheckCircle /> Do's</h5>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Attend on morning pooja</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Visit the world Buddhism museum</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> Shoes must be removed and stored at the designated shoe counters before entering</li>
              </ul>
            </div>

            <div className="bg-[#FFF6F5] border border-[#C66846] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#C66846] mb-4 flex items-center gap-2"><FiXCircle /> Don'ts</h5>
              <ul className="space-y-3">
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not wear shorts or sleeveless tops</li>
                <li className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiXCircle className="text-[#C66846] shrink-0 mt-0.5" size={14} /> Do not point feet at shrines</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Visitors Reviews */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center relative">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">COMMUNITY</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Visitors Reviews</h3>

        <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-3 gap-6 text-left pb-4 md:pb-0 snap-x">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 shrink-0 w-[280px] sm:w-[320px] md:w-auto snap-start">
              <div className="flex items-center gap-4 mb-4">
                <img src={avatarImg} alt="Reviewer" className="w-12 h-12 rounded-full object-cover bg-gray-200" />
                <div>
                  <h5 className="font-bold text-[1rem] text-[#1f2937]">Dr. Himali Perera</h5>
                  <p className="text-[#6b7280] text-[0.75rem]">Researcher</p>
                </div>
              </div>
              <div className="flex gap-1 text-[#C89B3C] text-[0.8rem] mb-4">★★★★★</div>
              <p className="text-[#4b5563] text-[0.95rem] leading-relaxed">
                "Impeccably documented. A vital reference for my fieldwork."
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Nearby Places */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">OTHER HERITAGE PLACES</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Nearby Places</h3>

        <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-5 gap-4 text-left pb-4 md:pb-0 snap-x">
          {[
            { img: galleFort, title: 'Galle Fort', loc: 'Galle - Southern Province' },
            { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province' },
            { img: polonnaruwa, title: 'Polonnaruwa', loc: 'Polonnaruwa - North Central Province' },
            { img: sigiriya, title: 'Sigiriya - The Lion Rock', loc: 'Matale - Central Province' },
            { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province' }
          ].map((place, idx) => (
            <div key={idx} className="bg-white rounded-[16px] overflow-hidden shadow-sm group border border-gray-100 flex flex-col shrink-0 w-[240px] sm:w-[280px] md:w-auto snap-start">
              <div className="h-[150px] md:h-[120px] overflow-hidden relative">
                <img src={place.img} alt={place.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-2 right-2 bg-white/80 p-1.5 rounded-full cursor-pointer hover:bg-white text-gray-500 hover:text-red-500 transition-colors">
                  <FiHeart size={14} />
                </div>
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h4 className="font-bold text-[#1f2937] text-[0.85rem] mb-0.5 truncate">{place.title}</h4>
                <p className="text-[0.7rem] text-[#6b7280] mb-3 truncate">{place.loc}</p>
                <span className="text-[#1C5F46] font-bold text-[0.75rem] mt-auto cursor-pointer hover:text-[#C89B3C] transition-colors">View Details &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TempleOfToothDetails;
