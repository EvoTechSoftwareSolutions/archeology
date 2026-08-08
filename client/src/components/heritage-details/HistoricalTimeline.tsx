import type { TimelineEntry } from '../../types/heritagePlaceDetails.types';

interface HistoricalTimelineProps {
  timelineItems: TimelineEntry[];
}

const HistoricalTimeline = ({ timelineItems }: HistoricalTimelineProps) => {
  return (
    <div className="relative z-10">
      <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">THROUGH TIME</p>
      <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-8">Historical Timeline</h3>

      <div className="relative pl-8 border-l-[3px] border-[#E2DED5] space-y-10">
        {timelineItems.map((item, idx) => (
          <div key={`${item.year}-${idx}`} className="relative">
            <div
              className={`absolute -left-[41px] top-1 w-[18px] h-[18px] rounded-full border-[4px] border-[#F8F6F1] ${
                idx % 3 === 0 ? 'bg-[#C89B3C]' : idx % 3 === 1 ? 'bg-[#1C5F46]' : 'bg-[#C66846]'
              }`}
            />
            <span className="text-[#C89B3C] font-bold text-[0.95rem] mb-1 block tracking-wider">{item.year}</span>
            <h4 className="font-serif font-bold text-[#1f2937] text-[1.2rem] mb-1 uppercase tracking-wide">
              {item.title}
            </h4>
            <p className="text-[#6b7280] text-[0.95rem]">{item.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoricalTimeline;