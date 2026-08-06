import { FiTruck, FiMapPin, FiNavigation } from 'react-icons/fi';

interface RouteInfo {
  distance: string;
  time: string;
}

interface PlanYourRouteProps {
  placeName: string;
  mapEmbedSrc: string;
  routeMode: 'driving' | 'walking';
  onRouteModeChange: (mode: 'driving' | 'walking') => void;
  routeInfo: RouteInfo;
  directionsUrl: string;
}

const PlanYourRoute = ({
  placeName,
  mapEmbedSrc,
  routeMode,
  onRouteModeChange,
  routeInfo,
  directionsUrl,
}: PlanYourRouteProps) => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] pt-10 text-center">
      <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">GETTING THERE</p>
      <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Plan Your Route</h3>

      <div className="bg-white rounded-[24px] p-6 shadow-sm border border-gray-100 flex flex-col items-start min-h-[400px] relative overflow-hidden text-left">
        <div className="absolute inset-0 z-0 bg-[#F4F9F7]">
          <iframe
            title={`${placeName} Map`}
            src={mapEmbedSrc}
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
              onClick={() => onRouteModeChange('driving')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[0.85rem] font-bold transition-colors ${
                routeMode === 'driving'
                  ? 'bg-[#E8F3EE] text-[#1C5F46] border border-[#1C5F46]/20'
                  : 'bg-white text-[#6b7280] border border-gray-200'
              }`}
            >
              <FiTruck /> Driving
            </button>
            <button
              type="button"
              onClick={() => onRouteModeChange('walking')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-[0.85rem] font-bold transition-colors ${
                routeMode === 'walking'
                  ? 'bg-[#E8F3EE] text-[#1C5F46] border border-[#1C5F46]/20'
                  : 'bg-white text-[#6b7280] border border-gray-200'
              }`}
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
              <span className="block text-[#6b7280] text-[0.75rem] uppercase">
                Estimated {routeMode === 'driving' ? 'driving' : 'walking'} time
              </span>
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
  );
};

export default PlanYourRoute;