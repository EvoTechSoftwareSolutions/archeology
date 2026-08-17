
import { Link } from "react-router-dom";

import type {
  NearbyHistoricalPlace,
} from "../../types/historicalPlace.types";

import { resolveImageUrl } from "../../utils/imageUtils";

interface NearbyPlacesProps {
  nearbyPlaces: NearbyHistoricalPlace[];
}

const NearbyPlaces = ({
  nearbyPlaces,
}: NearbyPlacesProps) => {
  if (!nearbyPlaces || nearbyPlaces.length === 0) {
    return null;
  }

  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px]">
      <div className="mb-6">
        <p className="text-sm font-semibold text-[#C89B3C] uppercase tracking-wider">
          Other Heritage Places
        </p>

        <h3 className="text-xl font-bold text-[#1f2937]">
          Nearby Places
        </h3>
      </div>

      <div className="flex overflow-x-auto custom-scrollbar md:grid md:grid-cols-5 gap-4 text-left pb-4 md:pb-0 snap-x">
        {nearbyPlaces.map((place) => {
          const imageUrl = place.image
            ? resolveImageUrl(place.image)
            : null;

          return (
            <Link
              key={place.id}
              to={`/heritage/${place.id}`}
              className="bg-white rounded-[16px] overflow-hidden shadow-sm group border border-gray-100 flex flex-col shrink-0 w-[240px] sm:w-[280px] md:w-auto snap-start"
            >
              <div className="h-[150px] md:h-[120px] overflow-hidden relative bg-gray-100">
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="text-gray-400 text-sm">
                      No image
                    </span>
                  </div>
                )}
              </div>

              <div className="p-3 flex flex-col flex-1">
                <h4 className="font-bold text-[#1f2937] text-[0.85rem] mb-0.5 truncate">
                  {place.name}
                </h4>

                <p className="text-[0.7rem] text-[#6b7280] mb-3 truncate">
                  {place.district?.name ?? "Unknown district"}
                </p>

                <span className="text-[#1C5F46] font-bold text-[0.75rem] mt-auto cursor-pointer hover:text-[#C89B3C] transition-colors">
                  View Details &rarr;
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default NearbyPlaces;

