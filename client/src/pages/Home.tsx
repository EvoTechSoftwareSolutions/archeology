import HeroSection from '../components/layout/home/HeroSection';
import PartnersSection from '../components/layout/home/PartnersSection';
import MapSection from '../components/layout/home/MapSection';
import FeaturesSection from '../components/layout/home/FeaturesSection';
import ContactSection from '../components/layout/home/ContactSection';

const Home = () => {
  return (
    <main>
      <HeroSection />
      <PartnersSection />
      <MapSection />
      <FeaturesSection />
      <ContactSection />
    </main>
  );
};

export default Home;
