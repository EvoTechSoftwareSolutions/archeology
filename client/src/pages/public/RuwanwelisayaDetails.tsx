import HeritagePlaceDetails from './HeritagePlaceDetails';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import rs1 from '../../assets/RS1.jpg';
import rs2 from '../../assets/RS2.jpg';

const slides = [
  { id: 'rw-1', image: ruwanweliseya, title: 'Ruwanwelisaya', subtitle: 'THE GREAT STUPA' },
  { id: 'rw-2', image: rs1, title: 'Ruwanwelisaya', subtitle: 'ANURADHAPURA HERITAGE' },
  { id: 'rw-3', image: rs2, title: 'Ruwanwelisaya', subtitle: 'SACRED PILGRIMAGE' },
];

const RuwanwelisayaDetails = () => (
  <HeritagePlaceDetails
    title="Ruwanwelisaya"
    province="North Central Province"
    storyLabel="THE GREAT STUPA"
    slides={slides}
  />
);

export default RuwanwelisayaDetails;

