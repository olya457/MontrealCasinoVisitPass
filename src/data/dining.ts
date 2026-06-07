import avocadoToast from '../assets/food/avocado-toast.png';
import bagelBreakfastSet from '../assets/food/bagel-breakfast-set.png';
import bananaWalnutPancakes from '../assets/food/banana-walnut-pancakes.png';
import belgianWafflePlate from '../assets/food/belgian-waffle-plate.png';
import berryPancakeStack from '../assets/food/berry-pancake-stack.png';
import breakfastBurrito from '../assets/food/breakfast-burrito.png';
import breakfastPoutine from '../assets/food/breakfast-poutine.png';
import breakfastSandwich from '../assets/food/breakfast-sandwich.png';
import classicCheeseOmelette from '../assets/food/classic-cheese-omelette.png';
import continentalBreakfastTray from '../assets/food/continental-breakfast-tray.png';
import croissantCoffeeSet from '../assets/food/croissant-coffee-set.png';
import deluxeBreakfastBoard from '../assets/food/deluxe-breakfast-board.png';
import espressoPastryPairing from '../assets/food/espresso-pastry-pairing.png';
import frenchToastRoyale from '../assets/food/french-toast-royale.png';
import freshFruitYogurtBowl from '../assets/food/fresh-fruit-yogurt-bowl.png';
import gardenBreakfastBowl from '../assets/food/garden-breakfast-bowl.png';
import mapleGranolaParfait from '../assets/food/maple-granola-parfait.png';
import montrealMorningPlate from '../assets/food/montreal-morning-plate.png';
import morningSmoothieSet from '../assets/food/morning-smoothie-set.png';
import salmonHerbOmelette from '../assets/food/salmon-herb-omelette.png';
import smokedMeatBreakfastPlate from '../assets/food/smoked-meat-breakfast-plate.png';
import smokedSalmonBagel from '../assets/food/smoked-salmon-bagel.png';
import spinachMushroomOmelette from '../assets/food/spinach-mushroom-omelette.png';
import steakEggsPlate from '../assets/food/steak-eggs-plate.png';
import type {BreakfastItem} from '../types/entities';

export const breakfastItems: BreakfastItem[] = [
  {
    id: 'montreal-morning-plate',
    name: 'Montreal Morning Plate',
    tag: 'Signature',
    description: 'Eggs, roasted potatoes, toast, grilled tomato, and a light side salad.',
    price: 18,
    image: montrealMorningPlate,
    accent: 'gold',
  },
  {
    id: 'croissant-coffee-set',
    name: 'Croissant & Coffee Set',
    tag: 'Light',
    description: 'Buttery croissant served with fresh coffee and seasonal jam.',
    price: 12,
    image: croissantCoffeeSet,
    accent: 'blue',
  },
  {
    id: 'smoked-salmon-bagel',
    name: 'Smoked Salmon Bagel',
    tag: 'Premium',
    description:
      'Toasted bagel with smoked salmon, cream cheese, capers, cucumber, and herbs.',
    price: 21,
    image: smokedSalmonBagel,
    accent: 'orange',
  },
  {
    id: 'berry-pancake-stack',
    name: 'Berry Pancake Stack',
    tag: 'Sweet',
    description:
      'Fluffy pancakes topped with mixed berries, maple syrup, and whipped cream.',
    price: 17,
    image: berryPancakeStack,
    accent: 'pink',
  },
  {
    id: 'classic-cheese-omelette',
    name: 'Classic Cheese Omelette',
    tag: 'Warm',
    description:
      'Three-egg omelette with melted cheese, fresh herbs, mushrooms, and toast.',
    price: 16,
    image: classicCheeseOmelette,
    accent: 'gold',
  },
  {
    id: 'fresh-fruit-yogurt-bowl',
    name: 'Fresh Fruit & Yogurt Bowl',
    tag: 'Healthy',
    description: 'Seasonal fruit served with creamy yogurt, honey, and crunchy granola.',
    price: 14,
    image: freshFruitYogurtBowl,
    accent: 'teal',
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    tag: 'Fresh',
    description:
      'Toasted sourdough with avocado, cherry tomatoes, lemon, herbs, and sesame.',
    price: 15,
    image: avocadoToast,
    accent: 'green',
  },
  {
    id: 'french-toast-royale',
    name: 'French Toast Royale',
    tag: 'Sweet',
    description:
      'Golden brioche French toast with maple syrup, berries, and powdered sugar.',
    price: 18,
    image: frenchToastRoyale,
    accent: 'pink',
  },
  {
    id: 'breakfast-sandwich',
    name: 'Breakfast Sandwich',
    tag: 'Quick',
    description:
      'Warm bun with egg, cheese, tomato, greens, and a choice of bacon or turkey.',
    price: 13,
    image: breakfastSandwich,
    accent: 'blue',
  },
  {
    id: 'maple-granola-parfait',
    name: 'Maple Granola Parfait',
    tag: 'Light',
    description: 'Layered yogurt, maple granola, berries, and a touch of honey.',
    price: 11,
    image: mapleGranolaParfait,
    accent: 'blue',
  },
  {
    id: 'steak-eggs-plate',
    name: 'Steak & Eggs Plate',
    tag: 'Premium',
    description:
      'Grilled steak served with eggs, breakfast potatoes, toast, and herb butter.',
    price: 26,
    image: steakEggsPlate,
    accent: 'orange',
  },
  {
    id: 'spinach-mushroom-omelette',
    name: 'Spinach Mushroom Omelette',
    tag: 'Vegetarian',
    description: 'Omelette filled with spinach, mushrooms, cheese, and fresh herbs.',
    price: 16,
    image: spinachMushroomOmelette,
    accent: 'green',
  },
  {
    id: 'bagel-breakfast-set',
    name: 'Bagel Breakfast Set',
    tag: 'Classic',
    description: 'Montreal-style bagel with cream cheese, boiled egg, fruit, and coffee.',
    price: 14,
    image: bagelBreakfastSet,
    accent: 'gold',
  },
  {
    id: 'breakfast-poutine',
    name: 'Breakfast Poutine',
    tag: 'Local',
    description:
      'Crispy potatoes with cheese curds, breakfast gravy, egg, and green onions.',
    price: 19,
    image: breakfastPoutine,
    accent: 'orange',
  },
  {
    id: 'smoked-meat-breakfast-plate',
    name: 'Smoked Meat Breakfast Plate',
    tag: 'Montreal',
    description: 'Sliced smoked meat with eggs, toast, potatoes, and pickles.',
    price: 22,
    image: smokedMeatBreakfastPlate,
    accent: 'gold',
  },
  {
    id: 'salmon-herb-omelette',
    name: 'Salmon & Herb Omelette',
    tag: 'Premium',
    description:
      'Soft omelette with smoked salmon, cream cheese, dill, and spring onions.',
    price: 23,
    image: salmonHerbOmelette,
    accent: 'orange',
  },
  {
    id: 'banana-walnut-pancakes',
    name: 'Banana Walnut Pancakes',
    tag: 'Sweet',
    description:
      'Soft pancakes with banana slices, toasted walnuts, maple syrup, and cream.',
    price: 16,
    image: bananaWalnutPancakes,
    accent: 'pink',
  },
  {
    id: 'continental-breakfast-tray',
    name: 'Continental Breakfast Tray',
    tag: 'Simple',
    description: 'Croissant, toast, jam, butter, fruit, yogurt, and fresh coffee.',
    price: 15,
    image: continentalBreakfastTray,
    accent: 'blue',
  },
  {
    id: 'breakfast-burrito',
    name: 'Breakfast Burrito',
    tag: 'Filling',
    description:
      'Warm tortilla with scrambled eggs, potatoes, cheese, peppers, and salsa.',
    price: 17,
    image: breakfastBurrito,
    accent: 'orange',
  },
  {
    id: 'garden-breakfast-bowl',
    name: 'Garden Breakfast Bowl',
    tag: 'Healthy',
    description:
      'Egg, quinoa, avocado, greens, tomato, cucumber, and lemon dressing.',
    price: 18,
    image: gardenBreakfastBowl,
    accent: 'teal',
  },
  {
    id: 'espresso-pastry-pairing',
    name: 'Espresso & Pastry Pairing',
    tag: 'Coffee',
    description: 'Fresh espresso served with a warm pastry and seasonal preserve.',
    price: 10,
    image: espressoPastryPairing,
    accent: 'gold',
  },
  {
    id: 'belgian-waffle-plate',
    name: 'Belgian Waffle Plate',
    tag: 'Sweet',
    description:
      'Crisp waffle with berries, whipped cream, maple syrup, and chocolate drizzle.',
    price: 18,
    image: belgianWafflePlate,
    accent: 'pink',
  },
  {
    id: 'morning-smoothie-set',
    name: 'Morning Smoothie Set',
    tag: 'Fresh',
    description: 'Fruit smoothie served with a small granola cup and seasonal fruit.',
    price: 13,
    image: morningSmoothieSet,
    accent: 'teal',
  },
  {
    id: 'deluxe-breakfast-board',
    name: 'Deluxe Breakfast Board',
    tag: 'Signature',
    description:
      'Eggs, smoked salmon, cheese, fruit, pastries, toast, and coffee for one.',
    price: 28,
    image: deluxeBreakfastBoard,
    accent: 'gold',
  },
];

export const breakfastTimes = [
  '8:00 AM',
  '8:30 AM',
  '9:00 AM',
  '9:30 AM',
  '10:00 AM',
  '10:30 AM',
  '11:00 AM',
];
