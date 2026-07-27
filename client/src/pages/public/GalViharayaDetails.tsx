import { useRef, useState } from 'react';
import {
  FiCamera,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCoffee,
  FiDroplet,
  FiHeart,
  FiHome,
  FiInfo,
  FiMap,
  FiMapPin,
  FiNavigation,
  FiPhone,
  FiPlus,
  FiSun,
  FiTruck,
  FiUsers,
  FiWind,
  FiXCircle,
} from 'react-icons/fi';
import galViharaya from '../../assets/galvihara.png';
import polonnaruwa from '../../assets/Polonnaruwa.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import sigiriya from '../../assets/places-sigiriya.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import mandalaImg from '../../assets/image 36.png';
import avatarImg from '../../assets/avatar.png';

const heroSlides = [
  {
    id: 1,
    image: galViharaya,
    subtitle: 'THE RECLINING BUDDHA',
    desc: 'A monumental granite image of the Buddha in parinirvana, carved directly into the living rock at Polonnaruwa.',
  },
  {
    id: 2,
    image: polonnaruwa,
    subtitle: 'ANCIENT POLONNARUWA',
    desc: 'Gal Viharaya belongs to the sacred landscape of Polonnaruwa, the medieval capital shaped by royal patronage and Buddhist scholarship.',
  },
  {
    id: 3,
    image: ruwanweliseya,
    subtitle: 'SACRED STUPA TRADITION',
    desc: 'The site reflects Sri Lanka’s long tradition of devotional architecture, meditation spaces, and sculptural mastery.',
  },
];

const GalViharayaDetails = () => {
  const [routeMode, setRouteMode] = useState<'driving' | 'walking'>('driving');
  const [selectedSlide, setSelectedSlide] = useState(heroSlides[0]);
  const heroRef = useRef<HTMLElement>(null);

  const handleSelectSlide = (slide: typeof heroSlides[0]) => {
    setSelectedSlide(slide);
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Colombo,+Sri+Lanka&destination=Gal+Viharaya,+Polonnaruwa,+Sri+Lanka&travelmode=${routeMode}`;
  const routeInfo = routeMode === 'driving'
    ? { distance: '225 km', time: '4 hr 45 min' }
    : { distance: '225 km', time: '46 hr' };

  return (
    <div className="min-h-screen bg-[#F8F6F1]">
      <section ref={heroRef} className="relative flex h-[80vh] min-h-[450px] flex-col justify-center px-6 md:px-[80px]">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat transition-all duration-700"
          style={{ backgroundImage: `url('${selectedSlide.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/45 to-transparent" />
        </div>

        <div className="relative z-10 max-w-[800px] pt-12">
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[3px] text-[#C89B3C]">
            North Central Province
          </p>
          <h1 className="mb-1 font-serif text-[45px] font-bold uppercase leading-[1.2] tracking-wide text-white md:text-[64px]">
            Gal Viharaya
          </h1>
          <h2 className="mb-6 font-serif text-[18px] font-bold uppercase tracking-wide text-white opacity-95 md:text-[22px]">
            {selectedSlide.subtitle}
          </h2>

          <p className="max-w-[700px] font-sans text-[16px] font-medium leading-[1.6] text-white md:text-[18px]">
            {selectedSlide.desc}
          </p>
        </div>
      </section>

      <section className="relative z-20 mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <div className="flex snap-x gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-3 md:pb-0">
          {heroSlides.map((slide) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => handleSelectSlide(slide)}
              className={`group relative aspect-[16/9] w-[280px] shrink-0 snap-start overflow-hidden bg-black text-left transition-all duration-200 sm:w-[360px] md:w-auto ${
                selectedSlide.id === slide.id
                  ? 'ring-[3px] ring-[#1C5F46] ring-offset-2'
                  : 'opacity-90 hover:opacity-100'
              }`}
            >
              <img src={slide.image} alt={slide.subtitle} className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
                <span className="mb-0.5 truncate font-serif text-[1.2rem] font-bold uppercase text-white md:text-[1.4rem]">Gal Viharaya</span>
                <span className="truncate font-sans text-[0.85rem] text-white/90 md:text-[0.95rem]">{slide.subtitle}</span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="rounded-full bg-black/50 p-3 backdrop-blur-sm">
                  <FiCamera className="h-5 w-5 text-white" />
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-[80px] md:px-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_450px]">
          <div className="relative space-y-16 overflow-hidden md:overflow-visible">
            <img
              src={mandalaImg}
              alt=""
              className="pointer-events-none absolute bottom-[-20px] right-[-20px] w-[320px] opacity-[0.08] mix-blend-multiply md:right-[-40px] md:w-[460px]"
            />

            <div className="relative z-10">
              <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">THE STORY</p>
              <h3 className="mb-6 font-serif text-[2.5rem] font-bold text-[#1f2937]">Historical Significance</h3>
              <p className="mb-4 font-sans text-[1.1rem] leading-[1.8] text-[#4b5563]">
                Gal Viharaya is one of Polonnaruwa’s most admired rock-cut Buddhist monuments. Its serene Buddha figures were carved from a single granite face during the reign of King Parakramabahu I.
              </p>
              <p className="font-sans text-[1.1rem] leading-[1.8] text-[#4b5563]">
                The shrine is celebrated for its quiet expression, balanced proportions, and masterful treatment of stone, making it a defining achievement of medieval Sri Lankan sculpture.
              </p>
            </div>

            <div className="relative z-10">
              <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">THROUGH TIME</p>
              <h3 className="mb-8 font-serif text-[2.5rem] font-bold text-[#1f2937]">Historical Timeline</h3>

              <div className="relative space-y-10 border-l-[3px] border-[#E2DED5] pl-8">
                {[
                  { year: '12TH CENTURY', title: 'ROYAL PATRONAGE', text: 'The carvings are attributed to the reign of King Parakramabahu I.' },
                  { year: 'MEDIEVAL ERA', title: 'MONASTIC WORSHIP', text: 'The figures formed part of a sacred Buddhist monastic complex.' },
                  { year: '1982', title: 'UNESCO CONTEXT', text: 'Ancient Polonnaruwa was inscribed as a World Heritage Site.' },
                  { year: 'TODAY', title: 'PROTECTED MONUMENT', text: 'Visitors come to study, worship, and experience the rock-cut sculptures.' },
                ].map((item, index) => (
                  <div key={item.year} className="relative">
                    <div className={`absolute -left-[41px] top-1 h-[18px] w-[18px] rounded-full border-[4px] border-[#F8F6F1] ${index % 2 === 0 ? 'bg-[#C89B3C]' : 'bg-[#1C5F46]'}`} />
                    <span className="mb-1 block text-[0.95rem] font-bold tracking-wider text-[#C89B3C]">{item.year}</span>
                    <h4 className="mb-1 font-serif text-[1.2rem] font-bold uppercase tracking-wide text-[#1f2937]">{item.title}</h4>
                    <p className="text-[0.95rem] text-[#6b7280]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-20">
            <div className="sticky top-24 h-fit rounded-[32px] border border-gray-50 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
              <h3 className="mb-3 font-serif text-[1.5rem] font-bold uppercase tracking-wide text-[#1f2937]">SMART TRAVEL ASSISTANT</h3>
              <p className="mb-6 text-[0.95rem] text-[#6b7280]">
                You are currently in <span className="font-bold text-[#1C5F46]">Colombo</span>, here is everything you need for the journey.
              </p>

              <div className="mb-8 flex items-center gap-2 text-[0.85rem] font-bold text-[#C66846]">
                <FiUsers size={16} /> Medium Crowd
              </div>

              <div className="mb-10 grid grid-cols-2 gap-x-2 gap-y-8 border-b border-[#E2DED5] pb-8 sm:grid-cols-3">
                {[
                  { icon: FiMapPin, label: 'Distance', value: '225 KM' },
                  { icon: FiClock, label: 'Travel Time', value: '4 HR 45MIN' },
                  { icon: FiSun, label: 'Weather', value: 'WARM' },
                  { icon: FiHeart, label: 'Best Time', value: 'MORNING' },
                  { icon: FiCamera, label: 'Photography', value: '7:00 AM' },
                  { icon: FiMap, label: 'Province', value: 'NCP' },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center gap-1.5 text-[0.85rem] text-[#6b7280]"><item.icon className="text-[#1C5F46]" /> {item.label}</div>
                    <div className="font-serif text-[1.1rem] font-bold text-[#1f2937]">{item.value}</div>
                  </div>
                ))}
              </div>

              <h4 className="mb-6 text-[1.1rem] font-bold text-[#1f2937]">Nearby essentials</h4>
              <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {[
                  { icon: FiCoffee, title: 'Restaurants', subtitle: 'Polonnaruwa Rest House' },
                  { icon: FiHome, title: 'Hotels', subtitle: 'Seyara Holiday Resort' },
                  { icon: FiDroplet, title: 'Fuel Stations', subtitle: 'Polonnaruwa Town' },
                  { icon: FiPlus, title: 'Hospitals', subtitle: 'Polonnaruwa Hospital' },
                  { icon: FiWind, title: 'Washrooms', subtitle: 'Visitor Facilities' },
                  { icon: FiTruck, title: 'Bus Stops', subtitle: 'Polonnaruwa Bus Stand' },
                  { icon: FiMapPin, title: 'Parking', subtitle: 'Site Parking Area' },
                  { icon: FiMap, title: 'Railway', subtitle: 'Polonnaruwa Station' },
                ].map((item) => (
                  <div key={item.title} className="cursor-pointer rounded-[16px] border border-[#E2DED5] p-3 transition-colors hover:border-[#1C5F46]/30">
                    <div className="mb-1 flex items-center gap-2 text-[0.85rem] font-bold text-[#1f2937]">
                      <item.icon className="text-[#1C5F46]" size={16} /> {item.title}
                    </div>
                    <div className="truncate text-[0.75rem] text-[#6b7280]">{item.subtitle}</div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-center justify-between gap-4 rounded-[16px] bg-[#F8F6F1] p-4 xl:flex-row">
                <div className="flex items-center gap-2 whitespace-nowrap text-[0.9rem] font-bold text-[#1f2937]">
                  <FiPhone className="text-[#C66846]" size={18} /> Emergency contacts
                </div>
                <div className="flex w-full flex-wrap justify-end gap-2">
                  <span className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-[0.75rem] font-bold text-[#1f2937] shadow-sm">Police 119</span>
                  <span className="whitespace-nowrap rounded-full bg-white px-4 py-1.5 text-[0.75rem] font-bold text-[#1f2937] shadow-sm">Ambulance 1990</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto mt-16 max-w-[1200px] px-6 pb-[80px] md:px-10">
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center justify-center overflow-hidden">
          <img src={mandalaImg} alt="" className="w-[500px] opacity-[0.06] mix-blend-multiply" />
        </div>

        <div className="relative z-10 mb-12">
          <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">GAL VIHARA</p>
          <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937]">Opening Hours & Contact Details</h3>
        </div>

        <div className="relative z-10 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <div className="mb-8 w-full rounded-[16px] border border-gray-100 bg-white p-6 pr-6 shadow-sm md:w-max md:pr-16">
              <h4 className="mb-1 text-[1.2rem] font-bold text-[#1f2937]">Opening Hours</h4>
              <p className="text-[0.95rem] text-[#6b7280]">Open Daily from 7.00AM to 5.30PM</p>
            </div>

            <p className="mb-8 font-sans text-[0.95rem] leading-relaxed text-[#4b5563]">
              Gal Viharaya is an outdoor sacred site, so early morning and late afternoon visits are more comfortable for walking and photography.
            </p>

            <div className="relative mb-10 ml-8 space-y-8 border-l-[3px] border-[#E2DED5] pl-8">
              {[
                ['Morning', '7:00 AM - 10:00 AM'],
                ['Midday', '10:00 AM - 2:30 PM'],
                ['Evening', '2:30 PM - 5:30 PM'],
              ].map(([label, time], index) => (
                <div key={label} className="relative">
                  <div className={`absolute -left-[41px] top-1.5 h-[18px] w-[18px] rounded-full border-[4px] border-[#F8F6F1] ${index === 1 ? 'bg-[#1C5F46]' : 'bg-[#C89B3C]'}`} />
                  <h5 className="mb-0.5 text-[1.05rem] font-bold text-[#1f2937]">{label}</h5>
                  <p className="text-[0.9rem] text-[#6b7280]">{time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="h-full rounded-[24px] border border-gray-50 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h4 className="mb-6 text-[1.3rem] font-bold text-[#1f2937]">Contact Details</h4>
            <div className="mb-8 h-[1px] w-full bg-gradient-to-r from-gray-100 to-transparent" />

            <div className="space-y-6">
              <div>
                <h5 className="mb-1 text-[1.05rem] font-bold text-[#1f2937]">Address</h5>
                <p className="text-[0.95rem] text-[#6b7280]">Gal Viharaya, Polonnaruwa Ancient City, Sri Lanka</p>
              </div>
              <div>
                <h5 className="mb-1 text-[1.05rem] font-bold text-[#1f2937]">Managed By</h5>
                <p className="text-[0.95rem] text-[#6b7280]">Department of Archaeology, Sri Lanka</p>
              </div>
              <div>
                <h5 className="mb-1 text-[1.05rem] font-bold text-[#1f2937]">Nearest City</h5>
                <p className="text-[0.95rem] text-[#6b7280]">Polonnaruwa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-[80px] pt-10 text-center md:px-10">
        <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">GETTING THERE</p>
        <h3 className="mb-10 font-serif text-[2.5rem] font-bold text-[#1f2937]">Plan Your Route</h3>

        <div className="relative flex min-h-[400px] flex-col items-start overflow-hidden rounded-[24px] border border-gray-100 bg-white p-6 text-left shadow-sm">
          <div className="absolute inset-0 z-0 bg-[#F4F9F7]">
            <iframe
              title="Gal Viharaya Map"
              src="https://maps.google.com/maps?q=Gal%20Viharaya%2C%20Polonnaruwa%2C%20Sri%20Lanka&output=embed"
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="relative z-10 mt-auto flex w-full flex-col items-center justify-between rounded-[16px] border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
            <div className="mb-4 flex gap-2 md:mb-0">
              <button
                type="button"
                onClick={() => setRouteMode('driving')}
                className={`flex items-center gap-2 rounded-full border px-5 py-2 text-[0.85rem] font-bold transition-colors ${routeMode === 'driving' ? 'border-[#1C5F46]/20 bg-[#E8F3EE] text-[#1C5F46]' : 'border-gray-200 bg-white text-[#6b7280]'}`}
              >
                <FiTruck /> Driving
              </button>
              <button
                type="button"
                onClick={() => setRouteMode('walking')}
                className={`flex items-center gap-2 rounded-full border px-5 py-2 text-[0.85rem] font-bold transition-colors ${routeMode === 'walking' ? 'border-[#1C5F46]/20 bg-[#E8F3EE] text-[#1C5F46]' : 'border-gray-200 bg-white text-[#6b7280]'}`}
              >
                <FiMapPin /> Walking
              </button>
            </div>

            <div className="flex gap-6 md:gap-10">
              <div>
                <span className="block text-[0.75rem] uppercase text-[#6b7280]">Distance from Colombo</span>
                <span className="font-bold text-[#1f2937]">{routeInfo.distance}</span>
              </div>
              <div>
                <span className="block text-[0.75rem] uppercase text-[#6b7280]">Estimated {routeMode} time</span>
                <span className="font-bold text-[#1f2937]">{routeInfo.time}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.open(directionsUrl, '_blank')}
              className="mt-4 flex items-center gap-2 rounded-full bg-[#1C5F46] px-6 py-2.5 text-[0.9rem] font-bold text-white shadow-md transition-colors hover:bg-[#154633] md:mt-0"
            >
              <FiNavigation /> Navigate
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-[80px] text-center md:px-10">
        <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">BEFORE YOU GO</p>
        <h3 className="mb-10 font-serif text-[2.5rem] font-bold text-[#1f2937]">Travel Tips & Etiquette</h3>

        <div className="grid grid-cols-1 gap-8 text-left md:grid-cols-2">
          <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm">
            {[
              { icon: FiInfo, title: 'Dress Code', text: 'Wear modest clothing suitable for a sacred Buddhist site.' },
              { icon: FiCamera, title: 'Photography rules', text: 'Photography is generally allowed, but avoid disruptive posing near sacred images.' },
              { icon: FiCheckCircle, title: 'Footwear', text: 'Remove shoes where required and walk respectfully around the image house area.' },
            ].map((item, index) => (
              <div key={item.title} className={`flex items-start gap-4 p-6 ${index < 2 ? 'border-b border-gray-100' : ''}`}>
                <item.icon className="mt-1 shrink-0 text-[#1C5F46]" size={24} />
                <div>
                  <h5 className="mb-1 font-bold text-[#1f2937]">{item.title}</h5>
                  <p className="text-[0.9rem] text-[#6b7280]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <div className="flex-1 rounded-[24px] border border-[#1C5F46] bg-[#F4F9F7] p-6">
              <h5 className="mb-4 flex items-center gap-2 font-bold text-[#1C5F46]"><FiCheckCircle /> Do's</h5>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-[0.9rem] text-[#4b5563]"><FiCheck className="mt-0.5 shrink-0 text-[#1C5F46]" /> Visit early to avoid heat and crowds.</li>
                <li className="flex items-start gap-2 text-[0.9rem] text-[#4b5563]"><FiCheck className="mt-0.5 shrink-0 text-[#1C5F46]" /> Keep voices low around worshippers.</li>
                <li className="flex items-start gap-2 text-[0.9rem] text-[#4b5563]"><FiCheck className="mt-0.5 shrink-0 text-[#1C5F46]" /> Carry water and sun protection.</li>
              </ul>
            </div>

            <div className="flex-1 rounded-[24px] border border-[#C66846] bg-[#FFF6F5] p-6">
              <h5 className="mb-4 flex items-center gap-2 font-bold text-[#C66846]"><FiXCircle /> Don'ts</h5>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-[0.9rem] text-[#4b5563]"><FiXCircle className="mt-0.5 shrink-0 text-[#C66846]" size={14} /> Do not climb on protected stonework.</li>
                <li className="flex items-start gap-2 text-[0.9rem] text-[#4b5563]"><FiXCircle className="mt-0.5 shrink-0 text-[#C66846]" size={14} /> Do not turn your back to Buddha images for disrespectful photos.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-[1200px] px-6 pb-[80px] text-center md:px-10">
        <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">COMMUNITY</p>
        <h3 className="mb-10 font-serif text-[2.5rem] font-bold text-[#1f2937]">Visitors Reviews</h3>

        <div className="overflow-hidden rounded-[24px]">
          <div className="flex gap-6 overflow-x-auto pb-4 text-left">
            {[1, 2, 3].map((i) => (
              <div key={i} className="w-[280px] shrink-0 rounded-[24px] border border-gray-100 bg-white p-8 shadow-sm sm:w-[320px]">
                <div className="mb-4 flex items-center gap-4">
                  <img src={avatarImg} alt="Reviewer" className="h-12 w-12 rounded-full bg-gray-200 object-cover" />
                  <div>
                    <h5 className="text-[1rem] font-bold text-[#1f2937]">Dr. Himali Perera</h5>
                    <p className="text-[0.75rem] text-[#6b7280]">Researcher</p>
                  </div>
                </div>
                <div className="mb-4 text-[0.8rem] text-[#C89B3C]">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <p className="text-[0.95rem] leading-relaxed text-[#4b5563]">
                  "A quiet, powerful place to understand Polonnaruwa craftsmanship."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-[80px] text-center md:px-10">
        <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">OTHER HERITAGE PLACES</p>
        <h3 className="mb-10 font-serif text-[2.5rem] font-bold text-[#1f2937]">Nearby Places</h3>

        <div className="flex snap-x gap-4 overflow-x-auto pb-4 text-left md:grid md:grid-cols-4 md:pb-0">
          {[
            { img: polonnaruwa, title: 'Polonnaruwa Ancient City', loc: 'Polonnaruwa - North Central Province' },
            { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province' },
            { img: sigiriya, title: 'Sigiriya - The Lion Rock', loc: 'Matale - Central Province' },
            { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province' },
          ].map((place) => (
            <div key={place.title} className="group flex w-[240px] shrink-0 snap-start flex-col overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm sm:w-[280px] md:w-auto">
              <div className="relative h-[150px] overflow-hidden md:h-[120px]">
                <img src={place.img} alt={place.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h4 className="mb-0.5 truncate text-[0.85rem] font-bold text-[#1f2937]">{place.title}</h4>
                <p className="mb-3 truncate text-[0.7rem] text-[#6b7280]">{place.loc}</p>
                <span className="mt-auto cursor-pointer text-[0.75rem] font-bold text-[#1C5F46] transition-colors hover:text-[#C89B3C]">View Details &rarr;</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default GalViharayaDetails;
