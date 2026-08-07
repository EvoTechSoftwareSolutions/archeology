import { FiUsers, FiMapPin, FiClock, FiSun } from 'react-icons/fi';
import EmergencyContactsCard from '../EmergencyContactsCard';
import type { EssentialItem } from '../../types/heritagePlaceDetails.types';

interface RouteInfo {
  distance: string;
  time: string;
}

interface SmartTravelAssistantProps {
  crowd: string;
  routeInfo: RouteInfo;
  bestTime: string;
  weather: string;
  temperature: string;
  photographyTime: string;
  essentials: EssentialItem[];
  travelTips?: string | null;
  emergencyPolice?: string | null;
  emergencyAmbulance?: string | null;
}

const SmartTravelAssistant = ({
  crowd,
  routeInfo,
  bestTime,
  weather,
  temperature,
  photographyTime,
  essentials,
  travelTips,
  emergencyPolice,
  emergencyAmbulance,
}: SmartTravelAssistantProps) => {
  return (
    <div className="relative z-20">
      <div className="bg-white rounded-[32px] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] h-fit sticky top-24 border border-gray-50">
        <h3 className="font-serif text-[1.5rem] font-bold text-[#1f2937] mb-3 uppercase tracking-wide">
          SMART TRAVEL ASSISTANT
        </h3>
        <p className="text-[#6b7280] text-[0.95rem] mb-6">
          You are currently in <span className="text-[#1C5F46] font-bold">Colombo</span>, here is everything you
          need for the journey
        </p>

        <div className="flex items-center text-[#C66846] font-bold text-[0.85rem] mb-8 gap-2">
          <FiUsers size={16} /> {crowd}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-8 gap-x-2 mb-10 pb-8 border-b border-[#E2DED5]">
          <div>
            <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">
              <FiMapPin className="text-[#1C5F46]" /> Distance
            </div>
            <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{routeInfo.distance}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">
              <FiClock className="text-[#1C5F46]" /> Travel Time
            </div>
            <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{routeInfo.time}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">
              Recommended Departure
            </div>
            <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{bestTime}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">
              <FiSun className="text-[#1C5F46]" /> Weather
            </div>
            <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{weather}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Temperature</div>
            <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{temperature}</div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 text-[#6b7280] text-[0.85rem] mb-1">Best Photography</div>
            <div className="font-serif font-bold text-[1.1rem] text-[#1f2937]">{photographyTime}</div>
          </div>
        </div>

        <h4 className="font-bold text-[#1f2937] text-[1.1rem] mb-6">Nearby essentials</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
          {essentials.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col border border-[#E2DED5] rounded-[16px] p-3 transition-colors hover:border-[#1C5F46]/30 cursor-pointer"
            >
              <div className="flex items-center gap-2 font-bold text-[0.85rem] text-[#1f2937] mb-1">
                {item.icon ? <item.icon className="text-[#1C5F46]" /> : <FiMapPin className="text-[#1C5F46]" />}
                {item.title}
              </div>
              <div className="text-[#6b7280] text-[0.75rem] truncate">{item.subtitle}</div>
            </div>
          ))}
        </div>

        {travelTips && (
          <div className="mb-8 p-4 rounded-[16px] bg-[#F4F9F7] border border-[#1C5F46]/20">
            <h5 className="font-bold text-[#1C5F46] text-[0.9rem] mb-1">Travel Tips</h5>
            <p className="text-[#4b5563] text-[0.85rem]">{travelTips}</p>
          </div>
        )}

        <EmergencyContactsCard
          contacts={[
            { label: 'Police Emergency', value: emergencyPolice || '119' },
            { label: 'Ambulance / Suwaseriya', value: emergencyAmbulance || '1990' },
          ]}
        />
      </div>
    </div>
  );
};

export default SmartTravelAssistant;