import { useEffect, useState } from 'react';
import useHistoricalPlace from '../../hooks/useHistoricalPlace';
import { useParams, Link } from 'react-router-dom';
import { FiArrowLeft, FiCoffee, FiHome, FiPlus, FiDroplet, FiWind, FiTruck, FiMapPin, FiMap } from 'react-icons/fi';

import { resolveImageUrl } from '../../utils/imageUtils';
import { useReviews } from '../../hooks/useReviews';

import HeroSection from '../../components/heritage-details/HeroSection';
import PlaceHighlights from '../../components/heritage-details/PlaceHighlights';
import LightboxModal from '../../components/heritage-details/LightboxModal';
import HistoricalSignificance from '../../components/heritage-details/HistoricalSignificance';
import HistoricalTimeline from '../../components/heritage-details/HistoricalTimeline';
import SmartTravelAssistant from '../../components/heritage-details/SmartTravelAssistant';
import OpeningHoursContact from '../../components/heritage-details/OpeningHoursContact';
import PlanYourRoute from '../../components/heritage-details/PlanYourRoute';
import TravelTipsEtiquette from '../../components/heritage-details/TravelTipsEtiquette';
import VisitorsReviews from '../../components/heritage-details/VisitorsReviews';
import NearbyPlaces from '../../components/heritage-details/NearbyPlaces';

import sigiriya from '../../assets/places-sigiriya.png';
import polonnaruwa from '../../assets/Polonnaruwa.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import galleFort from '../../assets/places-gallefort.png';

import type {
  HistoricalPlace,
  ContactDetail,
  EssentialItem,
  Slide,
  HeritagePlaceDetailsProps,
} from '../../types/heritagePlaceDetails.types';

const HeritagePlaceDetails = (props: HeritagePlaceDetailsProps) => {
  const { id } = useParams<{ id: string }>();
  const identifier = id ? (isNaN(Number(id)) ? id : Number(id)) : 0;

  const { place, loading, error } = useHistoricalPlace(identifier);
  const { reviewCards, reviewError } = useReviews();

  const [routeMode, setRouteMode] = useState<'driving' | 'walking'>('driving');
  const [activeCard, setActiveCard] = useState<Slide | null>(null);
  useEffect(() => {
    if (activeCard) {
      document.body.classList.add('lightbox-open');
    } else {
      document.body.classList.remove('lightbox-open');
    }

    return () => {
      document.body.classList.remove('lightbox-open');
    };
  }, [activeCard]);

  const fallbackPlace: HistoricalPlace = {
    id: 0,
    name: props.title || 'Heritage Place',
    category: props.storyLabel || 'Heritage',
    description:
      props.story?.[0] ||
      'This heritage site has played an important role in Sri Lanka’s history and culture, reflecting both religious devotion and architectural skill.',
    image: props.slides?.[0]?.image || sigiriya,
    century: props.drivingTime || 'Unknown',
    statusFlag: 'Active',
    latitude: 0,
    longitude: 0,
    province: { id: 0, name: props.province || 'Sri Lanka' },
    district: { id: 0, name: props.province || 'Central Province' },
    galleryImages: [],
  };

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
        <p className="text-gray-600 mb-8 max-w-md">
          {error || "The heritage place you are looking for doesn't exist or has been moved."}
        </p>
        <Link
          to="/all-places"
          className="inline-flex items-center gap-2 bg-[#1C5F46] text-white px-6 py-3 rounded-full font-bold hover:bg-[#144935] transition-colors"
        >
          <FiArrowLeft /> Back to All Places
        </Link>
      </div>
    );
  }

  // `place` from the hook is treated as `HistoricalPlace`; fall back to defaults for any missing piece.
  const resolvedPlace: HistoricalPlace = { ...fallbackPlace, ...place };

  const resolvedHeroImage = resolveImageUrl(resolvedPlace.image, sigiriya);
  const resolvedGalleryImages = (resolvedPlace.galleryImages || [])
    .slice()
    .sort((a, b) => (a.position ?? 0) - (b.position ?? 0))
    .map((img) => ({ ...img, url: resolveImageUrl(img.url, sigiriya) }));

  const highlightCards: Slide[] =
    (props.slides?.map((slide) => ({
      id: `highlight-${slide.id ?? slide.subtitle ?? slide.image}`,
      image: slide.image,
      title: slide.title || props.title || resolvedPlace.name,
      subtitle: slide.subtitle,
      description: slide.desc,
    })) as Slide[]) ||
    (resolvedGalleryImages.length > 0
      ? resolvedGalleryImages.map((img, idx) => ({
          id: `highlight-gallery-${img.id ?? idx}`,
          image: img.url,
          title: resolvedPlace.name,
          subtitle: img.title || `${resolvedPlace.name} Image ${idx + 1}`,
          description: img.description || resolvedPlace.description || undefined,
        }))
      : [
          {
            id: 'highlight-main',
            image: resolvedHeroImage,
            title: resolvedPlace.name,
            subtitle: resolvedPlace.name,
            description: resolvedPlace.description || undefined,
          },
        ]);

  const allSlides: Slide[] = highlightCards;

  const openCard = (card: Slide) => setActiveCard(card);
  const closeCard = () => setActiveCard(null);

  const navigateCard = (direction: 'prev' | 'next') => {
    if (!activeCard) return;

    const currentIndex = allSlides.findIndex(
      (card) => card.subtitle === activeCard.subtitle && card.image === activeCard.image,
    );
    if (currentIndex === -1) return;

    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % allSlides.length
        : (currentIndex - 1 + allSlides.length) % allSlides.length;

    setActiveCard(allSlides[nextIndex]);
  };

  const mainHeroImage = props.slides?.[0]?.image || resolvedHeroImage;
  const mapQuery = props.mapQuery?.trim();
  const destinationQuery = mapQuery
    ? mapQuery
    : typeof resolvedPlace.latitude === 'number' &&
      typeof resolvedPlace.longitude === 'number' &&
      resolvedPlace.latitude !== 0
    ? `${resolvedPlace.latitude},${resolvedPlace.longitude}`
    : `${props.title || resolvedPlace.name}, Sri Lanka`;

  const directionsUrl = `https://www.google.com/maps/dir/?api=1&origin=Colombo,+Sri+Lanka&destination=${encodeURIComponent(
    destinationQuery,
  )}&travelmode=${routeMode}`;

  const mapEmbedSrc = mapQuery
    ? mapQuery.startsWith('http')
      ? mapQuery
      : `https://maps.google.com/maps?q=${encodeURIComponent(mapQuery)}&output=embed`
    : `https://maps.google.com/maps?q=${encodeURIComponent(
        `${resolvedPlace.latitude},${resolvedPlace.longitude}`,
      )}&output=embed`;

  const distanceStr = resolvedPlace.distance || props.distance || '170 KM';
  const drivingTimeStr = resolvedPlace.drivingTime || props.drivingTime || '4 HR 10 MIN';
  const walkingTimeStr = resolvedPlace.walkingTime || props.walkingTime || '35 HR';
  const crowdStr = resolvedPlace.crowd || props.crowd || 'Moderate Crowd';
  const weatherStr = resolvedPlace.weather || props.weather || 'SUNNY';
  const tempStr = resolvedPlace.temperature || props.temperature || '28°C';
  const bestTimeStr = resolvedPlace.recommendedDeparture || props.bestTime || '6:30 AM';
  const photoTimeStr = resolvedPlace.photographyTime || props.photographyTime || '5:30 PM';

  const routeInfo =
    routeMode === 'driving'
      ? { distance: distanceStr, time: drivingTimeStr }
      : { distance: distanceStr, time: walkingTimeStr };

  const storyLines: string[] = props.story?.length
    ? props.story
    : resolvedPlace.description
    ? resolvedPlace.description.split('\n\n').filter(Boolean)
    : [
        'This heritage site has played an important role in Sri Lanka’s history and culture, reflecting both religious devotion and architectural skill.',
        'Visitors can explore well-preserved archaeological remains, structural ruins, and surrounding sanctuaries that highlight ancient engineering mastery.',
      ];

  let timelineItems: { year: string; title: string; text: string }[] = [];
  if (resolvedPlace.timelineJson) {
    try {
      const parsed = JSON.parse(resolvedPlace.timelineJson);
      if (Array.isArray(parsed) && parsed.length > 0) {
        timelineItems = parsed;
      }
    } catch (e) {
      console.error('Failed to parse timelineJson', e);
    }
  }
  if (timelineItems.length === 0) {
    timelineItems = props.timeline?.length
      ? props.timeline
      : [
          {
            year: resolvedPlace.century || '5th Century',
            title: 'ANCIENT FOUNDATION',
            text: `${resolvedPlace.name} was established during the historic periods.`,
          },
          { year: '1687', title: 'PRESERVED BY KINGDOMS', text: 'Royal patrons contributed to the site expansion and ongoing rituals.' },
          { year: '1982', title: 'UNESCO INSCRIPTION', text: 'Sri Lanka’s heritage sites were recognized for their global value.' },
          { year: '1998', title: 'RESTORATION', text: 'Careful archaeological efforts helped preserve key architectural structures.' },
          { year: 'TODAY', title: 'CULTURAL LANDMARK', text: 'Maintained as an active sanctuary and preserved heritage monument.' },
        ];
  }

  // District & province come back as SIBLING objects on the place, not nested.
  const districtName = resolvedPlace.district?.name || 'Central Province';
  const provinceName = resolvedPlace.province?.name || 'Sri Lanka';

  const contactDetails: ContactDetail[] = props.contactDetails?.length
    ? props.contactDetails
    : [
        { label: 'Address', value: resolvedPlace.contactAddress || `${resolvedPlace.name}, ${districtName}, ${provinceName}, Sri Lanka` },
        { label: 'Administration Division', value: resolvedPlace.contactAdminPhone || '+94 11 269 2840 (for prior appointments)' },
        { label: 'Emergency Contact', value: resolvedPlace.contactEmergencyPhone || '+94 70 156 4347' },
        { label: 'Official Website', value: resolvedPlace.contactWebsite || 'www.heritage.gov.lk' },
        { label: 'Inquiries Email', value: resolvedPlace.contactEmail || 'info@heritage.gov.lk' },
      ];

  const nearbyPlaces = props.nearbyPlaces?.length
    ? props.nearbyPlaces
    : [
        { img: galleFort, title: 'Galle Fort', loc: 'Galle - Southern Province', route: '/galle-fort' },
        { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province', route: '/temple-of-the-tooth' },
        { img: polonnaruwa, title: 'Polonnaruwa', loc: 'Polonnaruwa - North Central Province', route: '/gal-viharaya' },
        { img: sigiriya, title: 'Sigiriya - The Lion Rock', loc: 'Matale - Central Province', route: '/sigiriya-rock-fortress' },
        { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province', route: '/ruwanwelisaya' },
      ];

  // Essentials built dynamically from fields returned for this place.
  const essentials: EssentialItem[] = (() => {
    const items: EssentialItem[] = [];
    if (resolvedPlace.nearbyRestaurant) items.push({ icon: FiCoffee, title: 'Restaurants', subtitle: resolvedPlace.nearbyRestaurant });
    if (resolvedPlace.nearbyHotels) items.push({ icon: FiHome, title: 'Hotels', subtitle: resolvedPlace.nearbyHotels });
    if (resolvedPlace.nearbyFuel) items.push({ icon: FiDroplet, title: 'Fuel Stations', subtitle: resolvedPlace.nearbyFuel });
    if (resolvedPlace.nearbyHospitals) items.push({ icon: FiPlus, title: 'Hospitals', subtitle: resolvedPlace.nearbyHospitals });
    if (resolvedPlace.nearbyWashrooms) items.push({ icon: FiWind, title: 'Washrooms', subtitle: resolvedPlace.nearbyWashrooms });
    if (resolvedPlace.nearbyBusStops) items.push({ icon: FiTruck, title: 'Bus Stops', subtitle: resolvedPlace.nearbyBusStops });
    if (resolvedPlace.nearbyParking) items.push({ icon: FiMapPin, title: 'Parking', subtitle: resolvedPlace.nearbyParking });
    if (resolvedPlace.nearbyRailway) items.push({ icon: FiMap, title: 'Railway', subtitle: resolvedPlace.nearbyRailway });

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

  const dressCodeStr = resolvedPlace.dressCode || "Visitors are requested clothing should cover shoulders, arms, and knees when visiting sacred zones.";
  const photographyRulesStr = resolvedPlace.photographyRules || "Photography allowed except inside designated inner sanctums or during sacred rituals.";
  const accessibilityStr = resolvedPlace.accessibility || "Ground-level monument grounds and walkways offer accessible routes.";

  let dosList: string[] = [];
  if (resolvedPlace.dosJson) {
    try {
      const parsed = JSON.parse(resolvedPlace.dosJson);
      if (Array.isArray(parsed)) dosList = parsed;
    } catch (e) {}
  }
  if (dosList.length === 0) {
    dosList = props.dos || [
      'Attend early morning hours for quiet surroundings',
      'Visit nearby site museums to understand history',
      'Shoes must be removed at designated counters before entry',
    ];
  }

  let dontsList: string[] = [];
  if (resolvedPlace.dontsJson) {
    try {
      const parsed = JSON.parse(resolvedPlace.dontsJson);
      if (Array.isArray(parsed)) dontsList = parsed;
    } catch (e) {}
  }
  if (dontsList.length === 0) {
    dontsList = props.donts || [
      'Do not wear shorts or sleeveless tops inside sacred grounds',
      'Do not pose with backs turned directly towards sacred statues',
    ];
  }

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      <HeroSection
        heroImage={mainHeroImage}
        title={props.title || resolvedPlace.name}
        storyLabel={props.storyLabel || resolvedPlace.category}
        firstStoryLine={storyLines[0]}
      />

      <PlaceHighlights highlightCards={highlightCards} onOpenCard={openCard} />

      <LightboxModal activeCard={activeCard} onClose={closeCard} onNavigate={navigateCard} />

      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_450px] gap-12">
          {/* Left Column - Main Details */}
          <div className="space-y-16 relative overflow-hidden md:overflow-visible">
            <HistoricalSignificance storyLines={storyLines} />
            <HistoricalTimeline timelineItems={timelineItems} />
          </div>

          {/* Right Column - Smart Travel Assistant */}
          <SmartTravelAssistant
            crowd={crowdStr}
            routeInfo={routeInfo}
            bestTime={bestTimeStr}
            weather={weatherStr}
            temperature={tempStr}
            photographyTime={photoTimeStr}
            essentials={essentials}
            travelTips={resolvedPlace.travelTips || undefined}
            emergencyPolice={resolvedPlace.emergencyPolice || undefined}
            emergencyAmbulance={resolvedPlace.emergencyAmbulance || undefined}
          />
        </div>
      </section>

      <OpeningHoursContact
        headingLabel={props.title || resolvedPlace.name}
        openingHours={resolvedPlace.openingHours || props.openingHours || 'Open Daily from 6.00AM to 6.00PM'}
        visitNote={
          resolvedPlace.visitNote || props.visitNote || 'Special guided historical tours and light show displays are held during peak holiday seasons.'
        }
        contactDetails={contactDetails}
        earlyMorningSlot={resolvedPlace.earlyMorningSlot || undefined}
        midDaySlot={resolvedPlace.midDaySlot || undefined}
        lateAfternoonSlot={resolvedPlace.lateAfternoonSlot || undefined}
      />

      <PlanYourRoute
        placeName={resolvedPlace.name}
        mapEmbedSrc={mapEmbedSrc}
        routeMode={routeMode}
        onRouteModeChange={setRouteMode}
        routeInfo={routeInfo}
        directionsUrl={directionsUrl}
      />

      <TravelTipsEtiquette
        dressCode={dressCodeStr}
        photographyRules={photographyRulesStr}
        accessibility={accessibilityStr}
        dos={dosList}
        donts={dontsList}
      />

      <VisitorsReviews reviews={reviewCards} reviewError={reviewError} />

      <NearbyPlaces nearbyPlaces={nearbyPlaces} />
    </div>
  );
};

export default HeritagePlaceDetails;