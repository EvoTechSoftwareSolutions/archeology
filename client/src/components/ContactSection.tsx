import { FiSend, FiMapPin, FiPhone, FiMail, FiPrinter } from 'react-icons/fi';

const ContactSection = () => {
  return (
    <section className="py-[60px] md:py-[80px] px-4 md:px-[40px] relative overflow-hidden" id="contact-section" style={{ backgroundColor: '#F8F6F1' }}>
      {/* Background Decorative Graphic */}
      <img src="/images/half.png" className="absolute left-0 top-0 h-full opacity-60 z-0 pointer-events-none object-contain object-left" alt="" />

      <div className="max-w-[1140px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 relative z-10 items-start">

        {/* Left Side Info */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#C5A253] text-[0.72rem] font-bold tracking-[3px] uppercase">CONTACT US</span>
            <div className="h-[1px] w-12 bg-[#C5A253]/40"></div>
          </div>

          <h2 className="font-serif text-[2.1rem] md:text-[2.4rem] font-bold text-[#1a3a2a] mb-4 leading-[1.2]">
            Let’s Preserve Sri Lanka’s<br />Heritage Together
          </h2>

          <p className="text-gray-600 text-[0.88rem] leading-[1.65] mb-8 max-w-[95%]">
            Have questions, research inquiries, partnership opportunities, or wish to contribute to documenting Sri Lanka’s historical treasures? We’d love to hear from you.
          </p>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-1 min-[518px]:grid-cols-2 gap-3.5 mb-10">
            
            {/* Address */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[14px] p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="w-9 h-9 rounded-full border border-[#1F5E4E]/20 bg-[#1F5E4E]/5 flex items-center justify-center text-[#1F5E4E] shrink-0">
                <FiMapPin size={17} />
              </div>
              <div>
                <h5 className="text-[#1F5E4E] text-[0.85rem] font-bold">Address</h5>
                <p className="text-gray-500 text-[0.72rem] leading-[1.3] mt-0.5">Department of Archaeology,<br />Sir Marcus Fernando Mawatha,<br />Colombo - 07, Sri Lanka.</p>
              </div>
            </div>

            {/* Phone */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[14px] p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="w-9 h-9 rounded-full border border-[#1F5E4E]/20 bg-[#1F5E4E]/5 flex items-center justify-center text-[#1F5E4E] shrink-0">
                <FiPhone size={17} />
              </div>
              <div>
                <h5 className="text-[#1F5E4E] text-[0.85rem] font-bold">Phone</h5>
                <p className="text-gray-500 text-[0.72rem] leading-[1.3] mt-0.5">+94 11 2692840<br />+94 11 2692841</p>
              </div>
            </div>

            {/* Email */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[14px] p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="w-9 h-9 rounded-full border border-[#1F5E4E]/20 bg-[#1F5E4E]/5 flex items-center justify-center text-[#1F5E4E] shrink-0">
                <FiMail size={17} />
              </div>
              <div className="min-w-0">
                <h5 className="text-[#1F5E4E] text-[0.85rem] font-bold">Email</h5>
                <p className="text-gray-500 text-[0.72rem] leading-[1.3] truncate mt-0.5">info@archaeology.gov.lk</p>
              </div>
            </div>

            {/* Fax */}
            <div className="bg-white/90 backdrop-blur-sm rounded-[14px] p-4 flex items-center gap-3.5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-gray-100">
              <div className="w-9 h-9 rounded-full border border-[#1F5E4E]/20 bg-[#1F5E4E]/5 flex items-center justify-center text-[#1F5E4E] shrink-0">
                <FiPrinter size={17} />
              </div>
              <div>
                <h5 className="text-[#1F5E4E] text-[0.85rem] font-bold">Fax</h5>
                <p className="text-gray-500 text-[0.72rem] leading-[1.3] mt-0.5">+94 11 2696250</p>
              </div>
            </div>

          </div>

          {/* Our Partners (Increased logo sizes) */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-serif text-[1.5rem] font-bold text-[#1a3a2a]">Our Partners</h3>
              <div className="h-[1px] w-12 bg-[#C5A253]/40"></div>
            </div>
            
            <div className="flex items-center gap-8 flex-wrap">
              <img src="/images/archelogicaldeptlogo.png" className="h-[80px] md:h-[90px] w-auto object-contain transition-transform hover:scale-105" alt="Department of Archaeology" />
              <img src="/images/image 2.png" className="h-[80px] md:h-[90px] w-auto object-contain transition-transform hover:scale-105" alt="Royal College Colombo" />
              <img src="/images/WhatsApp_Image_2025-02-23_at_22.38.43-removebg-preview 2.png" className="h-[75px] md:h-[85px] w-auto object-contain transition-transform hover:scale-105" alt="HejCeylon" />
            </div>
          </div>

        </div>

        {/* Right Side - Message Form */}
        <div className="bg-white rounded-[24px] p-6 md:p-10 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100/80">
          <h3 className="font-serif text-[1.9rem] font-bold text-[#1a3a2a] mb-1">
            Send Us A Message
          </h3>
          <p className="text-[0.85rem] text-gray-500 mb-6">We'll get back to you as soon as possible.</p>

          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
            <div>
              <label className="block text-[0.82rem] font-semibold text-[#1a3a2a] mb-1.5">Full Name</label>
              <input 
                type="text" 
                placeholder="Enter Full Your Name" 
                className="w-full px-4 py-3 border border-gray-200 rounded-[10px] text-[0.88rem] text-gray-700 bg-gray-50/30 outline-none transition-all duration-200 focus:border-[#1F5E4E] focus:bg-white" 
              />
            </div>

            <div>
              <label className="block text-[0.82rem] font-semibold text-[#1a3a2a] mb-1.5">Email Address</label>
              <input 
                type="email" 
                placeholder="Enter Email" 
                className="w-full px-4 py-3 border border-gray-200 rounded-[10px] text-[0.88rem] text-gray-700 bg-gray-50/30 outline-none transition-all duration-200 focus:border-[#1F5E4E] focus:bg-white" 
              />
            </div>

            <div>
              <label className="block text-[0.82rem] font-semibold text-[#1a3a2a] mb-1.5">Phone Number</label>
              <input 
                type="text" 
                placeholder="Enter Your Phone Number" 
                className="w-full px-4 py-3 border border-gray-200 rounded-[10px] text-[0.88rem] text-gray-700 bg-gray-50/30 outline-none transition-all duration-200 focus:border-[#1F5E4E] focus:bg-white" 
              />
            </div>

            <div>
              <label className="block text-[0.82rem] font-semibold text-[#1a3a2a] mb-1.5">Message</label>
              <textarea 
                placeholder="Enter Your Message" 
                className="w-full px-4 py-3 border border-gray-200 rounded-[10px] text-[0.88rem] text-gray-700 bg-gray-50/30 outline-none transition-all duration-200 focus:border-[#1F5E4E] focus:bg-white resize-y h-[120px]"
              ></textarea>
            </div>

            <button 
              type="submit" 
              className="w-full bg-[#1F5E4E] hover:bg-[#164539] text-white border-none py-3.5 rounded-[10px] text-[0.92rem] font-semibold cursor-pointer transition-all duration-200 flex items-center justify-center gap-2 mt-2 shadow-md hover:shadow-lg"
            >
              <FiSend size={16} /> Send Your Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
