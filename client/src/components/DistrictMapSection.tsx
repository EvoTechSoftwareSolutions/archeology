import DistrictHeritageExplorer from "./DistrictMap/DistrictHeritageExplorer";

const DistrictMapSection = () => {
  return (
    <section
      id="explore"
      className="relative overflow-hidden px-4 py-14 sm:px-6 sm:py-20 lg:px-10"
      style={{ backgroundColor: "#F8F6F1" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 sm:mb-10">
          <p className="text-gold mb-2 text-xs font-bold uppercase tracking-[3px]">
            Explore By Map
          </p>
          <h2 className="font-serif text-3xl font-bold text-text-dark sm:text-4xl">
            Find The Heritage By Province
          </h2>
        </div>

        <div className="mb-2 text-center">
          <p className="font-serif text-sm font-semibold text-text-dark sm:text-base">
            Hover any district and click to explore its heritage site.
          </p>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="pointer-events-none absolute -top-10 left-0 z-30 hidden xl:block">
            <img src="/images/COMPASS.png" alt="Compass" className="w-28" />
          </div>

          <div className="relative z-20 flex w-full justify-center">
            <DistrictHeritageExplorer />
          </div>

          <div className="absolute right-0 hidden xl:block">
            <img src="/images/image 35.png" alt="Buddha Statue" className="w-52" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistrictMapSection;