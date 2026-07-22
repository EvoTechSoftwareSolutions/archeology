
import mapImg from '../assets/map.png';

const MapSection = () => {

  return (
    <section id="explore" className="relative py-[80px] px-[40px] overflow-hidden" style={{ backgroundColor: '#F8F6F1' }}>
      {/* Background Pattern */}
      
      <div className="max-w-[1200px] mx-auto relative z-10 flex flex-col items-center">
        
        {/* Header Texts */}
        <div className="w-full text-left mb-2">
          <p className="text-gold text-[0.7rem] font-bold tracking-[2px] uppercase mb-2">EXPLORE BY MAP</p>
          <h2 className="font-serif text-[2.2rem] text-text-dark font-bold mb-4">Find The Heritage By Province</h2>
        </div>

        {/* Hover Instruction */}
        <div className="text-center mb-8">
          <h3 className="font-serif text-[1rem] font-bold text-text-dark max-w-[250px] mx-auto leading-snug">
            Hover Any Province Do You Need To Go And Click It
          </h3>
        </div>

        {/* Main Map Area */}
        <div className="relative w-full flex justify-center items-center mt-[-20px]">
          
          {/* Compass Image */}
          <div className="absolute left-[5%] top-[10%]">
            <img src="/images/COMPASS.png" alt="Compass" className="w-[100px] h-[100px] object-contain drop-shadow-xl" />
          </div>

          {/* Sri Lanka Map Interactive Area */}
          <div className="relative z-20 w-[450px] max-w-full group cursor-pointer mt-10">
            {/* Base Map */}
            <img 
              src={mapImg} 
              alt="Sri Lanka Province Map" 
              className="w-full h-auto object-contain drop-shadow-md transition-all duration-500 ease-out" 
            />
            
          
          </div>


          
        </div>
      </div>
    </section>
  );
};

export default MapSection;
