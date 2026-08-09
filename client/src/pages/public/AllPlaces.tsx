import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMapPin, FiSearch, FiFilter } from 'react-icons/fi';
import sigiriya from '../../assets/places-sigiriya.png';
import { resolveImageUrl } from '../../utils/imageUtils';

interface HeritagePlaceCard {
  id: number;
  title: string;
  location: string;
  category: string;
  desc: string;
  image: string;
  route?: string;
}

const AllPlaces = () => {
  const [places, setPlaces] = useState<HeritagePlaceCard[]>([]);
  const [categories, setCategories] = useState<string[]>(['All']);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPlaces = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch('http://localhost:5000/api/v1/historicalPlace/active');
        if (!res.ok) {
          throw new Error(`Failed to fetch heritage places: ${res.status}`);
        }

        const payload = await res.json();
        const rawPlaces = payload?.data ?? [];
        const mappedPlaces: HeritagePlaceCard[] = rawPlaces.map((place: any) => ({
          id: place.id,
          title: place.name ?? 'Untitled Heritage Place',
          location: `${place.district?.name ?? 'Unknown District'}, ${place.district?.province?.name ?? 'Sri Lanka'}`,
          category: place.category ?? 'Heritage',
          desc: place.description ?? 'Explore this heritage site in Sri Lanka.',
          image: resolveImageUrl(place.image, sigiriya),
          route: `/places/${place.id}`,
        }));

        setPlaces(mappedPlaces);
        const uniqueCategories = Array.from(
          new Set(mappedPlaces.map((item) => item.category).filter(Boolean)),
        ).sort();
        setCategories(['All', ...uniqueCategories]);
      } catch (loadError) {
        console.error(loadError);
        setError('Unable to load heritage places from the database.');
      } finally {
        setLoading(false);
      }
    };

    void loadPlaces();
  }, []);

  const filtered = useMemo(() => {
    const searchText = search.trim().toLowerCase();
    return places.filter((place) => {
      const matchesCategory = activeCategory === 'All' || place.category === activeCategory;
      const matchesSearch =
        place.title.toLowerCase().includes(searchText) ||
        place.location.toLowerCase().includes(searchText) ||
        place.desc.toLowerCase().includes(searchText);
      return matchesCategory && matchesSearch;
    });
  }, [places, activeCategory, search]);

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
                type="button"
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

        {error && (
          <div className="text-center text-red-600 mb-8">
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center py-20 text-gray-500">Loading heritage places...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filtered.map(place => (
                <div key={place.id} className="bg-white rounded-[20px] overflow-hidden shadow-sm border border-gray-100 group flex flex-col">
                  <div className="h-[200px] overflow-hidden relative">
                    <img
                      src={place.image || sigiriya}
                      alt={place.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => { e.currentTarget.src = sigiriya; }}
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
                      to={place.route ?? '#'}
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
          </>
        )}
      </section>
    </div>
  );
};

export default AllPlaces;
