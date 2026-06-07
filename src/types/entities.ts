import type {ImageSourcePropType} from 'react-native';

export type AccentName =
  | 'gold'
  | 'blue'
  | 'orange'
  | 'teal'
  | 'violet'
  | 'pink'
  | 'green';

export type OnboardingSlide = {
  id: string;
  title: string;
  body: string;
  icon: string;
  accent: AccentName;
  cta: string;
  image: ImageSourcePropType;
};

export type BreakfastItem = {
  id: string;
  name: string;
  tag: string;
  description: string;
  price: number;
  image: ImageSourcePropType;
  accent: AccentName;
};

export type Place = {
  id: string;
  name: string;
  tag: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  about: string;
  whyVisit: string;
  bestTime: string;
  localTip: string;
  image: ImageSourcePropType;
  icon: string;
  accent: AccentName;
};

export type EventItem = {
  id: string;
  category: string;
  name: string;
  time: string;
  date: string;
  location: string;
  about: string;
  dressCode: string;
  accent: AccentName;
};

export type ServiceItem = {
  id: string;
  title: string;
  tag: string;
  description: string;
  cta: string;
  icon: string;
  accent: AccentName;
};

export type ServiceRequestStatus =
  | 'Pending'
  | 'Pending Confirmation'
  | 'Confirmed'
  | 'Completed';

export type ServiceRequest = {
  id: string;
  serviceId: string;
  title: string;
  tag: string;
  date: string;
  time: string;
  guests: string;
  contactName: string;
  priority: 'Standard' | 'Urgent';
  notes: string;
  status: ServiceRequestStatus;
  createdAt: string;
};

export type BreakfastOrderItem = {
  itemId: string;
  name: string;
  quantity: number;
  price: number;
};

export type BreakfastOrder = {
  id: string;
  items: BreakfastOrderItem[];
  preferredTime: string;
  notes: string;
  total: number;
  status: ServiceRequestStatus;
  createdAt: string;
};

export type VisitPreferences = {
  diningTime: string;
  language: 'English' | 'French';
  visitStyle: 'Solo' | 'Couple' | 'Friends' | 'Business';
  eventReminders: boolean;
};

export type ChatMessage = {
  id: string;
  role: 'guest' | 'support';
  text: string;
};

export type FaqItem = {
  question: string;
  answer: string;
};
