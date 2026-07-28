import HeritagePlaceDetails from './HeritagePlaceDetails';
import ruwanweliseya from '../../assets/Ruwansweliseya.png';
import sigiriya from '../../assets/places-sigiriya.png';
import galleFort from '../../assets/places-gallefort.png';
import galViharaya from '../../assets/galvihara.png';
import templeTooth from '../../assets/places-daladamaligawa.png';
import rs1 from '../../assets/rs1.jpg';
import rs2 from '../../assets/rs2.jpg';

const RuwanwelisayaDetails = () => {
  return (
    <HeritagePlaceDetails
      title="Ruwanwelisaya Stupa"
      province="North Central Province"
      storyLabel="RUWANWELISAYA"
      mapTitle="Ruwanwelisaya Stupa Map"
      mapQuery="Ruwanwelisaya, Anuradhapura, Sri Lanka"
      slides={[
        {
          id: 1,
          image: ruwanweliseya,
          subtitle: 'THE GREAT STUPA',
          desc: 'A sacred white dagoba in Anuradhapura, revered as one of Sri Lanka\'s most important Buddhist monuments.',
        },
        {
          id: 2,
          image: rs1,
          subtitle: 'ANURADHAPURA HERITAGE',
          desc: 'Ruwanwelisaya stands within the ancient capital, surrounded by centuries of royal, monastic, and devotional history.',
        },
        {
          id: 3,
          image: rs2,
          subtitle: 'SACRED PILGRIMAGE',
          desc: 'Pilgrims gather around the stupa for offerings, chanting, and quiet reflection throughout the day.',
        },
      ]}
      story={[
        'Ruwanwelisaya is one of the most venerated stupas in Sri Lanka, traditionally associated with King Dutugemunu in the 2nd century BC. Its massive white dome remains a defining symbol of Anuradhapura.',
        'The stupa continues to be an active place of worship, drawing pilgrims and visitors who come to experience its scale, serenity, and deep spiritual importance.',
      ]}
      timeline={[
        { year: '2ND CENTURY BC', title: 'ROYAL CONSTRUCTION', text: 'King Dutugemunu begins the great stupa as a major act of Buddhist devotion.' },
        { year: 'ANCIENT ERA', title: 'PILGRIMAGE CENTER', text: 'The stupa becomes one of Anuradhapura\'s most important sacred monuments.' },
        { year: '1982', title: 'UNESCO CONTEXT', text: 'The Sacred City of Anuradhapura is inscribed as a World Heritage Site.' },
        { year: 'TODAY', title: 'LIVING SHRINE', text: 'Ruwanwelisaya remains a major worship site for local and international visitors.' },
      ]}
      distance="205 KM"
      drivingTime="4 HR 15MIN"
      walkingTime="42 HR"
      crowd="High Crowd"
      weather="WARM"
      bestTime="MORNING"
      photographyTime="6:30 AM"
      openingHours="Open Daily. The sacred precinct is generally accessible throughout the day."
      visitNote="Early morning and evening visits are more comfortable, with softer light and a calmer atmosphere around the stupa."
      contactDetails={[
        { label: 'Address', value: 'Ruwanwelisaya, Anuradhapura Sacred City, Sri Lanka' },
        { label: 'Managed By', value: 'Temple authorities and Department of Archaeology, Sri Lanka' },
        { label: 'Department Address', value: 'Department of Archaeology, Sir Marcus Fernando Mawatha, Colombo - 07, Sri Lanka.' },
        { label: 'Phone', value: '+94 11 2692840, +94 11 2692841' },
        { label: 'Fax', value: '+94 11 2696250' },
        { label: 'Email', value: 'info@archaeology.gov.lk' },
        { label: 'Nearest City', value: 'Anuradhapura' },
      ]}
      essentials={[
        { title: 'Restaurants', subtitle: 'Anuradhapura Town' },
        { title: 'Hotels', subtitle: 'Sacred City Area' },
        { title: 'Fuel Stations', subtitle: 'Anuradhapura Town' },
        { title: 'Hospitals', subtitle: 'Anuradhapura Teaching Hospital' },
        { title: 'Washrooms', subtitle: 'Visitor Facilities' },
        { title: 'Bus Stops', subtitle: 'Anuradhapura Bus Stand' },
        { title: 'Parking', subtitle: 'Sacred City Parking Areas' },
        { title: 'Railway', subtitle: 'Anuradhapura Railway Station' },
      ]}
      tips={[
        { title: 'Dress Code', text: 'Wear modest white or light-colored clothing suitable for a Buddhist sacred site.' },
        { title: 'Footwear', text: 'Remove shoes and hats before entering sacred areas where required.' },
        { title: 'Worshippers', text: 'Move calmly around the stupa and avoid disturbing religious observances.' },
      ]}
      dos={[
        'Visit early or near sunset for cooler weather.',
        'Walk clockwise around the stupa where appropriate.',
        'Keep voices low and respect worshippers.',
      ]}
      donts={[
        'Do not climb on protected structures or boundary walls.',
        'Do not pose disrespectfully near sacred monuments.',
      ]}
      review="The scale of the stupa and the calm devotion around it make Ruwanwelisaya unforgettable."
      nearbyPlaces={[
        { img: galViharaya, title: 'Gal Viharaya', loc: 'Polonnaruwa - North Central Province', route: '/gal-viharaya' },
        { img: sigiriya, title: 'Sigiriya Rock Fortress', loc: 'Matale - Central Province', route: '/sigiriya-rock-fortress' },
        { img: templeTooth, title: 'Temple of the Tooth', loc: 'Kandy - Central Province', route: '/temple-of-the-tooth' },
        { img: galleFort, title: 'Galle Fort', loc: 'Galle - Southern Province', route: '/galle-fort' },
      ]}
    />
  );
};

export default RuwanwelisayaDetails;
