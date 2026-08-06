import { useEffect, useState, type ComponentType, type SVGProps } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiArrowLeft,
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
  FiPlus,
  FiTruck,
  FiUsers,
  FiWind,
  FiXCircle,
} from 'react-icons/fi';
import avatarImg from '../../assets/avatar.png';
import sigiriya from '../../assets/places-sigiriya.png';
import galViharaya from '../../assets/galvihara.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import galleFort from '../../assets/places-gallefort.png';
import mandalaImg from '../../assets/image 36.png';

interface HistoricalPlace {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  century: string;
  statusFlag: string;
  latitude: number;
  longitude: number;
  district: {
    name: string;
    province: {
      name: string;
    };
  };
}

interface ContactDetail {
  label: string;
  value: string;
}

interface EssentialItem {
  title: string;
  subtitle: string;
  icon?: SvgIconComponent;
}

type SvgIconComponent = ComponentType<SVGProps<SVGSVGElement>>;

interface TipItem {
  title: string;
  text: string;
  icon?: SvgIconComponent;
}

interface ReviewItem {
  name: string;
  role: string;
  review: string;
  image?: string | null;
  rating?: number;
}

interface HeritagePlaceDetailsProps {
  title?: string;
  province?: string;
  storyLabel?: string;
  mapTitle?: string;
  mapQuery?: string;
  slides?: { id: number; image: string; subtitle: string; desc: string }[];
  story?: string[];
  timeline?: { year: string; title: string; text: string }[];
  distance?: string;
  drivingTime?: string;
  walkingTime?: string;
  crowd?: string;
  weather?: string;
  bestTime?: string;
  photographyTime?: string;
  openingHours?: string;
  visitNote?: string;
  contactDetails?: ContactDetail[];
  essentials?: EssentialItem[];
  tips?: TipItem[];
  dos?: string[];
  donts?: string[];
  review?: string;
  nearbyPlaces?: { img: string; title: string; loc: string; route: string }[];
}

const routeDefault = { distance: 'Varies by location', time: 'Varies by location' };

const HeritagePlaceDetails = (props: HeritagePlaceDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const [place, setPlace] = useState<HistoricalPlace | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [routeMode, setRouteMode] = useState<'driving' | 'walking'>('driving');
  const [reviewCards, setReviewCards] = useState<ReviewItem[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const visibleReviewCards = reviewCards.slice(0, 3);

  const API = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
    : '/api/v1';

  const fallbackPlace: HistoricalPlace = {
    id: 0,
    name: props.title || 'Heritage Place',
    category: props.storyLabel || 'Heritage',
    description: props.story?.[0] || 'This heritage site has played an important role in Sri Lanka’s history and culture, reflecting both religious devotion and architectural skill.',
    image: props.slides?.[0]?.image || sigiriya,
    century: props.drivingTime || 'Unknown',
    statusFlag: 'Active',
    latitude: 0,
    longitude: 0,
    district: {
      name: props.province || 'Unknown',
      province: { name: props.province || 'Sri Lanka' },
    },
  };

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/historicalPlace/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch historical place');
        }
        const data = await response.json();
        setPlace(data.data);
      } catch (err) {
        console.error(err);
        setError('Unable to load place details.');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      void fetchPlace();
    } else if (props.title) {
      setPlace(fallbackPlace);
      setLoading(false);
    }
  }, [id, props.title]);

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
        console.error('HeritagePlaceDetails loadReviews error:', error);
        setReviewCards([]);
        setReviewError('Unable to load visitor reviews.');
      }
    };

    void loadReviews();
  }, [API]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex items-center justify-center">
        <div className="text-[#1C5F46] font-medium text-lg">Loading heritage place...</div>
      </div>
    );
  }

  if (error || !place) {
    return (
      <div className="min-h-screen bg-[#F8F6F1] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-serif text-[#3B2F1E] mb-4">Place Not Found</h2>
        <p className="text-gray-600 mb-8 max-w-md">{error || "The heritage place you are looking for doesn't exist or has been moved."}</p>
        <Link to="/all-places" className="inline-flex items-center gap-2 bg-[#1C5F46] text-white px-6 py-3 rounded-full font-bold hover:bg-[#144935] transition-colors">
          <FiArrowLeft /> Back to All Places
        </Link>
      </div>
    );
  }

  const pageMapImage = props.slides?.[0]?.image || place.image || sigiriya;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Colombo,+Sri+Lanka&destination=${encodeURIComponent(props.title || place.name)},+Sri+Lanka&travelmode=${routeMode}`;
  const routeInfo = routeMode === 'driving'
    ? { ...routeDefault, distance: props.distance || '170 KM', time: props.drivingTime || '4 HR' }
    : { ...routeDefault, distance: props.distance || '170 KM', time: props.walkingTime || '35 HR' };

  const storyLines = props.story?.length
    ? props.story
    : [place.description || 'This heritage site has played an important role in Sri Lanka’s history and culture, reflecting both religious devotion and architectural skill.'];

  const timelineItems = props.timeline?.length
    ? props.timeline
    : [
        { year: place.century, title: 'ANCIENT FOUNDATION', text: `${place.name} was established during the ${place.century}.` },
        { year: 'COLONIAL ERA', title: 'PRESERVED BY SCHOLARS', text: 'Scholars and conservationists helped protect the site through changing times.' },
        { year: '1982', title: 'UNESCO CONTEXT', text: 'Sri Lanka’s heritage sites were recognized for their global significance.' },
        { year: 'TODAY', title: 'CULTURAL LANDMARK', text: 'It remains a protected destination for visitors and historians alike.' },
      ];

  const contactDetails = props.contactDetails?.length
    ? props.contactDetails
    : [
        { label: 'Address', value: `${place.name}, ${place.district?.name}, Sri Lanka` },
        { label: 'Visitor Information', value: '+94 11 2692840' },
        { label: 'Official Website', value: 'www.heritage.gov.lk' },
      ];

  const travelTips = props.tips?.length
    ? props.tips
    : [
        { icon: FiInfo, title: 'Dress Code', text: 'Wear modest clothing suitable for a sacred historic site.' },
        { icon: FiCamera, title: 'Photography rules', text: 'Photography is allowed in public areas, but be respectful around sacred objects and ceremonies.' },
        { icon: FiCheckCircle, title: 'Accessibility', text: 'Ground-level areas are generally accessible. The top sections may involve steps.' },
      ];

  const doItems = props.dos?.length
    ? props.dos
    : [
        'Visit early to avoid heat and crowds.',
        'Keep noise low in sacred areas.',
        'Bring water and sun protection.',
      ];

  const dontItems = props.donts?.length
    ? props.donts
    : [
        'Do not climb on protected monuments.',
        'Do not litter or damage the site.',
        'Do not ignore posted rules.',
      ];

  const nearbyPlaces = props.nearbyPlaces?.length
    ? props.nearbyPlaces
    : [
        { img: galleFort, title: 'Galle Fort', loc: 'Galle - Southern Province', route: '/galle-fort' },
        { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province', route: '/temple-of-the-tooth' },
        { img: galViharaya, title: 'Gal Viharaya', loc: 'Polonnaruwa - North Central Province', route: '/gal-viharaya' },
        { img: sigiriya, title: 'Sigiriya - The Lion Rock', loc: 'Matale - Central Province', route: '/sigiriya-rock-fortress' },
        { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province', route: '/ruwanwelisaya' },
      ];

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      <section className="relative h-[60vh] min-h-[400px]">
        <img src={pageMapImage} alt={place.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

        <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-12 pb-16 max-w-7xl mx-auto">
          <Link to="/all-places" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 w-fit transition-colors">
            <FiArrowLeft /> Back to directory
          </Link>

          <span className="inline-block bg-[#C89B3C] text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4 w-fit">
            {props.storyLabel || place.category}
          </span>
          <h1 className="font-serif text-white text-[3rem] md:text-[4.5rem] font-bold leading-tight mb-4 drop-shadow-lg">
            {props.title || place.name}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-white/90 text-sm md:text-base font-medium">
            <div className="flex items-center gap-2">
              <FiMapPin className="text-[#C89B3C]" />
              {place.district?.name || props.province}
            </div>
            <div className="flex items-center gap-2">
              <FiClock className="text-[#C89B3C]" />
              {place.century || props.drivingTime}
            </div>
          </div>
        </div>
      </section>

      {props.slides?.length ? (
        <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[8px] pt-14">
          <div className="mb-6">
            <p className="text-[#C89B3C] text-[0.8rem] font-bold uppercase tracking-[2px] mb-2">GALLERY</p>
            <h3 className="font-serif text-[2rem] md:text-[2.5rem] font-bold text-[#1f2937]">Place Highlights</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
            {props.slides.map((slide) => (
              <div key={slide.id} className="overflow-hidden rounded-[20px] border border-gray-100 bg-white shadow-sm">
                <img src={slide.image} alt={slide.subtitle} className="h-[220px] w-full object-cover" />
                <div className="p-4">
                  <p className="text-[#C89B3C] text-[0.72rem] font-bold uppercase tracking-[1px] mb-1">{slide.subtitle}</p>
                  <p className="text-[#4b5563] text-[0.9rem] leading-relaxed">{slide.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12">
          <div className="space-y-16 relative overflow-hidden md:overflow-visible">
            <img
              src={mandalaImg}
              alt=""
              className="pointer-events-none absolute bottom-[-20px] right-[-20px] w-[320px] opacity-[0.08] mix-blend-multiply md:right-[-40px] md:w-[460px]"
            />

            <div className="relative z-10">
              <p className="text-[#C89B3C] text-[0.8rem] font-bold uppercase tracking-[2px] mb-2">THE STORY</p>
              <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-6">Historical Significance</h3>
              {storyLines.map((line, idx) => (
                <p key={idx} className="text-[#4b5563] text-[0.95rem] md:text-[1rem] leading-[1.8] mb-4 font-sans">
                  {line}
                </p>
              ))}
            </div>

            <div className="relative z-10">
              <p className="text-[#C89B3C] text-[0.8rem] font-bold uppercase tracking-[2px] mb-2">THROUGH TIME</p>
              <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-8">Historical Timeline</h3>

              <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-10">
                {timelineItems.map((item, idx) => (
                  <div key={item.year} className="relative">
                    <div className={`absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full border-[4px] border-[#F8F6F1] ${idx % 2 === 0 ? 'bg-[#C89B3C]' : 'bg-[#1C5F46]'}`} />
                    <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">{item.year}</span>
                    <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">{item.title}</h4>
                    <p className="text-[#6b7280] text-[0.95rem]">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative z-20">
            <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-fit sticky top-24 border border-gray-50">
              <h3 className="font-serif text-[1.5rem] font-bold text-[#1f2937] mb-3 uppercase tracking-wide">SMART TRAVEL ASSISTANT</h3>
              <p className="text-[#6b7280] text-[0.95rem] mb-6">
                You are currently in <span className="text-[#1C5F46] font-bold">Colombo</span>. Use the route guide, travel details, and local essentials to plan your visit.
              </p>

              <div className="flex items-center gap-2 text-[#1C5F46] font-bold text-[0.85rem] mb-8">
                <FiUsers size={16} /> {props.crowd || 'High Crowd'}
              </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-8 border-b border-[#E2DED5] pb-8 sm:grid-cols-3 mb-10">
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiMapPin className="text-[#1C5F46]" /> Distance</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{props.distance || routeInfo.distance}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiClock className="text-[#1C5F46]" /> Travel Time</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{routeInfo.time}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Best Photography</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{props.photographyTime || '6:30 AM'}</div>
                </div>
              </div>

              <div className="flex gap-3 mb-6">
                <button
                  onClick={() => setRouteMode('driving')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${routeMode === 'driving' ? 'bg-[#1C5F46] text-white' : 'bg-[#f5f5f5] text-[#4b5563]'}`}
                >
                  Driving
                </button>
                <button
                  onClick={() => setRouteMode('walking')}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${routeMode === 'walking' ? 'bg-[#1C5F46] text-white' : 'bg-[#f5f5f5] text-[#4b5563]'}`}
                >
                  Walking
                </button>
              </div>

              <div className="space-y-3 mb-10">
                {(props.essentials || [
                  { icon: FiCoffee, title: 'Restaurants', subtitle: 'Local village area' },
                  { icon: FiHome, title: 'Hotels', subtitle: 'Nearby guesthouses' },
                  { icon: FiDroplet, title: 'Fuel Stations', subtitle: 'Nearby town' },
                  { icon: FiPlus, title: 'Hospitals', subtitle: 'Nearest medical center' },
                  { icon: FiWind, title: 'Washrooms', subtitle: 'On-site facilities' },
                  { icon: FiTruck, title: 'Bus Stops', subtitle: 'Nearest stop' },
                  { icon: FiMap, title: 'Parking', subtitle: 'Visitor parking' },
                ] as EssentialItem[]).map((item, idx) => {
                  const IconComponent = item.icon ?? [FiCoffee, FiHome, FiDroplet, FiPlus, FiWind, FiTruck, FiMap][idx % 7];

                  return (
                    <div key={`${item.title}-${idx}`} className="flex items-start gap-3 bg-[#f8faf7] rounded-3xl p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#e7f3e7] text-[#1C5F46]">
                        <IconComponent size={18} />
                      </div>
                      <div>
                        <p className="text-sm text-[#1f2937] font-semibold">{item.title}</p>
                        <p className="text-sm text-[#6b7280]">{item.subtitle}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <a
                href={directionsUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center w-full rounded-2xl bg-[#1C5F46] px-5 py-3 text-sm font-semibold text-white hover:bg-[#163d32] transition-colors"
              >
                View Route on Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] relative mt-16">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 overflow-hidden">
          <img src={mandalaImg} alt="" className="w-[500px] opacity-[0.06] mix-blend-multiply" />
        </div>

        <div className="relative z-10 mb-12">
          <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">{place.name.toUpperCase()}</p>
          <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937]">Opening Hours & Contact Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          <div>
            <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 mb-8 w-full md:w-max pr-6 md:pr-16">
              <h4 className="font-bold text-[1.2rem] text-[#1f2937] mb-1">Opening Hours</h4>
              <p className="text-[#6b7280] text-[0.95rem]">{props.openingHours || 'Open Daily from 7:00 AM to 5:30 PM'}</p>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] mb-8 font-sans leading-relaxed">
              Visiting early in the morning gives the best light for photos and the most comfortable temperatures for walking.
            </p>

            <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-8 mb-10 ml-8">
              {[
                { label: 'Early Morning', time: '7:00 AM – 10:00 AM' },
                { label: 'Midday', time: '10:00 AM – 2:00 PM' },
                { label: 'Late Afternoon', time: '2:00 PM – 5:30 PM' },
              ].map((item, index) => (
                <div key={item.label} className="relative">
                  <div className={`absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full border-[4px] border-[#F8F6F1] ${index % 2 === 0 ? 'bg-[#C89B3C]' : 'bg-[#1C5F46]'}`} />
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">{item.label}</h5>
                  <p className="text-[#6b7280] text-[0.9rem]">{item.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-white rounded-[24px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 h-full">
              <h4 className="font-bold text-[1.3rem] text-[#1f2937] mb-6">Contact Details</h4>
              <div className="h-[1px] w-full bg-gradient-to-r from-gray-100 to-transparent mb-8" />

              <div className="space-y-6">
                {contactDetails.map((detail) => (
                  <div key={detail.label}>
                    <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">{detail.label}</h5>
                    {detail.label.toLowerCase().includes('http') || detail.value.startsWith('http') ? (
                      <a href={detail.value} target="_blank" rel="noreferrer" className="text-[#4b5563] text-[0.95rem] underline underline-offset-4 decoration-gray-400 hover:text-[#1C5F46]">
                        {detail.value}
                      </a>
                    ) : (
                      <p className="text-[#6b7280] text-[0.95rem]">{detail.value}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold uppercase tracking-[2px] mb-2">GETTING THERE</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Plan Your Route</h3>

        <div className="relative rounded-[24px] border border-gray-100 bg-white p-6 shadow-sm min-h-[400px] overflow-hidden">
          <div className="absolute inset-0 z-0 bg-[#F4F9F7]">
            <iframe
              title={`${place.name} Map`}
              src={`https://maps.google.com/maps?q=${encodeURIComponent(place.name)},+Sri+Lanka&output=embed`}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="relative z-10 mt-auto w-full rounded-[16px] border border-gray-100 bg-white p-4 shadow-sm md:flex md:items-center md:justify-between">
            <div className="mb-4 flex gap-2 md:mb-0">
              <button
                type="button"
                onClick={() => setRouteMode('driving')}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-[0.85rem] font-bold transition-colors ${routeMode === 'driving' ? 'bg-[#E8F3EE] text-[#1C5F46] border border-[#1C5F46]/20' : 'bg-white text-[#6b7280] border border-gray-200'}`}
              >
                <FiTruck /> Driving
              </button>
              <button
                type="button"
                onClick={() => setRouteMode('walking')}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-[0.85rem] font-bold transition-colors ${routeMode === 'walking' ? 'bg-[#E8F3EE] text-[#1C5F46] border border-[#1C5F46]/20' : 'bg-white text-[#6b7280] border border-gray-200'}`}
              >
                <FiMapPin /> Walking
              </button>
            </div>

            <div className="flex gap-6 md:gap-10 mb-4 md:mb-0">
              <div>
                <span className="block text-[#6b7280] text-[0.75rem] uppercase">Distance from Colombo</span>
                <span className="font-bold text-[#1f2937]">{routeInfo.distance}</span>
              </div>
              <div>
                <span className="block text-[#6b7280] text-[0.75rem] uppercase">Estimated time</span>
                <span className="font-bold text-[#1f2937]">{routeInfo.time}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => window.open(directionsUrl, '_blank')}
              className="flex items-center gap-2 rounded-full bg-[#1C5F46] px-6 py-2.5 text-[0.9rem] font-bold text-white shadow-md hover:bg-[#154633] transition-colors"
            >
              <FiNavigation /> Navigate
            </button>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold uppercase tracking-[2px] mb-2">BEFORE YOU GO</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Travel Tips & Etiquette</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="overflow-hidden rounded-[24px] border border-gray-100 bg-white shadow-sm">
            {travelTips.map((item, index) => (
              <div key={item.title} className={`flex gap-4 p-6 ${index < 2 ? 'border-b border-gray-100' : ''}`}>
                {(() => {
                  const TipIcon = item.icon ?? FiInfo;
                  return <TipIcon className="mt-1 shrink-0 text-[#1C5F46]" size={24} />;
                })()}
                <div>
                  <h5 className="font-bold text-[#1f2937] mb-1">{item.title}</h5>
                  <p className="text-[#6b7280] text-[0.9rem]">{item.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col space-y-4">
            <div className="rounded-[24px] border border-[#1C5F46] bg-[#F4F9F7] p-6">
              <h5 className="mb-4 flex items-center gap-2 font-bold text-[#1C5F46]"><FiCheckCircle /> Do's</h5>
              <ul className="space-y-3 text-[0.9rem] text-[#4b5563]">
                {doItems.map((item) => (
                  <li key={item} className="flex gap-2"><FiCheck className="mt-0.5 shrink-0 text-[#1C5F46]" /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="rounded-[24px] border border-[#C66846] bg-[#FFF6F5] p-6">
              <h5 className="mb-4 flex items-center gap-2 font-bold text-[#C66846]"><FiXCircle /> Don'ts</h5>
              <ul className="space-y-3 text-[0.9rem] text-[#4b5563]">
                {dontItems.map((item) => (
                  <li key={item} className="flex gap-2"><FiXCircle className="mt-0.5 shrink-0 text-[#C66846]" size={14} /> {item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center relative">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold uppercase tracking-[2px] mb-2">COMMUNITY</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Visitors Reviews</h3>

        <div className="overflow-hidden rounded-[24px] flex justify-center">
          <div className="review-carousel-track flex gap-6 pb-4 text-left">
            {visibleReviewCards.length > 0 ? (
              visibleReviewCards.map((item, index) => (
                <div key={`${item.name}-${index}`} className="review-card bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 shrink-0 w-[280px] sm:w-[320px] md:w-[320px]">
                  <div className="mb-4 flex items-center gap-4">
                    <img
                      src={item.image || avatarImg}
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover bg-gray-200"
                      onError={(event) => {
                        event.currentTarget.src = avatarImg;
                      }}
                    />
                    <div>
                      <h5 className="text-[1rem] font-bold text-[#1f2937]">{item.name}</h5>
                      <p className="text-[0.75rem] text-[#6b7280]">{item.role}</p>
                    </div>
                  </div>
                  <div className="mb-4 flex gap-1 text-[#C89B3C] text-[0.8rem]">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <span key={starIndex}>{starIndex < (item.rating ?? 5) ? '★' : '☆'}</span>
                    ))}
                  </div>
                  <p className="text-[0.95rem] leading-relaxed text-[#4b5563]">"{item.review}"</p>
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

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold uppercase tracking-[2px] mb-2">OTHER HERITAGE PLACES</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Nearby Places</h3>

        <div className="flex overflow-x-auto snap-x gap-4 pb-4 text-left md:grid md:grid-cols-5 md:pb-0">
          {nearbyPlaces.map((placeInfo, idx) => (
            <Link key={idx} to={placeInfo.route} className="group flex w-[240px] shrink-0 snap-start flex-col overflow-hidden rounded-[16px] border border-gray-100 bg-white shadow-sm sm:w-[280px] md:w-auto">
              <div className="relative h-[150px] overflow-hidden md:h-[120px]">
                <img src={placeInfo.img} alt={placeInfo.title} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
              </div>
              <div className="flex flex-1 flex-col p-3">
                <h4 className="mb-0.5 truncate text-[0.85rem] font-bold text-[#1f2937]">{placeInfo.title}</h4>
                <p className="mb-3 truncate text-[0.7rem] text-[#6b7280]">{placeInfo.loc}</p>
                <span className="mt-auto cursor-pointer text-[0.75rem] font-bold text-[#1C5F46] transition-colors hover:text-[#C89B3C]">View Details →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeritagePlaceDetails;
