import React, {createContext, useCallback, useContext, useMemo, useState} from 'react';
import {breakfastItems} from '../data/dining';
import {initialRequests} from '../data/services';
import type {
  BreakfastOrder,
  BreakfastOrderItem,
  ServiceRequest,
  VisitPreferences,
} from '../types/entities';
import {STORAGE_KEYS} from './keys';
import {usePersistentState} from './usePersistentState';

type CartState = Record<string, number>;

type NewServiceRequest = Omit<ServiceRequest, 'id' | 'createdAt' | 'status'>;

type NewBreakfastOrder = {
  preferredTime: string;
  notes: string;
};

type AppDataContextValue = {
  ready: boolean;
  preferences: VisitPreferences;
  savedEvents: string[];
  savedPlaces: string[];
  serviceRequests: ServiceRequest[];
  breakfastOrders: BreakfastOrder[];
  cart: CartState;
  cartItems: BreakfastOrderItem[];
  cartTotal: number;
  updatePreferences: (preferences: VisitPreferences) => void;
  toggleSavedEvent: (eventId: string) => void;
  toggleSavedPlace: (placeId: string) => void;
  removeSavedEvent: (eventId: string) => void;
  removeSavedPlace: (placeId: string) => void;
  addServiceRequest: (request: NewServiceRequest) => ServiceRequest;
  addToCart: (itemId: string) => void;
  decreaseCartItem: (itemId: string) => void;
  removeCartItem: (itemId: string) => void;
  clearCart: () => void;
  submitBreakfastOrder: (order: NewBreakfastOrder) => BreakfastOrder;
};

const defaultPreferences: VisitPreferences = {
  diningTime: '9:00 AM',
  language: 'English',
  visitStyle: 'Solo',
  eventReminders: true,
};

const AppDataContext = createContext<AppDataContextValue | null>(null);

export function AppDataProvider({children}: {children: React.ReactNode}) {
  const [preferences, setPreferences, preferencesReady] = usePersistentState(
    STORAGE_KEYS.preferences,
    defaultPreferences,
  );
  const [savedEvents, setSavedEvents, savedEventsReady] = usePersistentState<string[]>(
    STORAGE_KEYS.savedEvents,
    [],
  );
  const [savedPlaces, setSavedPlaces, savedPlacesReady] = usePersistentState<string[]>(
    STORAGE_KEYS.savedPlaces,
    [],
  );
  const [serviceRequests, setServiceRequests, serviceRequestsReady] =
    usePersistentState<ServiceRequest[]>(
      STORAGE_KEYS.serviceRequests,
      initialRequests,
    );
  const [breakfastOrders, setBreakfastOrders, breakfastOrdersReady] =
    usePersistentState<BreakfastOrder[]>(STORAGE_KEYS.breakfastOrders, []);
  const [cart, setCart] = useState<CartState>({});

  const updatePreferences = useCallback(
    (nextPreferences: VisitPreferences) => {
      setPreferences(nextPreferences);
    },
    [setPreferences],
  );

  const toggleSavedEvent = useCallback(
    (eventId: string) => {
      setSavedEvents(current =>
        current.includes(eventId)
          ? current.filter(item => item !== eventId)
          : [...current, eventId],
      );
    },
    [setSavedEvents],
  );

  const toggleSavedPlace = useCallback(
    (placeId: string) => {
      setSavedPlaces(current =>
        current.includes(placeId)
          ? current.filter(item => item !== placeId)
          : [...current, placeId],
      );
    },
    [setSavedPlaces],
  );

  const removeSavedEvent = useCallback(
    (eventId: string) => {
      setSavedEvents(current => current.filter(item => item !== eventId));
    },
    [setSavedEvents],
  );

  const removeSavedPlace = useCallback(
    (placeId: string) => {
      setSavedPlaces(current => current.filter(item => item !== placeId));
    },
    [setSavedPlaces],
  );

  const addServiceRequest = useCallback(
    (request: NewServiceRequest) => {
      const nextRequest: ServiceRequest = {
        ...request,
        id: `REQ-${String(Date.now()).slice(-6)}`,
        status: 'Pending Confirmation',
        createdAt: new Date().toISOString(),
      };
      setServiceRequests(current => [nextRequest, ...current]);
      return nextRequest;
    },
    [setServiceRequests],
  );

  const addToCart = useCallback((itemId: string) => {
    setCart(current => ({
      ...current,
      [itemId]: (current[itemId] ?? 0) + 1,
    }));
  }, []);

  const decreaseCartItem = useCallback((itemId: string) => {
    setCart(current => {
      const quantity = current[itemId] ?? 0;
      if (quantity <= 1) {
        const next = {...current};
        delete next[itemId];
        return next;
      }
      return {...current, [itemId]: quantity - 1};
    });
  }, []);

  const removeCartItem = useCallback((itemId: string) => {
    setCart(current => {
      const next = {...current};
      delete next[itemId];
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCart({});
  }, []);

  const cartItems = useMemo(() => {
    return Object.entries(cart)
      .map(([itemId, quantity]) => {
        const item = breakfastItems.find(menuItem => menuItem.id === itemId);
        if (!item) {
          return null;
        }
        return {
          itemId,
          name: item.name,
          quantity,
          price: item.price,
        };
      })
      .filter((item): item is BreakfastOrderItem => Boolean(item));
  }, [cart]);

  const cartTotal = useMemo(
    () => cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
    [cartItems],
  );

  const submitBreakfastOrder = useCallback(
    (order: NewBreakfastOrder) => {
      const nextOrder: BreakfastOrder = {
        id: `BR-${String(Date.now()).slice(-6)}`,
        items: cartItems,
        preferredTime: order.preferredTime,
        notes: order.notes,
        total: cartTotal,
        status: 'Pending Confirmation',
        createdAt: new Date().toISOString(),
      };
      setBreakfastOrders(current => [nextOrder, ...current]);
      setCart({});
      return nextOrder;
    },
    [cartItems, cartTotal, setBreakfastOrders],
  );

  const ready =
    preferencesReady &&
    savedEventsReady &&
    savedPlacesReady &&
    serviceRequestsReady &&
    breakfastOrdersReady;

  const value = useMemo<AppDataContextValue>(
    () => ({
      ready,
      preferences,
      savedEvents,
      savedPlaces,
      serviceRequests,
      breakfastOrders,
      cart,
      cartItems,
      cartTotal,
      updatePreferences,
      toggleSavedEvent,
      toggleSavedPlace,
      removeSavedEvent,
      removeSavedPlace,
      addServiceRequest,
      addToCart,
      decreaseCartItem,
      removeCartItem,
      clearCart,
      submitBreakfastOrder,
    }),
    [
      addServiceRequest,
      addToCart,
      breakfastOrders,
      cart,
      cartItems,
      cartTotal,
      clearCart,
      decreaseCartItem,
      preferences,
      ready,
      removeCartItem,
      removeSavedEvent,
      removeSavedPlace,
      savedEvents,
      savedPlaces,
      serviceRequests,
      submitBreakfastOrder,
      toggleSavedEvent,
      toggleSavedPlace,
      updatePreferences,
    ],
  );

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>;
}

export function useAppData() {
  const value = useContext(AppDataContext);
  if (!value) {
    throw new Error('useAppData must be used inside AppDataProvider');
  }
  return value;
}
