import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {colors} from '../theme/theme';
import {BookServiceScreen} from '../screens/BookServiceScreen';
import {BreakfastOrderScreen} from '../screens/BreakfastOrderScreen';
import {ConciergeChatScreen} from '../screens/ConciergeChatScreen';
import {EventDetailsScreen} from '../screens/EventDetailsScreen';
import {FullPassScreen} from '../screens/FullPassScreen';
import {LocationDetailsScreen} from '../screens/LocationDetailsScreen';
import {MainTabs} from './MainTabs';
import {MyRequestsScreen} from '../screens/MyRequestsScreen';
import {OrderConfirmationScreen} from '../screens/OrderConfirmationScreen';
import {RequestDetailsScreen} from '../screens/RequestDetailsScreen';
import {RequestSentScreen} from '../screens/RequestSentScreen';
import {SavedEventsScreen} from '../screens/SavedEventsScreen';
import {SavedPlacesScreen} from '../screens/SavedPlacesScreen';
import {VisitInfoScreen} from '../screens/VisitInfoScreen';
import {VisitPreferencesScreen} from '../screens/VisitPreferencesScreen';
import type {RootStackParamList} from './types';

const Stack = createNativeStackNavigator<RootStackParamList>();

const navigationTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.bg,
    card: colors.bg,
    border: colors.border,
    text: colors.text,
    primary: colors.gold,
  },
};

export function AppNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator screenOptions={{headerShown: false, animation: 'slide_from_right'}}>
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="FullPass" component={FullPassScreen} />
        <Stack.Screen name="VisitInfo" component={VisitInfoScreen} />
        <Stack.Screen name="VisitPreferences" component={VisitPreferencesScreen} />
        <Stack.Screen name="MyRequests" component={MyRequestsScreen} />
        <Stack.Screen name="RequestDetails" component={RequestDetailsScreen} />
        <Stack.Screen name="ConciergeChat" component={ConciergeChatScreen} />
        <Stack.Screen name="BookService" component={BookServiceScreen} />
        <Stack.Screen name="RequestSent" component={RequestSentScreen} />
        <Stack.Screen name="BreakfastOrder" component={BreakfastOrderScreen} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
        <Stack.Screen name="EventDetails" component={EventDetailsScreen} />
        <Stack.Screen name="SavedEvents" component={SavedEventsScreen} />
        <Stack.Screen name="LocationDetails" component={LocationDetailsScreen} />
        <Stack.Screen name="SavedPlaces" component={SavedPlacesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
