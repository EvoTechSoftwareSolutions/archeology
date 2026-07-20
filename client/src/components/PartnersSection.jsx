import React from 'react';

const PartnersSection = () => {
  return (
    <section className="bg-[#F8F6F1] py-[80px] px-[40px] relative overflow-hidden">
      <img src="/images/image 35.png" alt="" className="absolute left-[10px] top-[20px] h-full max-h-[370px] object-contain object-left-bottom opacity-80 pointer-events-none z-0" />
      
      <div className="relative z-10 w-full text-center top-[60px] pb-[60px]">
        <div className="text-gold text-[0.72rem] font-bold tracking-[3px] uppercase mb-3">OUR PARTNERS IN PRESERVATION</div>
        <h2 className="font-serif text-[clamp(1.6rem,3vw,2.2rem)] font-bold text-text-dark mb-[20px]">
          Working Together For Sri Lanka's Heritage
        </h2>
        <p className="text-[0.95rem] text-text-muted max-w-[680px] mx-auto mb-[50px] leading-[1.75]">
          Preserving Sri Lanka's heritage requires collaboration. We proudly partner with respected academic institutions, government organizations, and cultural experts to protect archaeological sites while making history more accessible to everyone.
        </p>

        <div className="flex justify-center gap-[28px] flex-wrap">
          <div className="bg-white rounded-2xl py-[28px] px-[30px] flex items-start gap-[18px] shadow-[0_4px_24px_rgba(0,0,0,0.07)] max-w-[356px] text-left transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <img src="/images/image 2.png" alt="Royal College Colombo" className="w-[64px] h-[64px] object-contain shrink-0 rounded-lg" />
            <div>
              <h4 className="font-serif text-[1rem] font-bold text-text-dark mb-2">Royal College – Colombo</h4>
              <p className="text-[0.78rem] text-text-muted leading-[1.55]">From its inception at the verandah of a modest church with a mere 30 pupils to becoming the largest and most prominent educational institution in Sri Lanka.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl py-[28px] px-[30px] flex items-start gap-[18px] shadow-[0_4px_24px_rgba(0,0,0,0.07)] max-w-[356px] text-left transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <img src="/images/archelogicaldeptlogo.png" alt="Department of Archaeology" className="w-[64px] h-[64px] object-contain shrink-0 rounded-lg" />
            <div>
              <h4 className="font-serif text-[1rem] font-bold text-text-dark mb-2">Department of Archaeology</h4>
              <p className="text-[0.78rem] text-text-muted leading-[1.55]">From its inception at the verandah of a modest church with a mere 30 pupils to becoming the largest and most prominent educational institution in Sri Lanka.</p>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl py-[28px] px-[30px] flex items-start gap-[18px] shadow-[0_4px_24px_rgba(0,0,0,0.07)] max-w-[356px] text-left transition-all duration-250 hover:-translate-y-1 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)]">
            <img src="/images/WhatsApp_Image_2025-02-23_at_22.38.43-removebg-preview 2.png" alt="HejCeylon" className="w-[64px] h-[64px] object-contain shrink-0 rounded-lg" />
            <div>
              <h4 className="font-serif text-[1rem] font-bold text-text-dark mb-2">HejCeylon</h4>
              <p className="text-[0.78rem] text-text-muted leading-[1.55]">The Department of Archaeology is a non-ministerial government department in Sri Lanka responsible for managing the archaeological heritage.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
