interface HeroSectionProps {
  heroImage: string;
  title: string;
  storyLabel: string;
  firstStoryLine: string;
}

const HeroSection = ({ heroImage, title, storyLabel, firstStoryLine }: HeroSectionProps) => {
  return (
    <section className="relative min-h-[520px] md:min-h-[600px] flex flex-col justify-center px-5 md:px-[28px] py-10 mb-8 md:mb-12 overflow-hidden">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.90) 0%, rgba(0,0,0,0.58) 42%, rgba(0,0,0,0.16) 75%, rgba(0,0,0,0.10) 100%), url('${heroImage}')`,
        }}
      />

      <div className="relative z-10 max-w-[760px] pt-8 md:pt-12 pl-1 md:pl-2">
        <h1 className="font-serif text-white text-[34px] md:text-[58px] font-bold leading-[1.1] mb-2 uppercase tracking-wide drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)]">
          {title}
        </h1>
        <h2 className="font-serif text-white text-[16px] md:text-[20px] font-bold tracking-wide uppercase mb-5 opacity-95 drop-shadow-[0_2px_10px_rgba(0,0,0,0.7)]">
          {storyLabel}
        </h2>

        <p className="text-white font-sans font-medium text-[0.95rem] md:text-[1rem] leading-[1.55] max-w-[640px] drop-shadow-[0_2px_10px_rgba(0,0,0,0.75)]">
          {firstStoryLine}
        </p>
      </div>
    </section>
  );
};

export default HeroSection;