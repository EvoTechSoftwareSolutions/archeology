import mandalaImg from '../../assets/image 36.png';
import type { ContactDetail } from '../../types/heritagePlaceDetails.types';

interface RitualEntry {
  timeWindow: string;
  title: string;
}

interface OpeningHoursContactProps {
  headingLabel: string;
  openingHours: string;
  visitNote: string;
  rituals?: RitualEntry[];
  contactDetails: ContactDetail[];
}

const DEFAULT_RITUALS: RitualEntry[] = [
  { timeWindow: '6:00 AM – 8:30 AM', title: 'Early Morning' },
  { timeWindow: '10:00 AM – 1:00 PM', title: 'Mid-Day' },
  { timeWindow: '3:30 PM – 6:00 PM', title: 'Late Afternoon' },
];

const OpeningHoursContact = ({
  headingLabel,
  openingHours,
  visitNote,
  rituals = DEFAULT_RITUALS,
  contactDetails,
}: OpeningHoursContactProps) => {
  return (
    <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px] relative mt-16">
      <div className="absolute inset-0 flex justify-center items-center pointer-events-none z-0 overflow-hidden">
        <img src={mandalaImg} alt="" className="w-[500px] opacity-[0.06] mix-blend-multiply" />
      </div>

      <div className="relative z-10 mb-12">
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">
          {headingLabel.toUpperCase()}
        </p>
        <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937]">Opening Hours & Contact Details</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        {/* Left Column */}
        <div>
          <div className="bg-white rounded-[16px] p-6 shadow-sm border border-gray-100 mb-8 w-full md:w-max pr-6 md:pr-16">
            <h4 className="font-bold text-[1.2rem] text-[#1f2937] mb-1">Opening Hours</h4>
            <p className="text-[#6b7280] text-[0.95rem]">{openingHours}</p>
          </div>

          <p className="text-[#4b5563] text-[0.95rem] mb-8 font-sans leading-relaxed">
            Visiting during <span className="font-bold text-[#1f2937]">recommended time slots</span> guarantees
            <br />
            the best experience and peaceful atmosphere
          </p>

          <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-8 mb-10 ml-8">
            {rituals.map((ritual, idx) => (
              <div key={idx} className="relative">
                <div
                  className={`absolute -left-[41px] top-1.5 w-[18px] h-[18px] rounded-full border-[4px] border-[#F8F6F1] ${
                    idx % 3 === 0 ? 'bg-[#C89B3C]' : idx % 3 === 1 ? 'bg-[#1C5F46]' : 'bg-[#C66846]'
                  }`}
                ></div>
                <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-0.5">{ritual.title}</h5>
                <p className="text-[#6b7280] text-[0.9rem]">{ritual.timeWindow}</p>
              </div>
            ))}
          </div>

          <p className="text-[#4b5563] text-[0.95rem] font-sans leading-relaxed pr-10">{visitNote}</p>
        </div>

        {/* Right Column */}
        <div>
          <div className="bg-white rounded-[24px] p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 h-full">
            <h4 className="font-bold text-[1.3rem] text-[#1f2937] mb-6">Contact Details</h4>

            <div className="h-[1px] w-full bg-gradient-to-r from-gray-100 to-transparent mb-8"></div>

            <div className="space-y-6">
              {contactDetails.map((detail, idx) => (
                <div key={idx}>
                  <h5 className="font-bold text-[#1f2937] text-[1.05rem] mb-1">{detail.label}</h5>
                  {detail.value.startsWith('http') || detail.value.includes('.lk') || detail.value.includes('.com') ? (
                    
                     <a href={detail.value.startsWith('http') ? detail.value : `https://${detail.value}`}
                      className="text-[#4b5563] text-[0.95rem] underline underline-offset-4 decoration-gray-400 hover:text-[#C89B3C] transition-colors"
                    >
                      {detail.value}
                    </a>
                  ) : detail.value.includes('@') ? (
                    
                     <a href={`mailto:${detail.value}`}
                      className="text-[#6b7280] text-[0.95rem] hover:text-[#C89B3C] transition-colors"
                    >
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
  );
};

export default OpeningHoursContact;