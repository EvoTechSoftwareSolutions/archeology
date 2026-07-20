import React from 'react';

const ContactSection = () => {
  return (
    <section className="py-[80px] px-[40px] relative overflow-hidden" id="contact-section" style={{ backgroundColor: '#F8F6F1' }}>
      <img src="/images/half.png" className="absolute left-0 top-0 h-full opacity-60 z-0 pointer-events-none object-contain object-left" alt="" />
      
      <div className="max-w-[1100px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10">
        
        {/* Left Side */}
        <div>
          <p className="text-gold text-[0.72rem] font-bold tracking-[3px] uppercase mb-3">CONTACT US</p>
          <h2 className="font-serif text-[2rem] font-bold text-text-dark mb-4 leading-[1.25]">
            Let's Preserve Sri Lanka's<br />Heritage Together
          </h2>
          <p className="text-text-mid text-[0.88rem] leading-[1.65] mb-8 max-w-[85%]">
            Have questions, research inquiries, partnership opportunities, or wish to contribute to documenting 
            Sri Lanka's historical treasures? We'd love to hear from you.
          </p>

          {/* Info Cards Grid */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {/* Address */}
            <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm">
              <div className="text-lg mt-0.5">📍</div>
              <div>
                <h5 className="text-deep-green text-[0.82rem] mb-1 font-bold">Address</h5>
                <p className="text-text-mid text-[0.75rem] leading-[1.4]">Department of Archaeology, Colombo, Sri Lanka</p>
              </div>
            </div>
            {/* Phone */}
            <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm">
              <div className="text-lg mt-0.5">📞</div>
              <div>
                <h5 className="text-deep-green text-[0.82rem] mb-1 font-bold">Phone</h5>
                <p className="text-text-mid text-[0.75rem] leading-[1.4]">+94 11 269 2816<br />+94 11 269 2817</p>
              </div>
            </div>
            {/* Email */}
            <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm">
              <div className="text-lg mt-0.5">✉️</div>
              <div>
                <h5 className="text-deep-green text-[0.82rem] mb-1 font-bold">Email</h5>
                <p className="text-text-mid text-[0.75rem] leading-[1.4]">info@archaeology.gov.lk</p>
              </div>
            </div>
            {/* Office Hours */}
            <div className="bg-white rounded-xl p-4 flex items-start gap-3 shadow-sm">
              <div className="text-lg mt-0.5">🕒</div>
              <div>
                <h5 className="text-deep-green text-[0.82rem] mb-1 font-bold">Office Hours</h5>
                <p className="text-text-mid text-[0.75rem] leading-[1.4]">Monday – Friday<br />8:30 AM – 4:15 PM</p>
              </div>
            </div>
          </div>

          {/* Our Partners */}
          <div>
            <h3 className="font-serif text-[1.3rem] text-text-dark mb-5 font-bold">Our Partners</h3>
            <div className="flex items-center gap-6 flex-wrap">
              <img src="/images/archelogicaldeptlogo.png" className="h-[70px] w-[70px] object-contain" alt="Department of Archaeology" />
              <img src="/images/image 2.png" className="h-[70px] w-[70px] object-contain" alt="Royal College Colombo" />
              <img src="/images/WhatsApp_Image_2025-02-23_at_22.38.43-removebg-preview 2.png" className="h-[70px] w-[100px] object-contain" alt="HejCeylon" />
            </div>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="bg-white rounded-[16px] p-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)]">
          <h3 className="font-serif text-[1.8rem] font-bold text-text-dark mb-1">Send Us A Message</h3>
          <p className="text-[0.83rem] text-text-muted mb-7">We'll get back to you as soon as possible.</p>
          
          <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-5">
            <div>
              <label className="block text-[0.8rem] font-semibold text-text-dark mb-1.5">Full Name</label>
              <input type="text" placeholder="Enter your Full Name" className="w-full px-4 py-2.5 border border-[#e0e0e0] rounded-md text-[0.88rem] font-sans text-text-dark bg-white outline-none transition-colors duration-200 focus:border-deep-green" />
            </div>
            
            <div>
              <label className="block text-[0.8rem] font-semibold text-text-dark mb-1.5">Email Address</label>
              <input type="email" placeholder="Enter Email" className="w-full px-4 py-2.5 border border-[#e0e0e0] rounded-md text-[0.88rem] font-sans text-text-dark bg-white outline-none transition-colors duration-200 focus:border-deep-green" />
            </div>

            <div>
              <label className="block text-[0.8rem] font-semibold text-text-dark mb-1.5">Phone Number</label>
              <input type="text" placeholder="Enter Your Phone Number" className="w-full px-4 py-2.5 border border-[#e0e0e0] rounded-md text-[0.88rem] font-sans text-text-dark bg-white outline-none transition-colors duration-200 focus:border-deep-green" />
            </div>

            <div>
              <label className="block text-[0.8rem] font-semibold text-text-dark mb-1.5">Message</label>
              <textarea placeholder="Enter Your Message" className="w-full px-4 py-2.5 border border-[#e0e0e0] rounded-md text-[0.88rem] font-sans text-text-dark bg-white outline-none transition-colors duration-200 focus:border-deep-green resize-y h-[110px]"></textarea>
            </div>

            <button type="submit" className="w-full bg-deep-green text-white border-none py-3 rounded-md text-[0.92rem] font-semibold cursor-pointer font-sans transition-all duration-200 flex items-center justify-center gap-2 hover:bg-gold hover:text-deep-green">
              ✈ Send Your Message
            </button>
          </form>
        </div>

      </div>
    </section>
  );
};

export default ContactSection;
