import onboardingDining from '../assets/onboarding/onboarding-dining.png';
import onboardingExplore from '../assets/onboarding/onboarding-explore.png';
import onboardingHelp from '../assets/onboarding/onboarding-help.png';
import onboardingVisit from '../assets/onboarding/onboarding-visit.png';
import type {OnboardingSlide} from '../types/entities';

export const onboardingSlides: OnboardingSlide[] = [
  {
    id: 'visit',
    title: 'Your Visit Starts Here',
    body: 'Open your digital QR Guest Pass and keep essential visit access ready whenever you need it.',
    icon: '▦',
    accent: 'gold',
    cta: 'Next',
    image: onboardingVisit,
  },
  {
    id: 'help',
    title: 'Guest Help in One Place',
    body: 'Ask the concierge chat for guidance, request assistance, and book useful guest services before or during your visit.',
    icon: '💬',
    accent: 'blue',
    cta: 'Next',
    image: onboardingHelp,
  },
  {
    id: 'dining',
    title: 'Plan Dining with Ease',
    body: 'Browse dining options, view breakfast items, check prices, and prepare your order for a comfortable visit.',
    icon: '🍴',
    accent: 'orange',
    cta: 'Next',
    image: onboardingDining,
  },
  {
    id: 'explore',
    title: 'Explore Events and Places',
    body: 'Save upcoming events and discover locations to visit around Montreal with a useful map view.',
    icon: '📍',
    accent: 'teal',
    cta: 'Get Started',
    image: onboardingExplore,
  },
];
