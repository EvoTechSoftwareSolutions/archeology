
import { FiBookmark,FiCompass} from 'react-icons/fi';
import mandalaImg from '../../assets/image 36.png';



const OurMission = () => {
  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero Section */}
      <section
        className="relative h-[45vh] min-h-[300px] flex flex-col justify-center items-center text-center px-6"
        style={{
          background:
            'linear-gradient(135deg,#1C3A2E 0%,#2a4a3a 60%,#1C5F46 100%)',
        }}
      >
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-2">
          DEPARTMENT OF ARCHAEOLOGY
        </p>
        <h1 className="font-serif text-white text-[2.8rem] md:text-[4rem] font-bold uppercase tracking-wide">
          Vision & Mission
        </h1>
      </section>

      {/* Vision & Mission Cards Section */}
      <section className="max-w-[1100px] mx-auto px-6 md:px-10 py-16 text-center relative">
        <div className="absolute inset-0 flex justify-center items-center pointer-events-none overflow-hidden">
          <img
            src={mandalaImg}
            alt=""
            className="w-[450px] opacity-[0.05] mix-blend-multiply"
          />
        </div>

        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-3 relative">
          OUR CORE GOALS
        </p>
        <h2 className="font-serif text-[2rem] md:text-[2.6rem] font-bold text-[#1f2937] leading-[1.2] mb-12 relative">
          Safeguarding Sri Lanka’s Heritage
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 text-left">
          {/* Vision Card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E8F3EE] flex items-center justify-center">
                <FiCompass className="text-[#1C5F46]" size={20} />
              </div>
              <span className="text-[#C89B3C] font-bold text-[0.85rem] tracking-[2px] uppercase">
                Vision
              </span>
            </div>
            <h3 className="font-serif font-bold text-[#1C3A2E] text-[1.4rem] mb-3">
              Proper Heritage Management
            </h3>
            <p className="text-[#4b5563] text-[1rem] leading-[1.7]">
              To promote the proper management of Sri Lanka’s archaeological heritage.
            </p>
          </div>

          {/* Mission Card */}
          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-black/5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-[#E8F3EE] flex items-center justify-center">
                <FiBookmark className="text-[#1C5F46]" size={20} />
              </div>
              <span className="text-[#C89B3C] font-bold text-[0.85rem] tracking-[2px] uppercase">
                Mission
              </span>
            </div>
            <h3 className="font-serif font-bold text-[#1C3A2E] text-[1.4rem] mb-3">
              Apex Regulatory Body
            </h3>
            <p className="text-[#4b5563] text-[1rem] leading-[1.7]">
              To function as Sri Lanka’s apex institution and chief regulatory body for the management of its archaeological heritage.
            </p>
          </div>
        </div>
      </section>

   
    </div>
  );
};

export default OurMission;