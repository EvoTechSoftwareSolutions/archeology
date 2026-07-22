
import { FiClock, FiMapPin, FiPhone, FiMail, FiCheck, FiInfo } from 'react-icons/fi';

import dm1 from '../dm1.png';
import dm2 from '../dm2.png';
import dm3 from '../dm3.png';
import dm4 from '../dm4.png';
import dm5 from '../dm5.png';
import dm6 from '../dm6.png';
import dm7 from '../dm7.png';

const TempleOfToothDetails = () => {
  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen min-h-[450px] flex flex-col justify-center px-6 md:px-[80px]">
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${dm1}')` }}
        >
          {/* Gradient to darken the left side for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"></div>
        </div>
        
        <div className="relative z-10 max-w-[800px]">
          <h1 className="font-serif text-white text-[45px] md:text-[64px] font-bold leading-[1.2] mb-1 uppercase tracking-wide">
            Temple Of The Tooth
          </h1>
          <h2 className="font-serif text-white text-[20px] md:text-[32px] font-bold tracking-wide uppercase mb-6 opacity-95">
            PATHIHIRIPPUWA (THE OCTAGON)
          </h2>
          
          <div className="h-[2px] w-full max-w-[774px] bg-gradient-to-r from-[#C89B3C] via-[#C89B3C]/80 to-transparent mb-6"></div>
          
          <p className="text-white font-sans font-bold text-[16px] md:text-[24px] leading-[1.4] max-w-[774px]">
            Built during the reign of King Sri Vikrama Rajasinha, this iconic octagonal tower is a hallmark of Kandyan architecture. It was originally used by kings to address the public and is now a repository for ancient ola-leaf manuscripts.
          </p>
        </div>
      </section>

      {/* Image Gallery */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-[60px] -mt-[60px] relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[dm2, dm3, dm4, dm5, dm6, dm7].map((img, idx) => (
            <div key={idx} className="relative group overflow-hidden rounded-[12px] shadow-lg aspect-[4/3]">
              <img src={img} alt={`Gallery ${idx + 1}`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-serif text-lg">Temple Of The Tooth</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content Split */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 pb-[80px]">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-10">
          
          {/* Left Column - Main Details */}
          <div className="space-y-16">
            
            {/* Historical Significance */}
            <div>
              <p className="text-gold text-[0.75rem] font-bold tracking-[2px] uppercase mb-2">OUR STORY</p>
              <h3 className="font-serif text-[2rem] font-bold text-text-dark mb-4">Historical Significance</h3>
              <p className="text-text-muted leading-[1.8] mb-4">
                Sri Dalada Maligawa (Sacred Temple of the Tooth Relic) is a Buddhist temple in the city of Kandy, Sri Lanka. It is located in the royal palace complex of the former Kingdom of Kandy, which houses the relic of the tooth of the Buddha. Since ancient times, the relic has played an important role in local politics because it is believed that whoever holds the relic holds the governance of the country.
              </p>
            </div>

            {/* Historical Timeline */}
            <div>
              <p className="text-gold text-[0.75rem] font-bold tracking-[2px] uppercase mb-2">TIMELINE</p>
              <h3 className="font-serif text-[2rem] font-bold text-text-dark mb-6">Historical Timeline</h3>
              
              <div className="relative pl-6 border-l-2 border-gold/30 space-y-8">
                {[
                  { year: '1595', title: 'Relic Arrives In Kandy', desc: 'The tooth relic is brought to Kandy by King Vimaladharmasuriya I.' },
                  { year: '1603', title: 'Wars & Fires', desc: 'The temple is destroyed during Portuguese invasions.' },
                  { year: '1798', title: 'English Occupation', desc: 'The octagonal Paththirippuwa is built.' },
                  { year: '1998', title: 'Restoration', desc: 'The temple is restored after the LTTE bombing.' },
                  { year: 'TODAY', title: 'Part Of UNESCO', desc: 'A major pilgrimage site and World Heritage location.' }
                ].map((item, idx) => (
                  <div key={idx} className="relative">
                    <div className="absolute -left-[33px] top-1 w-4 h-4 rounded-full bg-gold border-4 border-[#F8F6F1]"></div>
                    <span className="text-gold font-bold text-[0.9rem] mb-1 block">{item.year}</span>
                    <h4 className="font-serif font-bold text-text-dark text-[1.1rem] mb-1">{item.title}</h4>
                    <p className="text-text-muted text-[0.9rem]">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Opening Hours & Contact Details */}
            <div>
              <p className="text-gold text-[0.75rem] font-bold tracking-[2px] uppercase mb-2">PLAN YOUR VISIT</p>
              <h3 className="font-serif text-[2rem] font-bold text-text-dark mb-6">Opening Hours & Contact Details</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-serif font-bold text-[1.2rem] mb-4 flex items-center gap-2"><FiClock className="text-gold"/> Opening Hours</h4>
                  <p className="text-[0.9rem] text-text-muted mb-4">Open daily for devotees and visitors.</p>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-[0.9rem]"><span>Early Morning</span> <strong>5:30 AM - 7:00 AM</strong></li>
                    <li className="flex justify-between text-[0.9rem]"><span>Mid Morning</span> <strong>9:30 AM - 11:00 AM</strong></li>
                    <li className="flex justify-between text-[0.9rem]"><span>Evening</span> <strong>6:30 PM - 8:00 PM</strong></li>
                  </ul>
                  <p className="text-[0.8rem] text-text-muted mt-4 italic">On Wednesdays, a special Nanumura Mangallaya (sacred bathing ceremony) is held.</p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <h4 className="font-serif font-bold text-[1.2rem] mb-4">Contact Details</h4>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <FiMapPin className="text-gold mt-1 shrink-0" />
                      <div>
                        <strong className="block text-[0.9rem] text-text-dark">Address</strong>
                        <span className="text-[0.85rem] text-text-muted">Sri Dalada Veediya, Kandy 20000, Sri Lanka</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FiPhone className="text-gold mt-1 shrink-0" />
                      <div>
                        <strong className="block text-[0.9rem] text-text-dark">Information & Inquiries</strong>
                        <span className="text-[0.85rem] text-text-muted">+94 812 234 226</span>
                      </div>
                    </li>
                    <li className="flex items-start gap-3">
                      <FiInfo className="text-gold mt-1 shrink-0" />
                      <div>
                        <strong className="block text-[0.9rem] text-text-dark">Official Website</strong>
                        <span className="text-[0.85rem] text-text-muted">sridaladamaligawa.lk</span>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Plan Your Route */}
            <div>
              <p className="text-gold text-[0.75rem] font-bold tracking-[2px] uppercase mb-2">GETTING THERE</p>
              <h3 className="font-serif text-[2rem] font-bold text-text-dark mb-6">Plan Your Route</h3>
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="h-[250px] bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden relative">
                   <div className="absolute inset-0 bg-[url('https://maps.wikimedia.org/osm-intl/12/2967/1944.png')] bg-cover bg-center opacity-80"></div>
                   <div className="bg-white/90 p-3 rounded-lg shadow-md relative z-10 flex items-center gap-2 font-bold text-deep-green">
                     <FiMapPin /> Temple of the Tooth Relic
                   </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 px-2">
                  <div className="flex gap-2">
                    <button className="px-4 py-1.5 bg-gray-100 rounded-full text-[0.85rem] font-medium text-text-dark hover:bg-gray-200">By Train</button>
                    <button className="px-4 py-1.5 bg-gray-100 rounded-full text-[0.85rem] font-medium text-text-dark hover:bg-gray-200">By Bus</button>
                  </div>
                  <div className="flex gap-6 text-[0.9rem]">
                    <div>
                      <span className="block text-text-muted text-[0.75rem]">Distance (Colombo)</span>
                      <strong>115 km</strong>
                    </div>
                    <div>
                      <span className="block text-text-muted text-[0.75rem]">Estimated Time</span>
                      <strong>3 hr 15 mins</strong>
                    </div>
                  </div>
                  <button className="px-5 py-2 bg-deep-green text-white rounded-[6px] text-[0.9rem] font-medium hover:bg-gold transition-colors">
                    Get Directions
                  </button>
                </div>
              </div>
            </div>

            {/* Travel Tips & Etiquette */}
            <div>
              <p className="text-gold text-[0.75rem] font-bold tracking-[2px] uppercase mb-2">BEFORE YOU GO</p>
              <h3 className="font-serif text-[2rem] font-bold text-text-dark mb-6">Travel Tips & Etiquette</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <FiCheck />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Dress Code</h4>
                    <p className="text-[0.85rem] text-text-muted">Wear clothing that covers shoulders and knees. White is preferred.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <FiCheck />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Photography</h4>
                    <p className="text-[0.85rem] text-text-muted">Allowed in most areas, but strictly prohibited inside the inner shrine.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                    <FiCheck />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Footwear</h4>
                    <p className="text-[0.85rem] text-text-muted">Remove shoes before entering. A shoe counter is available outside.</p>
                  </div>
                </div>
                
                <div className="bg-white rounded-xl p-5 shadow-sm border border-red-100 flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center shrink-0">
                    <FiInfo />
                  </div>
                  <div>
                    <h4 className="font-bold text-text-dark mb-1">Important</h4>
                    <p className="text-[0.85rem] text-text-muted">Do not pose with your back towards Buddha statues.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column - Sidebar */}
          <div>
            <div className="bg-white rounded-xl p-6 shadow-xl sticky top-24 border border-gray-100">
              <h3 className="font-serif font-bold text-[1.4rem] text-text-dark mb-4">Smart Travel Assistant</h3>
              <p className="text-[0.85rem] text-text-muted mb-6">Plan your journey with real-time insights and AI-powered recommendations.</p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-[#F8F6F1] rounded-lg p-3 text-center">
                  <span className="block text-[0.7rem] text-text-muted uppercase tracking-wider mb-1">Weather</span>
                  <strong className="text-text-dark">28°C</strong>
                  <span className="block text-[0.75rem] text-text-muted">Sunny</span>
                </div>
                <div className="bg-[#F8F6F1] rounded-lg p-3 text-center">
                  <span className="block text-[0.7rem] text-text-muted uppercase tracking-wider mb-1">Crowd Level</span>
                  <strong className="text-orange-500">Moderate</strong>
                  <span className="block text-[0.75rem] text-text-muted">Expect 20m wait</span>
                </div>
              </div>

              <h4 className="font-bold text-[0.9rem] text-text-dark mb-3">Popular User Q&A</h4>
              <div className="space-y-2 mb-6">
                {['Best time to visit?', 'Ticket prices for foreigners?', 'Is parking available?'].map((q, idx) => (
                  <button key={idx} className="w-full text-left px-3 py-2 text-[0.85rem] text-text-dark bg-gray-50 hover:bg-gray-100 rounded-md transition-colors border border-gray-100">
                    {q}
                  </button>
                ))}
              </div>

              <div className="bg-[#F4F9F7] rounded-lg p-4 border border-[#DCEBE5]">
                <h4 className="font-bold text-[#1F5E4E] text-[0.95rem] mb-2">Need a Guide?</h4>
                <p className="text-[0.8rem] text-text-muted mb-3">Book an officially certified tour guide for a richer experience.</p>
                <button className="w-full py-2 bg-[#1F5E4E] text-white rounded-md text-[0.9rem] font-medium hover:bg-gold transition-colors">
                  Book Guide
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </section>

      {/* Visitors Reviews */}
      <section className="bg-white py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <p className="text-gold text-[0.75rem] font-bold tracking-[2px] uppercase mb-2">COMMUNITY</p>
            <h3 className="font-serif text-[2rem] font-bold text-text-dark">Visitors Reviews</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-[#F8F6F1] rounded-xl p-6 border border-gray-100">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div>
                    <h5 className="font-bold text-[0.95rem] text-text-dark">Sarah Jenkins</h5>
                    <div className="flex gap-1 text-gold text-[0.8rem]">★★★★★</div>
                  </div>
                </div>
                <p className="text-[0.85rem] text-text-muted italic leading-[1.6]">
                  "A profoundly spiritual and beautiful place. The architecture is stunning and the evening ceremony was breathtaking. Highly recommend going early to avoid the crowds."
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Nearby Places */}
      <section className="bg-[#F8F6F1] py-[80px]">
        <div className="max-w-[1200px] mx-auto px-6 md:px-10">
          <div className="text-center mb-10">
            <p className="text-gold text-[0.75rem] font-bold tracking-[2px] uppercase mb-2">OTHER HISTORICAL PLACES</p>
            <h3 className="font-serif text-[2rem] font-bold text-text-dark">Nearby Places</h3>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { img: dm3, title: 'Kandy Lake', dist: '0.2 km away' },
              { img: dm4, title: 'Royal Palace', dist: '0.1 km away' },
              { img: dm5, title: 'Udawatta Kele', dist: '1.5 km away' },
              { img: dm6, title: 'Bahirawakanda', dist: '2.0 km away' }
            ].map((place, idx) => (
              <div key={idx} className="bg-white rounded-xl overflow-hidden shadow-sm group cursor-pointer border border-gray-100">
                <div className="h-[140px] overflow-hidden">
                  <img src={place.img} alt={place.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-text-dark mb-1">{place.title}</h4>
                  <p className="text-[0.8rem] text-text-muted mb-3">{place.dist}</p>
                  <span className="text-deep-green font-medium text-[0.85rem] group-hover:text-gold transition-colors">Explore &rarr;</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default TempleOfToothDetails;
