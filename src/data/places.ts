import atwaterMarket from '../assets/places/atwater-market.png';
import biosphereEnvironmentMuseum from '../assets/places/biosphere-environment-museum.png';
import bonsecoursMarket from '../assets/places/bonsecours-market.png';
import habitat67 from '../assets/places/habitat-67.png';
import jeanTalonMarket from '../assets/places/jean-talon-market.png';
import laGrandeRoueMontreal from '../assets/places/la-grande-roue-montreal.png';
import lachineCanal from '../assets/places/lachine-canal.png';
import montrealMuseumFineArts from '../assets/places/montreal-museum-fine-arts.png';
import mountRoyalPark from '../assets/places/mount-royal-park.png';
import notreDameBasilica from '../assets/places/notre-dame-basilica.png';
import oldMontreal from '../assets/places/old-montreal.png';
import oldPortMontreal from '../assets/places/old-port-montreal.png';
import parcJeanDrapeau from '../assets/places/parc-jean-drapeau.png';
import quartierDesSpectacles from '../assets/places/quartier-des-spectacles.png';
import saintJosephsOratory from '../assets/places/saint-josephs-oratory.png';
import saintPaulStreet from '../assets/places/saint-paul-street.png';
import type {Place} from '../types/entities';

export const places: Place[] = [
  {
    id: 'old-montreal',
    name: 'Old Montreal',
    tag: 'Historic District',
    coordinates: {latitude: 45.5075, longitude: -73.5537},
    about:
      'A charming historic area with cobblestone streets, old architecture, cafés, galleries, boutique shops, and atmospheric evening walks.',
    whyVisit:
      'One of the most photogenic and memorable neighborhoods in Montreal, offering centuries of history, warm street lighting, and a refined city atmosphere.',
    bestTime:
      'Afternoon into evening for warm light, lively terraces, and beautiful city photos.',
    localTip:
      'Best visited before sunset if you want soft golden light and a relaxed walk through the old streets.',
    image: oldMontreal,
    icon: '📍',
    accent: 'gold',
  },
  {
    id: 'notre-dame-basilica',
    name: 'Notre-Dame Basilica of Montreal',
    tag: 'Landmark',
    coordinates: {latitude: 45.5045, longitude: -73.5562},
    about:
      'A famous Gothic Revival basilica known for its dramatic interior, deep blue tones, carved details, stained glass, and strong cultural presence in Old Montreal.',
    whyVisit:
      'It is one of the most iconic architectural landmarks in the city and a strong choice for guests who enjoy history, design, and impressive interiors.',
    bestTime:
      'Late morning or early afternoon when the area is active but still comfortable for walking.',
    localTip:
      'Check visiting hours before going, especially if you want to enter rather than only see the exterior.',
    image: notreDameBasilica,
    icon: '⛪',
    accent: 'blue',
  },
  {
    id: 'old-port-montreal',
    name: 'Old Port of Montreal',
    tag: 'Waterfront',
    coordinates: {latitude: 45.5067, longitude: -73.5504},
    about:
      'A lively riverside area with walking paths, waterfront views, seasonal attractions, restaurants, photo spots, and a relaxed urban atmosphere.',
    whyVisit:
      'A great place to extend a casino visit into a scenic city walk, especially if the guest wants open space, river views, and evening lights.',
    bestTime: 'Evening for city lights, river reflections, and a more atmospheric walk.',
    localTip:
      'Combine this stop with Old Montreal for a complete historic-and-waterfront route.',
    image: oldPortMontreal,
    icon: '🌊',
    accent: 'teal',
  },
  {
    id: 'la-grande-roue',
    name: 'La Grande Roue de Montréal',
    tag: 'Photo Spot',
    coordinates: {latitude: 45.5067, longitude: -73.5493},
    about:
      'A large observation wheel in the Old Port area offering views over the city, the river, and the surrounding historic district.',
    whyVisit:
      'Ideal for guests who want a simple but memorable viewpoint without planning a long route through the city.',
    bestTime: 'After sunset for illuminated city views and a more cinematic atmosphere.',
    localTip:
      'Save it as a short evening stop after dinner or before returning to the venue.',
    image: laGrandeRoueMontreal,
    icon: '🎡',
    accent: 'pink',
  },
  {
    id: 'mount-royal-park',
    name: 'Mount Royal Park',
    tag: 'Nature Viewpoint',
    coordinates: {latitude: 45.5017, longitude: -73.5878},
    about:
      'A large urban park with forest trails, green areas, lookout points, and one of the most recognizable views over Montreal.',
    whyVisit:
      'Perfect for guests who want a peaceful outdoor break, a panoramic skyline view, or a calm daytime activity before an evening plan.',
    bestTime:
      'Morning or late afternoon for comfortable walking and softer light at the lookout.',
    localTip: 'Wear comfortable shoes if you plan to walk up to the viewpoint.',
    image: mountRoyalPark,
    icon: '🌲',
    accent: 'green',
  },
  {
    id: 'montreal-museum-fine-arts',
    name: 'Montreal Museum of Fine Arts',
    tag: 'Museum',
    coordinates: {latitude: 45.4987, longitude: -73.5793},
    about:
      'A major cultural museum with art exhibitions, design collections, sculptures, paintings, and rotating cultural displays.',
    whyVisit:
      'A refined indoor choice for guests who want a cultural stop before dinner, a show, or an evening visit.',
    bestTime: 'Early afternoon, especially on cooler or rainy days.',
    localTip:
      'Plan extra time if you enjoy slow gallery visits and detailed exhibitions.',
    image: montrealMuseumFineArts,
    icon: '🖼️',
    accent: 'violet',
  },
  {
    id: 'jean-talon-market',
    name: 'Jean-Talon Market',
    tag: 'Local Market',
    coordinates: {latitude: 45.535, longitude: -73.6143},
    about:
      'A lively public market with produce, flowers, bakery items, local food stands, snacks, and authentic Montreal neighborhood energy.',
    whyVisit:
      'A strong choice for guests who want to discover local flavors, casual food, and a less formal side of the city.',
    bestTime: 'Morning or early afternoon when the market feels freshest and most active.',
    localTip:
      'Try to visit before peak evening hours if you want a calmer browsing experience.',
    image: jeanTalonMarket,
    icon: '🥖',
    accent: 'orange',
  },
  {
    id: 'atwater-market',
    name: 'Atwater Market',
    tag: 'Food Market',
    coordinates: {latitude: 45.4797, longitude: -73.5779},
    about:
      'A well-known market near the Lachine Canal with food shops, fresh produce, bakeries, specialty items, and a classic Montreal market feel.',
    whyVisit:
      'Great for guests interested in local food, casual discoveries, and a pleasant area for walking nearby.',
    bestTime: 'Late morning for fresh selections and a relaxed pace.',
    localTip:
      'Pair this place with a short Lachine Canal walk if the weather is comfortable.',
    image: atwaterMarket,
    icon: '🧺',
    accent: 'gold',
  },
  {
    id: 'lachine-canal',
    name: 'Lachine Canal',
    tag: 'Scenic Walk',
    coordinates: {latitude: 45.4819, longitude: -73.5726},
    about:
      'A scenic canal area with walking and cycling paths, water views, bridges, industrial heritage, and calm outdoor spaces.',
    whyVisit:
      'A pleasant option for guests who want a slower, open-air route away from the busiest tourist streets.',
    bestTime:
      'Afternoon for a relaxed walk or early evening for softer light near the water.',
    localTip:
      'Use this location as a quiet reset before a night event or dinner reservation.',
    image: lachineCanal,
    icon: '🚲',
    accent: 'teal',
  },
  {
    id: 'biosphere-environment-museum',
    name: 'Biosphere, Environment Museum',
    tag: 'Museum Landmark',
    coordinates: {latitude: 45.514, longitude: -73.5312},
    about:
      'A striking geodesic dome located in Parc Jean-Drapeau, known for its unique architecture and environmental museum setting.',
    whyVisit:
      'It is one of the most recognizable structures near the casino area and works well as a quick cultural or photo stop.',
    bestTime:
      'Daytime, especially if you are already exploring Parc Jean-Drapeau.',
    localTip:
      'This is a convenient nearby place to include before or after a casino visit because it is in the same broader park area.',
    image: biosphereEnvironmentMuseum,
    icon: '🌐',
    accent: 'blue',
  },
  {
    id: 'parc-jean-drapeau',
    name: 'Parc Jean-Drapeau',
    tag: 'Island Park',
    coordinates: {latitude: 45.5117, longitude: -73.5333},
    about:
      'A large island park with open spaces, event areas, public paths, cultural landmarks, river views, and major Montreal attractions.',
    whyVisit:
      'A practical nearby destination for guests who want to explore around the casino without moving far into the city center.',
    bestTime:
      'Late afternoon for walking, views, and a more relaxed outdoor atmosphere.',
    localTip:
      'Use it as the closest “explore nearby” option in the app because it connects naturally with the casino location.',
    image: parcJeanDrapeau,
    icon: '🏞️',
    accent: 'green',
  },
  {
    id: 'habitat-67',
    name: 'Habitat 67',
    tag: 'Architecture',
    coordinates: {latitude: 45.5008, longitude: -73.543},
    about:
      'A famous modular housing complex known for its unusual geometric structure and strong connection to Montreal’s Expo 67 architectural history.',
    whyVisit:
      'A great stop for guests interested in design, architecture, photography, and unusual city landmarks.',
    bestTime:
      'Daytime or late afternoon when the building shapes are easier to see clearly.',
    localTip:
      'Best appreciated from a respectful distance as an architectural landmark, not as a tourist interior visit.',
    image: habitat67,
    icon: '🏛️',
    accent: 'violet',
  },
  {
    id: 'saint-josephs-oratory',
    name: 'Saint Joseph’s Oratory',
    tag: 'Landmark View',
    coordinates: {latitude: 45.4919, longitude: -73.6163},
    about:
      'A large basilica and pilgrimage site on Mount Royal’s western slope, known for its grand dome, steps, gardens, and city views.',
    whyVisit:
      'A calm and impressive landmark for guests who want a more spiritual, architectural, or panoramic stop.',
    bestTime: 'Morning or afternoon for clearer views and easier walking.',
    localTip: 'Expect stairs and elevation changes, so comfortable footwear is useful.',
    image: saintJosephsOratory,
    icon: '⛲',
    accent: 'gold',
  },
  {
    id: 'quartier-des-spectacles',
    name: 'Quartier des Spectacles',
    tag: 'Entertainment District',
    coordinates: {latitude: 45.5088, longitude: -73.565},
    about:
      'A downtown cultural district known for festivals, performance spaces, public art, light installations, and an active evening atmosphere.',
    whyVisit:
      'A natural fit for guests who enjoy shows, music, nightlife energy, and urban cultural spaces.',
    bestTime:
      'Evening, when the area feels more animated and visually interesting.',
    localTip:
      'Check what is happening nearby before going, because the mood of the area often changes with festivals and events.',
    image: quartierDesSpectacles,
    icon: '🎭',
    accent: 'pink',
  },
  {
    id: 'bonsecours-market',
    name: 'Bonsecours Market',
    tag: 'Heritage Building',
    coordinates: {latitude: 45.5094, longitude: -73.5513},
    about:
      'A historic building in Old Montreal with a recognizable silver dome, boutique spaces, galleries, and a polished heritage atmosphere.',
    whyVisit:
      'A beautiful stop for architecture, shopping, photos, and a refined Old Montreal walking route.',
    bestTime:
      'Afternoon, especially when combined with Old Montreal and the Old Port.',
    localTip:
      'Use it as a midpoint between a historic walk and a waterfront visit.',
    image: bonsecoursMarket,
    icon: '🏬',
    accent: 'orange',
  },
  {
    id: 'saint-paul-street',
    name: 'Saint-Paul Street',
    tag: 'Historic Street',
    coordinates: {latitude: 45.5071, longitude: -73.5539},
    about:
      'One of Old Montreal’s most atmospheric streets, lined with restaurants, galleries, shops, old stone buildings, and warm evening lights.',
    whyVisit:
      'A perfect route for guests who want a stylish, walkable area with food, culture, and photo opportunities.',
    bestTime:
      'Early evening, when terraces, lights, and street activity create the best mood.',
    localTip:
      'Save this as a “romantic walk” or “after-dinner stroll” location inside the app.',
    image: saintPaulStreet,
    icon: '✨',
    accent: 'gold',
  },
];
