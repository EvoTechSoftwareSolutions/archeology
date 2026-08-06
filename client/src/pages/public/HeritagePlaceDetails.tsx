import { useEffect, useState, type ComponentType, type SVGProps } from 'react';
import useHistoricalPlace from "../../hooks/useHistoricalPlace";
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
  FiSun,
  FiTruck,
  FiUsers,
  FiWind,
  FiXCircle,
  FiX,
  FiChevronLeft,
  FiChevronRight
} from 'react-icons/fi';
import { FiX as FiCloseIcon } from 'react-icons/fi';
import EmergencyContactsCard from '../../components/EmergencyContactsCard';
import type { GalleryImage } from '../../types/historicalPlace.types';
import avatarImg from '../../assets/avatar.png';
import buddhaImg from '../../assets/image 35.png';
import mandalaImg from '../../assets/image 36.png';
import sigiriya from '../../assets/places-sigiriya.png';
import galViharaya from '../../assets/galvihara.png';
import polonnaruwa from '../../assets/Polonnaruwa.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import galleFort from '../../assets/places-gallefort.png';

/* ------------------------------------------------------------------ */
/* Types — matched to the ACTUAL API response shape                   */
/* ------------------------------------------------------------------ */

interface Province {
  id: number;
  name: string;
  regionCode?: string;
}

interface District {
  id: number;
  name: string;
  provinceId?: number;
}

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
  anchorXPct?: number;
  anchorYPct?: number;
  province: Province;
  district: District;
  galleryImages?: GalleryImage[];
  // Flat fields actually returned by the API (NOT nested in extendedDetails)
  nearbyHotels?: string | null;
  nearbyHospitals?: string | null;
  nearbyRestaurant?: string | null;
  travelTips?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
  slug?: string | null;
  focusKeywords?: string | null;
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
  slides?: { id: number; image: string; subtitle: string; desc?: string; title?: string }[];
  story?: string[];
  timeline?: { year: string; title: string; text: string }[];
  distance?: string;
  drivingTime?: string;
  walkingTime?: string;
  crowd?: string;
  weather?: string;
  temperature?: string;
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

const HeritagePlaceDetails = (props: HeritagePlaceDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const placeId = Number(id);

  const {
    place,
    loading,
    error
  } = useHistoricalPlace(placeId);

  const [routeMode, setRouteMode] = useState<'driving' | 'walking'>('driving');
  const [reviewCards, setReviewCards] = useState<ReviewItem[]>([]);
  const [reviewError, setReviewError] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<{ image: string; title: string; subtitle?: string } | null>(null);

  const visibleReviewCards = reviewCards.slice(0, 3);

  const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
  const API = import.meta.env.VITE_API_BASE_URL
    ? `${import.meta.env.VITE_API_BASE_URL}/api/v1`
    : '/api/v1';

  /**
   * Resolves any image reference (relative upload path, absolute URL,
   * data URI, or blob) into something an <img> tag can actually load.
   * Used for both review avatars and place/gallery images since the
   * API returns plain relative paths like "/uploads/xxx.jpg".
   */
  const resolveImageUrl = (image: string | null | undefined, fallback: string) => {
    if (!image) return fallback;
    if (/^(https?:)?\/\//i.test(image) || image.startsWith('data:') || image.startsWith('blob:')) {
      return image;
    }
    return `${API_BASE}${image.startsWith('/') ? image : `/${image}`}`;
  };

  const resolveReviewImage = (image: string | null | undefined) => resolveImageUrl(image, avatarImg);

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
    province: { id: 0, name: props.province || 'Sri Lanka' },
    district: { id: 0, name: props.province || 'Central Province' },
    galleryImages: [],
  };

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setReviewError(null);
        const res = await fetch(`${API}/reviews?all=true`, { credentials: 'include' });
        const responseText = await res.text();
        let json: any = { data: [] };

        if (responseText) {
          try {
            json = JSON.parse(responseText);
          } catch {
            json = { data: [] };
          }
        }

        if (!res.ok) {
          throw new Error(json?.message || 'Failed to load reviews.');
        }

        const publicReviews = (json.data ?? []).map((review: any) => ({
          name: review.reviewerName || 'Guest Reviewer',
          role: review.reviewerRole || 'Visitor',
          review: review.reviewText || '',
          image: review.image || null,
          rating: Number(review.rating) || 5,
        }));

        setReviewCards(publicReviews);
        if (publicReviews.length === 0) {
          setReviewError('No reviews were returned by the API.');
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

  // `place` from the hook is treated as `HistoricalPlace`; fall back to defaults for any missing piece.
  const resolvedPlace: HistoricalPlace = { ...fallbackPlace, ...place };

  type Slide = { id: string; image: string; title: string; subtitle?: string };

  // Resolve the main place image + any gallery images to full, loadable URLs.
  const resolvedHeroImage = resolveImageUrl(resolvedPlace.image, sigiriya);
  const resolvedGalleryImages = (resolvedPlace.galleryImages || [])
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((img) => ({ ...img, url: resolveImageUrl(img.url, sigiriya) }));

  const highlightCards: Slide[] = (props.slides?.map((slide) => ({
    id: `highlight-${slide.id ?? slide.subtitle ?? slide.image}`,
    image: slide.image,
    title: slide.title || props.title || resolvedPlace.name,
    subtitle: slide.subtitle,
  })) || [
    { id: 'highlight-main', image: resolvedHeroImage, title: resolvedPlace.name, subtitle: resolvedPlace.category },
    ...resolvedGalleryImages.map((img, idx) => ({
      id: `highlight-gallery-${img.id ?? idx}`,
      image: img.url,
      title: resolvedPlace.name,
      subtitle: resolvedPlace.category,
    })),
  ]) as Slide[];

  const allSlides: Slide[] = highlightCards;

  const openCard = (card: Slide) => {
    setActiveCard(card);
  };

  const closeCard = () => {
    setActiveCard(null);
  };

  const navigateCard = (direction: 'prev' | 'next') => {
    if (!activeCard) return;

    const currentIndex = allSlides.findIndex((card) => card.subtitle === activeCard.subtitle && card.image === activeCard.image);
    if (currentIndex === -1) return;

    const nextIndex = direction === 'next'
      ? (currentIndex + 1) % allSlides.length
      : (currentIndex - 1 + allSlides.length) % allSlides.length;

    setActiveCard(allSlides[nextIndex]);
  };

  const mainHeroImage = props.slides?.[0]?.image || resolvedHeroImage;
  const mapQuery = props.mapQuery?.trim();
  const destinationQuery = mapQuery
    ? mapQuery
    : typeof resolvedPlace.latitude === 'number' && typeof resolvedPlace.longitude === 'number' && resolvedPlace.latitude !== 0
      ? `${resolvedPlace.latitude},${resolvedPlace.longitude}`
      : `${props.title || resolvedPlace.name}, Sri Lanka`;
  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Colombo,+Sri+Lanka&destination=${encodeURIComponent(destinationQuery)}&travelmode=${routeMode}`;
  const routeInfo = routeMode === 'driving'
    ? { distance: props.distance || '170 KM', time: props.drivingTime || '4 HR 10 MIN' }
    : { distance: props.distance || '170 KM', time: props.walkingTime || '35 HR' };

  const storyLines: string[] = props.story?.length
    ? props.story
    : resolvedPlace.description
    ? resolvedPlace.description.split('\n\n').filter(Boolean)
    : [
        'This heritage site has played an important role in Sri Lanka’s history and culture, reflecting both religious devotion and architectural skill.',
        'Visitors can explore well-preserved archaeological remains, structural ruins, and surrounding sanctuaries that highlight ancient engineering mastery.'
      ];

  const timelineItems = (props.timeline?.length
    ? props.timeline
    : [
        { year: resolvedPlace.century || '5th Century', title: 'ANCIENT FOUNDATION', text: `${resolvedPlace.name} was established during the historic periods.` },
        { year: '1687', title: 'PRESERVED BY KINGDOMS', text: 'Royal patrons contributed to the site expansion and ongoing rituals.' },
        { year: '1982', title: 'UNESCO INSCRIPTION', text: 'Sri Lanka’s heritage sites were recognized for their global value.' },
        { year: '1998', title: 'RESTORATION', text: 'Careful archaeological efforts helped preserve key architectural structures.' },
        { year: 'TODAY', title: 'CULTURAL LANDMARK', text: 'Maintained as an active sanctuary and preserved heritage monument.' },
      ]) as { year: string; title: string; text: string }[];

  // District & province come back as SIBLING objects on the place, not nested.
  const districtName = resolvedPlace.district?.name || 'Central Province';
  const provinceName = resolvedPlace.province?.name || 'Sri Lanka';

  const contactDetails: ContactDetail[] = props.contactDetails?.length
    ? props.contactDetails
    : [
        { label: 'Address', value: `${resolvedPlace.name}, ${districtName}, ${provinceName}, Sri Lanka` },
        { label: 'Administration Division', value: '+94 11 269 2840 (for prior appointments)' },
        { label: 'Emergency Contact', value: '+94 70 156 4347' },
        { label: 'Official Website', value: 'www.heritage.gov.lk' },
        { label: 'Inquiries Email', value: 'info@heritage.gov.lk' },
      ];

  const nearbyPlaces = props.nearbyPlaces?.length
    ? props.nearbyPlaces
    : [
        { img: galleFort, title: 'Galle Fort', loc: 'Galle - Southern Province', route: '/galle-fort' },
        { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province', route: '/temple-of-the-tooth' },
        { img: polonnaruwa, title: 'Polonnaruwa', loc: 'Polonnaruwa - North Central Province', route: '/all-places' },
        { img: sigiriya, title: 'Sigiriya - The Lion Rock', loc: 'Matale - Central Province', route: '/sigiriya-rock-fortress' },
        { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province', route: '/ruwanwelisaya' },
      ];

  // Essentials built ONLY from fields the API actually returns for this place.
  const essentials: EssentialItem[] = (() => {
    const items: EssentialItem[] = [];
    if (resolvedPlace.nearbyRestaurant) items.push({ icon: FiCoffee, title: 'Restaurants', subtitle: resolvedPlace.nearbyRestaurant });
    if (resolvedPlace.nearbyHotels) items.push({ icon: FiHome, title: 'Hotels', subtitle: resolvedPlace.nearbyHotels });
    if (resolvedPlace.nearbyHospitals) items.push({ icon: FiPlus, title: 'Hospitals', subtitle: resolvedPlace.nearbyHospitals });

    return items.length > 0
      ? items
      : props.essentials || [
          { icon: FiCoffee, title: 'Restaurants', subtitle: 'Local Cafes & Dining' },
          { icon: FiHome, title: 'Hotels', subtitle: 'Heritage Rest Houses' },
          { icon: FiDroplet, title: 'Fuel Stations', subtitle: 'National Fuel Stations' },
          { icon: FiPlus, title: 'Hospitals', subtitle: 'District General Hospital' },
          { icon: FiWind, title: 'Washrooms', subtitle: 'Visitor Center Facilities' },
          { icon: FiTruck, title: 'Bus Stops', subtitle: 'Central Bus Stand' },
          { icon: FiMapPin, title: 'Parking', subtitle: 'Public Visitor Parking' },
          { icon: FiMap, title: 'Railway', subtitle: 'Main Railway Station' },
        ];
  })();

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[520px] md:min-h-[600px] flex flex-col justify-center px-5 md:px-[28px] py-10 mb-8 md:mb-12 overflow-hidden">
        <div
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.16) 75%, rgba(0,0,0,0.10) 100%), url('${mainHeroImage}')` }}
        />

        <div className="relative z-10 max-w-[760px] pt-8 md:pt-12 pl-1 md:pl-2">
          <h1 className="font-serif text-white text-[34px] md:text-[58px] font-bold leading-[1.1] mb-2 uppercase tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
            {props.title || resolvedPlace.name}
          </h1>
          <h2 className="font-serif text-white text-[16px] md:text-[20px] font-bold tracking-wide uppercase mb-5 opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
            {props.storyLabel || resolvedPlace.category}
          </h2>

          <p className="text-white font-sans font-medium text-[0.95rem] md:text-[1rem] leading-[1.55] max-w-[640px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
            {storyLines[0]}
          </p>
        </div>
      </section>

      {/* Place Highlights */}
      <section className="max-w-[1400px] mx-auto px-5 md:px-8 pb-10 md:pb-12 relative z-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {highlightCards.map((card: Slide, idx: number) => (
            <button
              key={`${card.subtitle}-${idx}`}
              type="button"
              onClick={() => openCard(card)}
              className="relative group overflow-hidden aspect-[16/9] bg-black rounded-[2px] text-left"
            >
              <img src={card.image} alt={card.title || card.subtitle || 'Highlight image'} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/82 via-black/25 to-transparent" />
            </button>
          ))}
        </div>
      </section>


      {/* Lightbox Modal */}
      {activeCard && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/80 px-4 py-8 backdrop-blur-sm" onClick={closeCard}>
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
              <p className="text-xs font-bold uppercase tracking-[3px] text-[#C89B3C]">{activeCard.title}</p>
              <h3 className="font-serif text-2xl font-bold uppercase tracking-wide">{activeCard.subtitle || activeCard.title}</h3>
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
              {storyLines.map((line: string, idx: number) => (
                <p key={idx} className="text-[#4b5563] text-[0.95rem] md:text-[1rem] leading-[1.8] mb-4 font-sans">
                  {line}
                </p>
              ))}
            </div>

            {/* Historical Timeline */}
            <div className="relative z-10">
              <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">THROUGH TIME</p>
              <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-8">Historical Timeline</h3>

              <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-10">
                {timelineItems.map((item: { year: string; title: string; text: string }, idx: number) => (
                  <div key={`${item.year}-${idx}`} className="relative">
                    <div className={`absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full border-[4px] border-[#F8F6F1] ${idx % 3 === 0 ? 'bg-[#C89B3C]' : idx % 3 === 1 ? 'bg-[#1C5F46]' : 'bg-[#C66846]'}`} />
                    <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">{item.year}</span>
                    <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">{item.title}</h4>
                    <p className="text-[#6b7280] text-[0.95rem]">{item.text}</p>
                  </div>
                ))}
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
                <FiUsers size={16} /> {props.crowd || 'Moderate Crowd'}
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-2 mb-10 pb-8 border-b border-[#E2DED5]">
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiMapPin className="text-[#1C5F46]" /> Distance</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{routeInfo.distance}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiClock className="text-[#1C5F46]" /> Travel Time</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{routeInfo.time}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Recommended Departure</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{props.bestTime || '6:30 AM'}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1"><FiSun className="text-[#1C5F46]" /> Weather</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{props.weather || 'SUNNY'}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Temperature</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{props.temperature || '28°C'}</div>
                </div>
                <div>
                  <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Best Photography</div>
                  <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{props.photographyTime || '5:30 PM'}</div>
                </div>
              </div>

              <h4 className="font-bold text-[#1f2937] text-[1.1rem] mb-6">Nearby essentials</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
                {essentials.map((item: EssentialItem, idx: number) => (
                  <div key={idx} className="flex flex-col border border-[#E2DED5] rounded-[16px] p-3 transition-colors hover:border-[#1C5F46]/30 cursor-pointer">
                    <div className="flex items-center gap-2 font-bold text-[0.85rem] text-[#1f2937] mb-1">
                      {item.icon ? <item.icon className="text-[#1C5F46]" /> : <FiMapPin className="text-[#1C5F46]" />}
                      {item.title}
                    </div>
                    <div className="text-[#6b7280] text-[0.75rem] truncate">{item.subtitle}</div>
                  </div>
                ))}
              </div>

              {resolvedPlace.travelTips && (
                <div className="mb-8 p-4 rounded-[16px] bg-[#F4F9F7] border border-[#1C5F46]/20">
                  <h5 className="font-bold text-[#1C5F46] text-[0.9rem] mb-1">Travel Tips</h5>
                  <p className="text-[#4b5563] text-[0.85rem]">{resolvedPlace.travelTips}</p>
                </div>
              )}

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
          <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">
            {(props.title || resolvedPlace.name).toUpperCase()}
          </p>
          <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937]">Opening Hours & Contact Details</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
          {/* Left Column */}
          <div>
            <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 mb-8 w-full md:w-max pr-6 md:pr-16">
              <h4 className="font-bold text-[1.2rem] text-[#1f2937] mb-1">Opening Hours</h4>
              <p className="text-[#6b7280] text-[0.95rem]">{props.openingHours || 'Open Daily from 6.00AM to 6.00PM'}</p>
            </div>

            <p className="text-[#4b5563] text-[0.95rem] mb-8 font-sans leading-relaxed">
              Visiting during <span className="font-bold text-[#1f2937]">recommended time slots</span> guarantees<br />the best experience and peaceful atmosphere
            </p>

            <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-8 mb-10 ml-8">
              {[
                { timeWindow: '6:00 AM – 8:30 AM', title: 'Early Morning' },
                { timeWindow: '10:00 AM – 1:00 PM', title: 'Mid-Day' },
                { timeWindow: '3:30 PM – 6:00 PM', title: 'Late Afternoon' }
              ].map((ritual, idx: number) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full border-[4px] border-[#F8F6F1] ${idx % 3 === 0 ? 'bg-[#C89B3C]' : idx % 3 === 1 ? 'bg-[#1C5F46]' : 'bg-[#C66846]'}`}></div>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">{ritual.title}</h5>
                  <p className="text-[#6b7280] text-[0.9rem]">{ritual.timeWindow}</p>
                </div>
              ))}
            </div>

            <p className="text-[#4b5563] text-[0.95rem] font-sans leading-relaxed pr-10">
              {props.visitNote || 'Special guided historical tours and light show displays are held during peak holiday seasons.'}
            </p>
          </div>

          {/* Right Column */}
          <div>
            <div className="bg-white rounded-[24px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 h-full">
              <h4 className="font-bold text-[1.3rem] text-[#1f2937] mb-6">Contact Details</h4>

              <div className="h-[1px] w-full bg-gradient-to-r from-gray-100 to-transparent mb-8"></div>

              <div className="space-y-6">
                {contactDetails.map((detail: ContactDetail, idx: number) => (
                  <div key={idx}>
                    <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">{detail.label}</h5>
                    {detail.value.startsWith('http') || detail.value.includes('.lk') || detail.value.includes('.com') ? (
                      <a href={detail.value.startsWith('http') ? detail.value : `https://${detail.value}`} className="text-[#4b5563] text-[0.95rem] underline underline-offset-4 decoration-gray-400 hover:text-[#C89B3C] transition-colors">{detail.value}</a>
                    ) : detail.value.includes('@') ? (
                      <a href={`mailto:${detail.value}`} className="text-[#6b7280] text-[0.95rem] hover:text-[#C89B3C] transition-colors">{detail.value}</a>
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

      {/* Plan Your Route */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] pt-10 text-center">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">GETTING THERE</p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Plan Your Route</h3>

        <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-start min-h-[400px] relative overflow-hidden text-left">
          <div className="absolute inset-0 z-0 bg-[#F4F9F7]">
            <iframe
              title={`${resolvedPlace.name} Map`}
              src={mapQuery
                ? mapQuery.startsWith('http')
                  ? mapQuery
                  : `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
                : `https://maps.google.com/maps?q=${encodeURIComponent(`${resolvedPlace.latitude},${resolvedPlace.longitude}`)}&output=embed`}
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
                <p className="text-[#6b7280] text-[0.9rem]">Visitors are requested clothing should cover shoulders, arms, and knees when visiting sacred zones.</p>
              </div>
            </div>
            <div className="p-6 border-b border-gray-100 flex gap-4 items-start">
              <FiCamera className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Photography rules</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Photography allowed except inside designated inner sanctums or during sacred rituals.</p>
              </div>
            </div>
            <div className="p-6 flex gap-4 items-start">
              <FiCheckCircle className="text-[#1C5F46] mt-1 shrink-0" size={24} />
              <div>
                <h5 className="font-bold text-[#1f2937] mb-1">Accessibility</h5>
                <p className="text-[#6b7280] text-[0.9rem]">Ground-level monument grounds and walkways offer accessible routes.</p>
              </div>
            </div>
          </div>

          {/* Right Column Dos and Donts */}
          <div className="space-y-4 flex flex-col">
            <div className="bg-[#F4F9F7] border border-[#1C5F46] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#1C5F46] mb-4 flex items-center gap-2"><FiCheckCircle /> Do's</h5>
              <ul className="space-y-3">
                {(props.dos || [
                  "Attend early morning hours for quiet surroundings",
                  "Visit nearby site museums to understand history",
                  "Shoes must be removed at designated counters before entry"
                ]).map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> {item}</li>
                ))}
              </ul>
            </div>

            <div className="bg-[#FFF6F5] border border-[#C66846] rounded-[24px] p-6 flex-1">
              <h5 className="font-bold text-[#C66846] mb-4 flex items-center gap-2"><FiXCircle /> Don'ts</h5>
              <ul className="space-y-3">
                {(props.donts || [
                  "Do not wear shorts or sleeveless tops inside sacred grounds",
                  "Do not pose with backs turned directly towards sacred statues"
                ]).map((item: string, idx: number) => (
                  <li key={idx} className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start"><FiCloseIcon className="text-[#C66846] shrink-0 mt-0.5" size={14} /> {item}</li>
                ))}
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
              visibleReviewCards.map((item: ReviewItem, index: number) => (
                <div
                  key={`${item.name}-${index}`}
                  className="review-card bg-white rounded-[24px] p-8 shadow-sm border border-gray-100 shrink-0 w-[280px] sm:w-[320px] md:w-[320px]"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={resolveReviewImage(item.image)}
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
                    {Array.from({ length: 5 }).map((_: unknown, starIndex: number) => (
                      <span key={starIndex}>{starIndex < (item.rating ?? 5) ? '★' : '☆'}</span>
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

        <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-5 gap-4 text-left pb-4 md:pb-0 snap-x">
          {nearbyPlaces.map((placeItem: { img: string; title: string; loc: string; route: string }, idx: number) => (
            <Link key={idx} to={placeItem.route} className="bg-white rounded-[16px] overflow-hidden shadow-sm group border border-gray-100 flex flex-col shrink-0 w-[240px] sm:w-[280px] md:w-auto snap-start">
              <div className="h-[150px] md:h-[120px] overflow-hidden relative">
                <img src={placeItem.img} alt={placeItem.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="p-3 flex flex-col flex-1">
                <h4 className="font-bold text-[#1f2937] text-[0.85rem] mb-0.5 truncate">{placeItem.title}</h4>
                <p className="text-[0.7rem] text-[#6b7280] mb-3 truncate">{placeItem.loc}</p>
                <span className="text-[#1C5F46] font-bold text-[0.75rem] mt-auto cursor-pointer hover:text-[#C89B3C] transition-colors">View Details &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HeritagePlaceDetails;