import HeritagePlaceDetails from './HeritagePlaceDetails';
import type { Slide } from '../../types/heritagePlaceDetails.types';
import s1 from '../../assets/lionfoot.jpg';
import s2 from '../../assets/painting.jpg';
import s3 from '../../assets/planning.webp';

const heroSlides: Slide[] = [
  { id: 'sig-1', image: s1, title: 'Sigiriya Rock Fortress', subtitle: 'THE LION ROCK', description: 'A dramatic ancient rock fortress rising above landscaped gardens, reservoirs, frescoes, and royal palace ruins.' },
  { id: 'sig-2', image: s2, title: 'Sigiriya Rock Fortress', subtitle: 'ROYAL REFUGE', description: 'Built as a palace and fortress by King Kashyapa, Sigiriya blends monumental architecture with dramatic natural beauty.' },
  { id: 'sig-3', image: s3, title: 'Sigiriya Rock Fortress', subtitle: 'ANCIENT CITY PLANNING', description: 'Its symmetrical water gardens, terraced walls, and hydraulic systems showcase the engineering skill of the 5th century.' },
];

const SigiriyaDetails = () => (
  <HeritagePlaceDetails title="Sigiriya" storyLabel="THE LION ROCK" slides={heroSlides} />
);

export default SigiriyaDetails;
