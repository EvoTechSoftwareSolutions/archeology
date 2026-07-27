import HeritagePlaceDetails from './HeritagePlaceDetails';
import sigiriya from '../../assets/places-sigiriya.png';
import galleFort from '../../assets/places-gallefort.png';
import galViharaya from '../../assets/galvihara.png';
import polonnaruwa from '../../assets/Polonnaruwa.png';
import templeTooth from '../../assets/places-daladamaligawa.png';

const SigiriyaDetails = () => {
  return (
    <HeritagePlaceDetails
      title="Sigiriya Rock Fortress"
      province="Central Province"
      storyLabel="SIGIRIYA"
      mapTitle="Sigiriya Rock Fortress Map"
      mapQuery="Sigiriya Rock Fortress, Sri Lanka"
      slides={[
        {
          id: 1,
          image: sigiriya,
          subtitle: 'THE LION ROCK',
          desc: 'A dramatic ancient rock fortress rising above landscaped gardens, reservoirs, frescoes, and royal palace ruins.',
        },
        {
          id: 2,
          image: templeTooth,
          subtitle: 'ROYAL HERITAGE',
          desc: 'Sigiriya reflects the ambition, artistry, and engineering skill of Sri Lanka during the reign of King Kashyapa.',
        },
        {
          id: 3,
          image: polonnaruwa,
          subtitle: 'ANCIENT CITY PLANNING',
          desc: 'Its symmetrical water gardens and elevated palace remains show one of South Asia\'s most remarkable planned landscapes.',
        },
      ]}
      story={[
        'Sigiriya Rock Fortress is one of Sri Lanka\'s most iconic archaeological sites. The rock summit preserves the remains of a royal palace, while the surrounding gardens show advanced hydraulic planning.',
        'The site is also known for its frescoes, mirror wall, lion staircase, and panoramic views across the Central Province landscape.',
      ]}
      timeline={[
        { year: '477-495 CE', title: 'KING KASHYAPA', text: 'The rock fortress is developed as a royal citadel and palace complex.' },
        { year: 'AFTER 495 CE', title: 'MONASTIC RETURN', text: 'Sigiriya continues as a Buddhist monastic site after the royal period.' },
        { year: '1982', title: 'UNESCO INSCRIPTION', text: 'Sigiriya is inscribed as a World Heritage Site.' },
        { year: 'TODAY', title: 'PROTECTED ICON', text: 'Visitors climb the rock and explore the gardens, frescoes, and palace ruins.' },
      ]}
      distance="170 KM"
      drivingTime="4 HR"
      walkingTime="35 HR"
      crowd="High Crowd"
      weather="WARM"
      bestTime="MORNING"
      photographyTime="6:30 AM"
      openingHours="Open Daily from 7.00AM to 5.30PM"
      visitNote="Early morning is the best time to climb Sigiriya because the stairways are cooler and the summit is clearer for views."
      contactDetails={[
        { label: 'Address', value: 'Sigiriya Rock Fortress, Sigiriya, Sri Lanka' },
        { label: 'Managed By', value: 'Central Cultural Fund and Department of Archaeology' },
        { label: 'Nearest City', value: 'Dambulla' },
      ]}
      essentials={[
        { title: 'Restaurants', subtitle: 'Sigiriya Village Area' },
        { title: 'Hotels', subtitle: 'Hotel Sigiriya' },
        { title: 'Fuel Stations', subtitle: 'Inamaluwa Junction' },
        { title: 'Hospitals', subtitle: 'Dambulla Base Hospital' },
        { title: 'Washrooms', subtitle: 'Visitor Facilities' },
        { title: 'Bus Stops', subtitle: 'Sigiriya Bus Stop' },
        { title: 'Parking', subtitle: 'Main Visitor Parking' },
        { title: 'Railway', subtitle: 'Habarana Railway Station' },
      ]}
      tips={[
        { title: 'Climb Preparation', text: 'Wear comfortable footwear and carry water for the climb.' },
        { title: 'Photography rules', text: 'Photography is restricted in some fresco areas, so follow site signage.' },
        { title: 'Weather', text: 'Avoid climbing during heavy rain or strong wind.' },
      ]}
      dos={[
        'Start the climb early in the morning.',
        'Use marked paths and stairways only.',
        'Keep enough time for the water gardens and museum.',
      ]}
      donts={[
        'Do not lean over railings or restricted edges.',
        'Do not touch frescoes, walls, or protected ruins.',
      ]}
      review="The climb is worth every step, especially when the gardens open beneath you from the summit."
      nearbyPlaces={[
        { img: galViharaya, title: 'Gal Viharaya', loc: 'Polonnaruwa - North Central Province' },
        { img: polonnaruwa, title: 'Polonnaruwa Ancient City', loc: 'Polonnaruwa - North Central Province' },
        { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province' },
        { img: galleFort, title: 'Galle Fort', loc: 'Galle - Southern Province' },
      ]}
    />
  );
};

export default SigiriyaDetails;
