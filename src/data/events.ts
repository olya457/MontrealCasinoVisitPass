import type {EventItem} from '../types/entities';

export const events: EventItem[] = [
  {
    id: 'montreal-jazz-lounge-evening',
    category: 'Music',
    name: 'Montreal Jazz Lounge Evening',
    time: '7:30 PM',
    date: 'Tonight',
    location: 'Valet Bar, Level A',
    about:
      'Immerse yourself in a refined lounge evening inspired by Montreal’s live music culture. Guest artists bring smooth jazz, warm rhythms, and an elegant casino-night atmosphere, while the multimedia wall adds a vibrant visual backdrop to the performance.',
    dressCode: 'Smart Casual',
    accent: 'gold',
  },
  {
    id: 'cabaret-dinner-show-night',
    category: 'Show',
    name: 'Cabaret Dinner & Show Night',
    time: '6:00 PM',
    date: 'Friday',
    location: 'Cabaret du Casino',
    about:
      'Enjoy an evening built around the classic casino entertainment format: dinner first, then a live show at the Cabaret. The experience combines a polished dining moment with stage entertainment in one of the venue’s signature performance spaces.',
    dressCode: 'Elegant Casual',
    accent: 'orange',
  },
  {
    id: 'quebec-flavours-tasting-evening',
    category: 'Dining',
    name: 'Québec Flavours Tasting Evening',
    time: '5:30 PM',
    date: 'Saturday',
    location: 'Le Montréal',
    about:
      'Discover a refined dining moment inspired by Québec-sourced products, seafood, grilled meats, and tasting-style portions. This event is designed for guests who want a slower, more gourmet start to their casino evening.',
    dressCode: 'Smart Casual',
    accent: 'orange',
  },
  {
    id: 'pavillon-67-gourmet-buffet-night',
    category: 'Buffet',
    name: 'Pavillon 67 Gourmet Buffet Night',
    time: '6:15 PM',
    date: 'Thursday',
    location: 'Pavillon 67, 3rd Floor',
    about:
      'A generous buffet-style dining experience with a broad selection of dishes prepared for guests who want variety before an evening show or lounge visit. The atmosphere is comfortable, social, and ideal for groups or relaxed dinner plans.',
    dressCode: 'Casual Chic',
    accent: 'blue',
  },
  {
    id: 'valet-bar-dj-sessions',
    category: 'DJ Night',
    name: 'Valet Bar DJ Sessions',
    time: '10:00 PM',
    date: 'Saturday',
    location: 'Valet Bar, Level A',
    about:
      'Step into a high-energy bar atmosphere with guest DJs, evening entertainment, and a 21-metre multimedia wall that lights up the space. This is a lively late-night option for guests who want music, drinks, and movement.',
    dressCode: 'Night Out Casual',
    accent: 'pink',
  },
  {
    id: 'arcade-play-social-night',
    category: 'AR Experience',
    name: 'ARcade Play & Social Night',
    time: '8:00 PM',
    date: 'Tonight',
    location: 'ARcade, Pavillon du Québec',
    about:
      'Try a physical multiplayer gaming experience where your body becomes part of the game. Inspired by ARcade’s immersive format, this event blends movement, friendly competition, digital visuals, and a social bar setting nearby.',
    dressCode: 'Comfortable Casual',
    accent: 'violet',
  },
  {
    id: 'bar-le-roi-social-hour',
    category: 'Lounge',
    name: 'Bar Le Roi Social Hour',
    time: '7:00 PM',
    date: 'Wednesday',
    location: 'Bar Le Roi, Level 1',
    about:
      'Enjoy a relaxed lounge atmosphere at the heart of the action, with large multimedia screens overhead and an easygoing social mood. This event is perfect for guests who want a comfortable meeting point before dining, shows, or evening plans.',
    dressCode: 'Smart Casual',
    accent: 'blue',
  },
  {
    id: 'bar-la-dame-before-dinner-cocktails',
    category: 'Cocktails',
    name: 'Bar La Dame Before-Dinner Cocktails',
    time: '5:45 PM',
    date: 'Friday',
    location: 'Bar La Dame, Promenade Level',
    about:
      'Start the evening with a refined cocktail moment in a lively yet elegant setting. Designed as a pre-dinner stop, this event gives guests time to sit, chat, enjoy a drink, and ease into the night before a restaurant reservation or show.',
    dressCode: 'Elegant Casual',
    accent: 'orange',
  },
  {
    id: 'le-jardin-summer-patio-vibe',
    category: 'Patio',
    name: 'Le Jardin Summer Patio Vibe',
    time: '7:30 PM',
    date: 'Sunday',
    location: 'Terrasse Le Jardin',
    about:
      'A seasonal outdoor evening inspired by music, cocktails, warm-weather energy, and relaxed summer gatherings. The patio atmosphere is ideal for guests who want a fresh open-air setting with a festive Montreal mood.',
    dressCode: 'Summer Casual',
    accent: 'teal',
  },
  {
    id: 'classic-hits-tribute-night',
    category: 'Tribute Show',
    name: 'Classic Hits Tribute Night',
    time: '8:00 PM',
    date: 'Saturday',
    location: 'Cabaret du Casino',
    about:
      'Celebrate an evening of well-known songs, nostalgic stage energy, and live performance inspired by the Cabaret’s tribute-show programming. The event is built for guests who enjoy familiar music, theatrical presentation, and a polished show setting.',
    dressCode: 'Smart Casual',
    accent: 'gold',
  },
  {
    id: 'private-group-celebration-evening',
    category: 'Group Event',
    name: 'Private Group Celebration Evening',
    time: '6:30 PM',
    date: 'By Request',
    location: 'Event Space',
    about:
      'A curated social evening for birthdays, corporate visits, private gatherings, or group celebrations. Inspired by the casino’s event rental spaces, this format combines flexible seating, dining options, music, and a polished guest-service atmosphere.',
    dressCode: 'Occasion Casual',
    accent: 'pink',
  },
  {
    id: 'dinner-before-the-cabaret',
    category: 'Dinner',
    name: 'Dinner Before the Cabaret',
    time: '5:00 PM',
    date: 'Friday',
    location: 'Le Montréal / Pavillon 67',
    about:
      'Plan a complete evening with a restaurant reservation before a Cabaret performance. This event format is inspired by the Dinner & Show experience and is ideal for guests who want a smooth transition from dining to live entertainment.',
    dressCode: 'Smart Casual',
    accent: 'green',
  },
];

export const eventDays = [
  {id: 'today', label: 'Today', day: '4', dates: ['Tonight']},
  {id: 'wed', label: 'Wed', day: '5', dates: ['Wednesday']},
  {id: 'thu', label: 'Thu', day: '6', dates: ['Thursday']},
  {id: 'fri', label: 'Fri', day: '7', dates: ['Friday']},
  {id: 'sat', label: 'Sat', day: '8', dates: ['Saturday']},
  {id: 'sun', label: 'Sun', day: '9', dates: ['Sunday']},
  {id: 'flex', label: 'Flex', day: 'Any', dates: ['By Request']},
];
