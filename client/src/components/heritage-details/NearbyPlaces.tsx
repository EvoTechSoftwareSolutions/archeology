import { Link } from 'react-router-dom';
import type { NearbyPlaceEntry } from '../../types/heritagePlaceDetails.types';

interface NearbyPlacesProps {
  nearbyPlaces: NearbyPlaceEntry[];
}

const NearbyPlaces = ({ nearbyPlaces }: NearbyPlacesProps) => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] text-center">
      <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">OTHER HERITAGE PLACES</p>
      <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-10">Nearby Places</h3>

      <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-5 gap-4 text-left pb-4 md:pb-0 snap-x">
        {nearbyPlaces.map((placeItem, idx) => (
          <Link
            key={idx}
            to={placeItem.route}
            className="bg-white rounded-[16px] overflow-hidden shadow-sm group border border-gray-100 flex flex-col shrink-0 w-[240px] sm:w-[280px] md:w-auto snap-start"
          >
            <div className="h-[150px] md:h-[120px] overflow-hidden relative">
              <img
                src={placeItem.img}
                alt={placeItem.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
            <div className="p-3 flex flex-col flex-1">
              <h4 className="font-bold text-[#1f2937] text-[0.85rem] mb-0.5 truncate">{placeItem.title}</h4>
              <p className="text-[0.7rem] text-[#6b7280] mb-3 truncate">{placeItem.loc}</p>
              <span className="text-[#1C5F46] font-bold text-[0.75rem] mt-auto cursor-pointer hover:text-[#C89B3C] transition-colors">
                View Details &rarr;
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default NearbyPlaces;