import DistrictHeritageExplorer from "./DistrictMap/DistrictHeritageExplorer";

const DistrictMapSection = () => {
  return (
    <section
      id="explore"
      className="relative overflow-hidden py-20 px-6 lg:px-10"
      style={{ backgroundColor: "#F8F6F1" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-10">
          <p className="text-gold text-xs font-bold tracking-[3px] uppercase mb-2">
            Explore By Map
          </p>

          <h2 className="font-serif text-4xl font-bold text-text-dark">
            Find The Heritage By Province
          </h2>
        </div>

        {/* Instruction */}
        <div className="text-center mb-2">
          <p className="font-serif font-semibold text-text-dark">
            Hover any district and click to explore its heritage site.
          </p>
        </div>

        {/* Map Layout */}
        <div className="relative flex items-center justify-center">
          {/* Compass */}
          <div className="hidden xl:block absolute left-0 -top-10 z-30 pointer-events-none">
            <img src="/images/COMPASS.png" alt="Compass" className="w-28" />
          </div>

          {/* Interactive Map — no max-w cap here, so it can use the full 700px map size */}
          <div className="relative z-20 flex w-full justify-center">
            <DistrictHeritageExplorer />
          </div>

          {/* Buddha */}
          <div className="hidden xl:block absolute right-0">
            <img src="/images/image 35.png" alt="Buddha Statue" className="w-52" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default DistrictMapSection;
