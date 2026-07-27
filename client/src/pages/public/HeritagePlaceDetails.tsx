import { useRef, useState } from 'react';
import {
  FiCamera,
  FiCheck,
  FiCheckCircle,
  FiClock,
  FiCoffee,
  FiDroplet,
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
import mandalaImg from '../../assets/image 36.png';
import avatarImg from '../../assets/avatar.png';

type Slide = {
  id: number;
  image: string;
  subtitle: string;
  desc: string;
};

type TimelineItem = {
  year: string;
  title: string;
  text: string;
};

type NearbyPlace = {
  img: string;
  title: string;
  loc: string;
};

type HeritagePlaceDetailsProps = {
  title: string;
  province: string;
  storyLabel: string;
  mapTitle: string;
  mapQuery: string;
  slides: Slide[];
  story: string[];
  timeline: TimelineItem[];
  distance: string;
  drivingTime: string;
  walkingTime: string;
  crowd: string;
  weather: string;
  bestTime: string;
  photographyTime: string;
  openingHours: string;
  visitNote: string;
  contactDetails: { label: string; value: string }[];
  essentials: { title: string; subtitle: string }[];
  tips: { title: string; text: string }[];
  dos: string[];
  donts: string[];
  review: string;
  nearbyPlaces: NearbyPlace[];
};

const iconMap = [FiCoffee, FiHome, FiDroplet, FiPlus, FiWind, FiTruck, FiMapPin, FiMap];

const HeritagePlaceDetails = ({
  title,
  province,
  storyLabel,
  mapTitle,
  mapQuery,
  slides,
  story,
  timeline,
  distance,
  drivingTime,
  walkingTime,
  crowd,
  weather,
  bestTime,
  photographyTime,
  openingHours,
  visitNote,
  contactDetails,
  essentials,
  tips,
  dos,
  donts,
  review,
  nearbyPlaces,
}: HeritagePlaceDetailsProps) => {
  const [routeMode, setRouteMode] = useState<'driving' | 'walking'>('driving');
  const [selectedSlide, setSelectedSlide] = useState(slides[0]);
  const heroRef = useRef<HTMLElement>(null);
  const encodedMapQuery = encodeURIComponent(mapQuery);
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Colombo,+Sri+Lanka&destination=${encodedMapQuery}&travelmode=${routeMode}`;
  const routeInfo = routeMode === 'driving'
    ? { distance, time: drivingTime }
    : { distance, time: walkingTime };

  const handleSelectSlide = (slide: Slide) => {
    setSelectedSlide(slide);
    setTimeout(() => {
      heroRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

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
          <p className="mb-3 text-[0.8rem] font-bold uppercase tracking-[3px] text-[#C89B3C]">{province}</p>
          <h1 className="mb-1 font-serif text-[42px] font-bold uppercase leading-[1.2] tracking-wide text-white md:text-[64px]">
            {title}
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
          {slides.map((slide) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => handleSelectSlide(slide)}
              className={`group relative aspect-[16/9] w-[280px] shrink-0 snap-start overflow-hidden bg-black text-left transition-all duration-200 sm:w-[360px] md:w-auto ${
                selectedSlide.id === slide.id ? 'ring-[3px] ring-[#1C5F46] ring-offset-2' : 'opacity-90 hover:opacity-100'
              }`}
            >
              <img src={slide.image} alt={slide.subtitle} className="h-full w-full object-cover opacity-80 transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/80 via-black/20 to-transparent p-5">
                <span className="mb-0.5 truncate font-serif text-[1.2rem] font-bold uppercase text-white md:text-[1.4rem]">{title}</span>
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
            <img src={mandalaImg} alt="" className="pointer-events-none absolute bottom-[-20px] right-[-20px] w-[360px] opacity-[0.07] mix-blend-multiply md:right-[-40px] md:w-[500px]" />

            <div className="relative z-10">
              <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">THE STORY</p>
              <h3 className="mb-6 font-serif text-[2.5rem] font-bold text-[#1f2937]">Historical Significance</h3>
              {story.map((paragraph) => (
                <p key={paragraph} className="mb-4 font-sans text-[1.1rem] leading-[1.8] text-[#4b5563]">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="relative z-10">
              <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">THROUGH TIME</p>
              <h3 className="mb-8 font-serif text-[2.5rem] font-bold text-[#1f2937]">Historical Timeline</h3>
              <div className="relative space-y-10 border-l-[3px] border-[#E2DED5] pl-8">
                {timeline.map((item, index) => (
                  <div key={`${item.year}-${item.title}`} className="relative">
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
                <FiUsers size={16} /> {crowd}
              </div>
              <div className="mb-10 grid grid-cols-2 gap-x-2 gap-y-8 border-b border-[#E2DED5] pb-8 sm:grid-cols-3">
                {[
                  { icon: FiMapPin, label: 'Distance', value: distance },
                  { icon: FiClock, label: 'Travel Time', value: drivingTime },
                  { icon: FiSun, label: 'Weather', value: weather },
                  { icon: FiCheckCircle, label: 'Best Time', value: bestTime },
                  { icon: FiCamera, label: 'Photography', value: photographyTime },
                  { icon: FiMap, label: 'Province', value: province },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="mb-1 flex items-center gap-1.5 text-[0.85rem] text-[#6b7280]"><item.icon className="text-[#1C5F46]" /> {item.label}</div>
                    <div className="font-serif text-[1.05rem] font-bold text-[#1f2937]">{item.value}</div>
                  </div>
                ))}
              </div>

              <h4 className="mb-6 text-[1.1rem] font-bold text-[#1f2937]">Nearby essentials</h4>
              <div className="mb-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {essentials.map((item, index) => {
                  const Icon = iconMap[index % iconMap.length];
                  return (
                    <div key={item.title} className="cursor-pointer rounded-[16px] border border-[#E2DED5] p-3 transition-colors hover:border-[#1C5F46]/30">
                      <div className="mb-1 flex items-center gap-2 text-[0.85rem] font-bold text-[#1f2937]">
                        <Icon className="text-[#1C5F46]" size={16} /> {item.title}
                      </div>
                      <div className="truncate text-[0.75rem] text-[#6b7280]">{item.subtitle}</div>
                    </div>
                  );
                })}
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
          <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">{storyLabel}</p>
          <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937]">Opening Hours & Contact Details</h3>
        </div>
        <div className="relative z-10 grid grid-cols-1 gap-16 md:grid-cols-2">
          <div>
            <div className="mb-8 w-full max-w-[520px] rounded-[16px] border border-gray-100 bg-white p-6 shadow-sm">
              <h4 className="mb-1 text-[1.2rem] font-bold text-[#1f2937]">Opening Hours</h4>
              <p className="max-w-[440px] text-[0.95rem] leading-relaxed text-[#6b7280]">{openingHours}</p>
            </div>
            <p className="font-sans text-[0.95rem] leading-relaxed text-[#4b5563]">{visitNote}</p>
          </div>
          <div className="h-full rounded-[24px] border border-gray-50 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
            <h4 className="mb-6 text-[1.3rem] font-bold text-[#1f2937]">Contact Details</h4>
            <div className="mb-8 h-[1px] w-full bg-gradient-to-r from-gray-100 to-transparent" />
            <div className="space-y-6">
              {contactDetails.map((item) => (
                <div key={item.label}>
                  <h5 className="mb-1 text-[1.05rem] font-bold text-[#1f2937]">{item.label}</h5>
                  <p className="text-[0.95rem] text-[#6b7280]">{item.value}</p>
                </div>
              ))}
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
              title={mapTitle}
              src={`https://maps.google.com/maps?q=${encodedMapQuery}&output=embed`}
              className="h-full w-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
          <div className="relative z-10 mt-auto flex w-full flex-col items-center justify-between rounded-[16px] border border-gray-100 bg-white p-4 shadow-sm md:flex-row">
            <div className="mb-4 flex gap-2 md:mb-0">
              {(['driving', 'walking'] as const).map((mode) => (
                <button
                  type="button"
                  key={mode}
                  onClick={() => setRouteMode(mode)}
                  className={`flex items-center gap-2 rounded-full border px-5 py-2 text-[0.85rem] font-bold capitalize transition-colors ${routeMode === mode ? 'border-[#1C5F46]/20 bg-[#E8F3EE] text-[#1C5F46]' : 'border-gray-200 bg-white text-[#6b7280]'}`}
                >
                  {mode === 'driving' ? <FiTruck /> : <FiMapPin />} {mode}
                </button>
              ))}
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
            {tips.map((item, index) => (
              <div key={item.title} className={`flex items-start gap-4 p-6 ${index < tips.length - 1 ? 'border-b border-gray-100' : ''}`}>
                <FiInfo className="mt-1 shrink-0 text-[#1C5F46]" size={24} />
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
                {dos.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.9rem] text-[#4b5563]"><FiCheck className="mt-0.5 shrink-0 text-[#1C5F46]" /> {item}</li>
                ))}
              </ul>
            </div>
            <div className="flex-1 rounded-[24px] border border-[#C66846] bg-[#FFF6F5] p-6">
              <h5 className="mb-4 flex items-center gap-2 font-bold text-[#C66846]"><FiXCircle /> Don'ts</h5>
              <ul className="space-y-3">
                {donts.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-[0.9rem] text-[#4b5563]"><FiXCircle className="mt-0.5 shrink-0 text-[#C66846]" size={14} /> {item}</li>
                ))}
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
                <p className="text-[0.95rem] leading-relaxed text-[#4b5563]">"{review}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-6 pb-[80px] text-center md:px-10">
        <p className="mb-2 text-[0.8rem] font-bold uppercase tracking-[2px] text-[#C89B3C]">OTHER HERITAGE PLACES</p>
        <h3 className="mb-10 font-serif text-[2.5rem] font-bold text-[#1f2937]">Nearby Places</h3>
        <div className="flex snap-x gap-4 overflow-x-auto pb-4 text-left md:grid md:grid-cols-4 md:pb-0">
          {nearbyPlaces.map((place) => (
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

export default HeritagePlaceDetails;
