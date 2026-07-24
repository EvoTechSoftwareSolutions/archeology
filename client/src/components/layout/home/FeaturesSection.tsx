

const FeaturesSection = () => {
  return (
    <section className="bg-cream py-[60px] md:py-[90px] px-4 md:px-10 text-center relative overflow-hidden" id="features-section">
      <img src={templeImg} className="absolute left-[-10px] bottom-[60px] h-[250px] opacity-80 z-0 pointer-events-none" alt="" />
      <img src={image37} className="absolute right-0 top-2.5 h-[250px] opacity-80 z-0 pointer-events-none" alt="" />
      
      <div className="relative z-10 max-w-[1200px] mx-auto">
        <p className="text-gold text-[0.72rem] font-bold tracking-[3px] uppercase mb-3">WHY HERITAGE MATTERS</p>
        <h2 className="text-text-dark text-[1.8rem] md:text-[2.2rem] mb-[50px] font-serif font-bold">Preserve Today, Inspire Tomorrow</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-0 bg-transparent">
          <div className="bg-transparent py-5 px-[15px] text-center border-b sm:border-b-0 sm:border-r border-black/8">
            <img src={image18} className="h-12 mb-4 object-contain mx-auto" alt="" />
            <h4 className="text-deep-green font-serif text-[1.1rem] mb-2.5 font-bold">Preserve Our Past</h4>
            <p className="text-text-mid text-[0.75rem] leading-[1.5] font-poppins">Protect ancient monuments and artifacts for future generations</p>
          </div>
          
          <div className="bg-transparent py-5 px-[15px] text-center border-b sm:border-b-0 sm:border-r border-black/8">
            <img src={image19} className="h-12 mb-4 object-contain mx-auto" alt="" />
            <h4 className="text-deep-green font-serif text-[1.1rem] mb-2.5 font-bold">Educate &amp; Inspire</h4>
            <p className="text-text-mid text-[0.75rem] leading-[1.5] font-poppins">Protect ancient monuments and artifacts for future generations</p>
          </div>
          
          <div className="bg-transparent py-5 px-[15px] text-center border-b sm:border-b-0 sm:border-r border-black/8">
            <img src={image20} className="h-12 mb-4 object-contain mx-auto" alt="" />
            <h4 className="text-deep-green font-serif text-[1.1rem] mb-2.5 font-bold">Promote Tourism</h4>
            <p className="text-text-mid text-[0.75rem] leading-[1.5] font-poppins">Protect ancient monuments and artifacts for future generations</p>
          </div>
          
          <div className="bg-transparent py-5 px-[15px] text-center border-b sm:border-b-0 sm:border-r border-black/8 md:border-r">
            <img src={image21} className="h-12 mb-4 object-contain mx-auto" alt="" />
            <h4 className="text-deep-green font-serif text-[1.1rem] mb-2.5 font-bold">Support Research</h4>
            <p className="text-text-mid text-[0.75rem] leading-[1.5] font-poppins">Protect ancient monuments and artifacts for future generations</p>
          </div>
          
          <div className="bg-transparent py-5 px-[15px] text-center sm:border-r-0">
            <img src={image22} className="h-12 mb-4 object-contain mx-auto" alt="" />
            <h4 className="text-deep-green font-serif text-[1.1rem] mb-2.5 font-bold">Cultural Identity</h4>
            <p className="text-text-mid text-[0.75rem] leading-[1.5] font-poppins">Protect ancient monuments and artifacts for future generations</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
