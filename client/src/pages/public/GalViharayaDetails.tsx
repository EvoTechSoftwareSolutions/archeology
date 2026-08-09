import HeritagePlaceDetails from './HeritagePlaceDetails';
import galViharaya from '../../assets/galvihara.png';
import g3 from '../../assets/g3.jpg';
import g4 from '../../assets/g4.jpg';

const slides = [
  { id: 'gv-1', image: galViharaya, title: 'Gal Viharaya', subtitle: 'THE RECLINING BUDDHA', description: 'A monumental granite image of the Buddha in parinirvana, carved directly into the living rock at Polonnaruwa.' },
  { id: 'gv-2', image: g3, title: 'Gal Viharaya', subtitle: 'ANCIENT POLONNARUWA', description: 'Gal Viharaya belongs to the sacred landscape of Polonnaruwa, the medieval capital shaped by royal patronage and Buddhist scholarship.' },
  { id: 'gv-3', image: g4, title: 'Gal Viharaya', subtitle: 'SACRED STUPA TRADITION', description: "The site reflects Sri Lanka's long tradition of devotional architecture, meditation spaces, and sculptural mastery." },
];

const GalViharayaDetails = () => (
  <HeritagePlaceDetails
    title="Gal Viharaya"
    province="North Central Province"
    storyLabel="THE RECLINING BUDDHA"
    slides={slides}
  />
);

export default GalViharayaDetails;
