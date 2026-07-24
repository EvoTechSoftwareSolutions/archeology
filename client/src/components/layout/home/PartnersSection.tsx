

const PartnersSection = () => {
  return (
    <section className="bg-[#F8F6F1] py-[60px] md:py-[80px] px-4 md:px-[40px] relative overflow-hidden">
      {/* Background Image / Buddha Outline */}
      <img 
        src={partnerImg} 
        alt="" 
        className="absolute left-[10px] top-[20px] h-full max-h-[370px] object-contain object-left-bottom opacity-80 pointer-events-none z-0" 
      />
      
      <div className="relative z-10 w-full text-center">
        {/* Section Subheading */}
        <div className="text-[#C5A253] text-[0.72rem] font-bold tracking-[3px] uppercase mb-3">
          OUR PARTNERS IN PRESERVATION
        </div>

        {/* Main Section Heading */}
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-[#1a3a2a] mb-[20px]">
          Working Together For Sri Lanka's Heritage
        </h2>

        {/* Section Description */}
        <p className="text-[0.95rem] text-gray-700 max-w-[680px] mx-auto mb-[50px] leading-[1.75]">
          Preserving Sri Lanka's heritage requires collaboration. We proudly partner with respected academic institutions, government organizations, and cultural experts to protect archaeological sites while making history more accessible to everyone.
        </p>

        {/* Cards Grid */}
        <div className="flex justify-center gap-[24px] flex-wrap items-stretch">
          
          {/* Card 1: Royal College - Colombo */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl py-[24px] px-[24px] flex items-center gap-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] max-w-[360px] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/60">
            <img 
              src={royalCollegeLogo} 
              alt="Royal College Colombo" 
              className="w-[85px] h-[85px] object-contain shrink-0" 
            />
            <div>
              <h4 className="font-serif text-[0.95rem] font-bold text-[#1a3a2a] mb-1.5">
                Royal College – Colombo
              </h4>
              <p className="text-[0.75rem] text-gray-600 leading-[1.5]">
                From its inception at the verandah of a modest church with a mere 30 pupils to becoming the largest and most prominent educational institution in Sri Lanka.
              </p>
            </div>
          </div>
          
          {/* Card 2: Department of Archaeology */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl py-[24px] px-[24px] flex items-center gap-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] max-w-[360px] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/60">
            <img 
              src={archDeptLogo} 
              alt="Department of Archaeology" 
              className="w-[85px] h-[85px] object-contain shrink-0" 
            />
            <div>
              <h4 className="font-serif text-[0.95rem] font-bold text-[#1a3a2a] mb-1.5">
                Department of Archaeology
              </h4>
              <p className="text-[0.75rem] text-gray-600 leading-[1.5]">
                Established in 1890, the Department of Archaeology is a non-ministerial government department in Sri Lanka responsible for managing, protecting, and conserving the island's archaeological heritage.
              </p>
            </div>
          </div>
          
          {/* Card 3: HejCeylon */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl py-[24px] px-[24px] flex items-center gap-[18px] shadow-[0_4px_20px_rgba(0,0,0,0.05)] max-w-[360px] text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)] border border-white/60">
            <img 
              src={hejCeylonLogo} 
              alt="HejCeylon" 
              className="w-[85px] h-[85px] object-contain shrink-0" 
            />
            <div>
              <h4 className="font-serif text-[0.95rem] font-bold text-[#1a3a2a] mb-1.5">
                HejCeylon
              </h4>
              <p className="text-[0.75rem] text-gray-600 leading-[1.5]">
                An interactive travel and cultural platform dedicated to showcasing Sri Lanka's heritage, artisanal crafts, vibrant festivals, and natural wonders to global travelers.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default PartnersSection;