import buddhaImg from '../../assets/image 35.png';

interface HistoricalSignificanceProps {
  storyLines: string[];
}

const HistoricalSignificance = ({ storyLines }: HistoricalSignificanceProps) => {
  return (
    <div className="relative z-10">
      <img
        src={buddhaImg}
        alt=""
        className="absolute right-[-20px] md:right-[-40px] bottom-[-20px] w-[300px] md:w-[450px] opacity-[0.15] pointer-events-none mix-blend-multiply"
      />
      <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[2px] uppercase mb-2">THE STORY</p>
      <h3 className="font-serif text-[2.5rem] font-bold text-[#1f2937] mb-6">Historical Significance</h3>
      {storyLines.map((line, idx) => (
        <p key={idx} className="text-[#4b5563] text-[0.95rem] md:text-[1rem] leading-[1.8] mb-4 font-sans">
          {line}
        </p>
      ))}
    </div>
  );
};

export default HistoricalSignificance;