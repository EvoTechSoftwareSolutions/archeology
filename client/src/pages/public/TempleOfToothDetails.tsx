import HeritagePlaceDetails from './HeritagePlaceDetails';
import type { Slide } from '../../types/heritagePlaceDetails.types';
import dm1 from '../../assets/dm1.png';
import dm2 from '../../assets/single page 3.png';
import dm3 from '../../assets/single page 5.png';
import dm4 from '../../assets/single page 6.png';
import dm5 from '../../assets/single page 7.png';
import dm6 from '../../assets/single page 4.png';
import dm7 from '../../assets/single page 2.png';

const heroSlides: Slide[] = [
  { id: 'tooth-1', image: dm1, title: 'Temple Of The Tooth', subtitle: "Hevisi Mandapaya (Drummers' Courtyard)", description: '' },
  { id: 'tooth-2', image: dm2, title: 'Temple Of The Tooth', subtitle: 'Vadahitina Maligawa (Inner Chamber)', description: '' },
  { id: 'tooth-3', image: dm3, title: 'Temple Of The Tooth', subtitle: 'Makara Thorana (Dragon Arch)', description: '' },
  { id: 'tooth-4', image: dm4, title: 'Temple Of The Tooth', subtitle: 'Walakulu Bamma (Cloud Wall)', description: '' },
  { id: 'tooth-5', image: dm5, title: 'Temple Of The Tooth', subtitle: 'Sri Dalada Museum', description: '' },
  { id: 'tooth-6', image: dm6, title: 'Temple Of The Tooth', subtitle: 'Natha Devalaya', description: '' },
  { id: 'tooth-7', image: dm7, title: 'Temple Of The Tooth', subtitle: 'Inner Courtyard', description: '' },
];

const TempleOfToothDetails = () => (
  <HeritagePlaceDetails title="Temple Of The Tooth" storyLabel="SACRED RELIC TEMPLE" slides={heroSlides} />
);

export default TempleOfToothDetails;
