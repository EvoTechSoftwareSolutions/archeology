import { FiInfo, FiCamera, FiCheckCircle, FiCheck, FiXCircle, FiX } from 'react-icons/fi';

interface TravelTipsEtiquetteProps {
  dressCode: string;
  photographyRules: string;
  accessibility: string;
  dos: string[];
  donts: string[];
}

const TravelTipsEtiquette = ({
  dressCode,
  photographyRules,
  accessibility,
  dos,
  donts,
}: TravelTipsEtiquetteProps) => {
  return (
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
              <p className="text-[#6b7280] text-[0.9rem]">{dressCode}</p>
            </div>
          </div>
          <div className="p-6 border-b border-gray-100 flex gap-4 items-start">
            <FiCamera className="text-[#1C5F46] mt-1 shrink-0" size={24} />
            <div>
              <h5 className="font-bold text-[#1f2937] mb-1">Photography rules</h5>
              <p className="text-[#6b7280] text-[0.9rem]">{photographyRules}</p>
            </div>
          </div>
          <div className="p-6 flex gap-4 items-start">
            <FiCheckCircle className="text-[#1C5F46] mt-1 shrink-0" size={24} />
            <div>
              <h5 className="font-bold text-[#1f2937] mb-1">Accessibility</h5>
              <p className="text-[#6b7280] text-[0.9rem]">{accessibility}</p>
            </div>
          </div>
        </div>

        {/* Right Column Dos and Donts */}
        <div className="space-y-4 flex flex-col">
          <div className="bg-[#F4F9F7] border border-[#1C5F46] rounded-[24px] p-6 flex-1">
            <h5 className="font-bold text-[#1C5F46] mb-4 flex items-center gap-2">
              <FiCheckCircle /> Do's
            </h5>
            <ul className="space-y-3">
              {dos.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start">
                  <FiCheck className="text-[#1C5F46] shrink-0 mt-0.5" /> {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-[#FFF6F5] border border-[#C66846] rounded-[24px] p-6 flex-1">
            <h5 className="font-bold text-[#C66846] mb-4 flex items-center gap-2">
              <FiXCircle /> Don'ts
            </h5>
            <ul className="space-y-3">
              {donts.map((item, idx) => (
                <li key={idx} className="flex gap-2 text-[#4b5563] text-[0.9rem] items-start">
                  <FiX className="text-[#C66846] shrink-0 mt-0.5" size={14} /> {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TravelTipsEtiquette;