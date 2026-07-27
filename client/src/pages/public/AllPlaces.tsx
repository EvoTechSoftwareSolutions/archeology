import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiSearch, FiFilter } from 'react-icons/fi';
import galleFort from '../../assets/places-gallefort.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import polonnaruwa from '../../assets/Polonnaruwa.png';
import sigiriya from '../../assets/places-sigiriya.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import galViharaya from '../../assets/galvihara.png';

const places = [
  {
    id: 1,
    img: templeTooth,
    title: 'Temple of the Sacred Tooth Relic',
    location: 'Kandy, Central Province',
    category: 'Temple',
    desc: 'One of the most sacred Buddhist temples in the world, housing the relic of the tooth of the Buddha.',
    route: '/temple-of-the-tooth',
  },
  {
    id: 2,
    img: sigiriya,
    title: 'Sigiriya – The Lion Rock',
    location: 'Matale, Central Province',
    category: 'Fortress',
    desc: 'An ancient rock fortress and palace ruin surrounded by an extensive network of gardens, canals and moats.',
    route: '/sigiriya-rock-fortress',
  },
  {
    id: 3,
    img: polonnaruwa,
    title: 'Polonnaruwa Ancient City',
    location: 'Polonnaruwa, North Central Province',
    category: 'Ancient City',
    desc: 'The well-preserved ruins of the medieval capital of Sri Lanka, a UNESCO World Heritage Site.',
    route: '#',
  },
  {
    id: 4,
    img: galleFort,
    title: 'Galle Fort',
    location: 'Galle, Southern Province',
    category: 'Fort',
    desc: 'A colonial-era fortification built by the Portuguese and extensively fortified by the Dutch in the 17th century.',
    route: '/galle-fort',
  },
  {
    id: 5,
    img: galViharaya,
    title: 'Gal Viharaya',
    location: 'Polonnaruwa, North Central Province',
    category: 'Temple',
    desc: 'A celebrated rock-cut Buddhist shrine in Polonnaruwa, known for its serene granite Buddha statues.',
    route: '/gal-viharaya',
  },
  {
    id: 6,
    img: ruwanweliseya,
    title: 'Ruwanwelisaya Stupa',
    location: 'Anuradhapura, North Central Province',
    category: 'Stupa',
    desc: 'One of the tallest ancient monuments in the world, built by King Dutugamunu in the 2nd century BC.',
    route: '#',
  },
];

const categories = ['All', 'Temple', 'Fortress', 'Ancient City', 'Fort', 'Stupa'];

const AllPlaces = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = places.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-[#F8F6F1] min-h-screen">
      {/* Hero */}
      <section
        className="relative h-[40vh] min-h-[280px] flex flex-col justify-center items-center text-center px-6"
        style={{ background: 'linear-gradient(135deg,#1C3A2E 0%,#2a4a3a 60%,#1C5F46 100%)' }}
      >
        <p className="text-[#C89B3C] text-[0.8rem] font-bold tracking-[3px] uppercase mb-2">DISCOVER SRI LANKA</p>
        <h1 className="font-serif text-white text-[2.8rem] md:text-[4rem] font-bold uppercase tracking-wide mb-3">
          All Heritage Places
        </h1>
        <p className="text-white/70 max-w-[520px] text-[1rem]">
          Explore the ancient kingdoms, sacred temples, and forgotten civilizations of Sri Lanka.
        </p>
      </section>

      {/* Filters */}
      <section className="max-w-[1200px] mx-auto px-6 md:px-10 py-10">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search places..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 bg-white outline-none focus:border-[#1C5F46] text-sm shadow-sm"
            />
          </div>
          {/* Category Pills */}
          <div className="flex gap-2 flex-wrap items-center">
            <FiFilter className="text-gray-500" size={16} />
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-colors ${
                  activeCategory === cat
                    ? 'bg-[#1C5F46] text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-[#1C5F46]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(place => (
            <div key={place.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 group flex flex-col">
              <div className="h-[200px] overflow-hidden relative">
                <img
                  src={place.img}
                  alt={place.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#1C5F46]/90 text-white text-[0.7rem] font-bold px-3 py-1 rounded-full tracking-wide">
                  {place.category}
                </span>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-1.5 text-[#6b7280] text-xs mb-2">
                  <FiMapPin size={12} className="text-[#C89B3C]" />
                  {place.location}
                </div>
                <h2 className="font-serif font-bold text-[#1f2937] text-[1.1rem] mb-2 leading-snug">{place.title}</h2>
                <p className="text-[#6b7280] text-[0.85rem] leading-relaxed mb-4 flex-1">{place.desc}</p>
                <Link
                  to={place.route}
                  className="inline-flex items-center gap-2 text-[#1C5F46] font-bold text-[0.85rem] hover:text-[#C89B3C] transition-colors mt-auto"
                >
                  View Details →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl font-serif">No places found</p>
            <p className="text-sm mt-2">Try a different search or category.</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default AllPlaces;
