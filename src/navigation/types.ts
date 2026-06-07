import type {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Pass: undefined;
  Services: undefined;
  Dining: undefined;
  Events: undefined;
  Map: undefined;
};

export type RootStackParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList> | undefined;
  FullPass: {boost?: boolean} | undefined;
  VisitInfo: undefined;
  VisitPreferences: undefined;
  MyRequests: undefined;
  RequestDetails: {requestId: string};
  ConciergeChat: undefined;
  BookService: {serviceId: string};
  RequestSent: {requestId: string};
  BreakfastOrder: undefined;
  OrderConfirmation: {orderId: string};
  EventDetails: {eventId: string};
  SavedEvents: undefined;
  LocationDetails: {placeId: string};
  SavedPlaces: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
