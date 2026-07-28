import HeritagePlaceDetails from './HeritagePlaceDetails';
import galleFort from '../../assets/places-gallefort.png';
import gf2 from '../../assets/GF2.png';
import gf3 from '../../assets/GF3.jpg';
import sigiriya from '../../assets/places-sigiriya.png';
import galViharaya from '../../assets/galvihara.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';

const GalleFortDetails = () => {
  return (
    <HeritagePlaceDetails
      title="Galle Fort"
      province="Southern Province"
      storyLabel="GALLE FORT"
      mapTitle="Galle Fort Map"
      mapQuery="Galle Fort, Galle, Sri Lanka"
      slides={[
        {
          id: 1,
          image: galleFort,
          subtitle: 'FORTIFIED COASTAL CITY',
          desc: 'A living colonial-era fort city overlooking the Indian Ocean, shaped by Portuguese, Dutch, British, and Sri Lankan history.',
        },
        {
          id: 2,
          image: gf2,
          subtitle: 'RAMPARTS AND LIGHTHOUSE',
          desc: 'The sea-facing ramparts, lighthouse, and colonial streets make Galle Fort one of Sri Lanka\'s most atmospheric coastal heritage walks.',
        },
        {
          id: 3,
          image: gf3,
          subtitle: 'FORT STREETS AT NIGHT',
          desc: 'The narrow streets inside Galle Fort are ideal for night walking, with softly lit colonial buildings, cafes, boutique shops, and a calm historic atmosphere.',
        },
      ]}
      story={[
        'Galle Fort is a fortified coastal city first established by the Portuguese and later expanded by the Dutch in the 17th century. Its ramparts, bastions, and street grid still define the old town.',
        'Today the fort is both a protected heritage site and a living neighborhood, with museums, religious buildings, boutiques, cafes, and sea-facing walks.',
      ]}
      timeline={[
        { year: '1588', title: 'PORTUGUESE FORT', text: 'The Portuguese establish early fortifications at Galle.' },
        { year: '17TH CENTURY', title: 'DUTCH EXPANSION', text: 'The Dutch strengthen the ramparts, bastions, and urban layout.' },
        { year: '1988', title: 'UNESCO INSCRIPTION', text: 'Old Town of Galle and its Fortifications is inscribed as a World Heritage Site.' },
        { year: 'TODAY', title: 'LIVING HERITAGE', text: 'The fort remains a working historic town and major visitor destination.' },
      ]}
      distance="125 KM"
      drivingTime="2 HR 20MIN"
      walkingTime="26 HR"
      crowd="Medium Crowd"
      weather="COASTAL"
      bestTime="EVENING"
      photographyTime="5:30 PM"
      openingHours="Open Daily. Public ramparts and streets are accessible throughout the day."
      visitNote="Late afternoon is ideal for walking the ramparts, visiting museums, and watching the sunset near the lighthouse."
      contactDetails={[
        { label: 'Address', value: 'Galle Fort, Galle, Sri Lanka' },
        { label: 'Managed By', value: 'Galle Heritage Foundation and local heritage authorities' },
        { label: 'Nearest City', value: 'Galle' },
      ]}
      essentials={[
        { title: 'Restaurants', subtitle: 'Fort Bazaar Area' },
        { title: 'Hotels', subtitle: 'Galle Fort Hotels' },
        { title: 'Fuel Stations', subtitle: 'Galle Town' },
        { title: 'Hospitals', subtitle: 'Karapitiya Teaching Hospital' },
        { title: 'Washrooms', subtitle: 'Fort Visitor Areas' },
        { title: 'Bus Stops', subtitle: 'Galle Central Bus Stand' },
        { title: 'Parking', subtitle: 'Fort Entrance Parking' },
        { title: 'Railway', subtitle: 'Galle Railway Station' },
      ]}
      tips={[
        { title: 'Walking Route', text: 'Wear comfortable shoes because the best experience is on foot.' },
        { title: 'Sun Protection', text: 'Carry a hat or umbrella for open rampart walks.' },
        { title: 'Local Residents', text: 'Respect homes, schools, and religious spaces inside the living fort.' },
      ]}
      dos={[
        'Walk the ramparts near sunset.',
        'Visit the lighthouse, clock tower, and museums.',
        'Keep streets clean and respect residential areas.',
      ]}
      donts={[
        'Do not climb unsafe rampart edges.',
        'Do not block narrow streets or private entrances for photos.',
      ]}
      review="The fort feels alive, with sea wind, old stone streets, and history around every corner."
      nearbyPlaces={[
        { img: sigiriya, title: 'Sigiriya Rock Fortress', loc: 'Matale - Central Province', route: '/sigiriya-rock-fortress' },
        { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province', route: '/temple-of-the-tooth' },
        { img: galViharaya, title: 'Gal Viharaya', loc: 'Polonnaruwa - North Central Province', route: '/gal-viharaya' },
        { img: ruwanweliseya, title: 'Ruwanwelisaya', loc: 'Anuradhapura - North Central Province', route: '/ruwanwelisaya' },
      ]}
    />
  );
};

export default GalleFortDetails;
