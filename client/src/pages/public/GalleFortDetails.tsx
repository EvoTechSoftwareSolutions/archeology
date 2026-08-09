import HeritagePlaceDetails from './HeritagePlaceDetails';
import galleFort from '../../assets/places-gallefort.png';
import gf2 from '../../assets/GF2.png';
import gf3 from '../../assets/GF3.jpg';

const slides = [
  { id: 'gf-1', image: galleFort, title: 'Galle Fort', subtitle: 'FORTIFIED COASTAL CITY', description: 'A living colonial-era fort city overlooking the Indian Ocean, shaped by Portuguese, Dutch, British, and Sri Lankan history.' },
  { id: 'gf-2', image: gf2, title: 'Galle Fort', subtitle: 'RAMPARTS AND LIGHTHOUSE', description: "The sea-facing ramparts, lighthouse, and colonial streets make Galle Fort one of Sri Lanka's most atmospheric coastal heritage walks." },
  { id: 'gf-3', image: gf3, title: 'Galle Fort', subtitle: 'FORT STREETS AT NIGHT', description: 'The narrow streets inside Galle Fort are ideal for night walking, with softly lit colonial buildings, cafes, boutique shops, and a calm historic atmosphere.' },
];

const GalleFortDetails = () => (
  <HeritagePlaceDetails
    title="Galle Fort"
    province="Southern Province"
    storyLabel="FORTIFIED COASTAL CITY"
    slides={slides}
  />
);

export default GalleFortDetails;
