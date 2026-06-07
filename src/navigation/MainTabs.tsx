import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {FloatingTabBar} from './FloatingTabBar';
import type {MainTabParamList} from './types';
import {DiningScreen} from '../screens/DiningScreen';
import {EventsScreen} from '../screens/EventsScreen';
import {MapScreen} from '../screens/MapScreen';
import {PassScreen} from '../screens/PassScreen';
import {ServicesScreen} from '../screens/ServicesScreen';

const Tab = createBottomTabNavigator<MainTabParamList>();

function renderTabBar(props: React.ComponentProps<typeof FloatingTabBar>) {
  return <FloatingTabBar {...props} />;
}

export function MainTabs() {
  return (
    <Tab.Navigator
      tabBar={renderTabBar}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="Pass" component={PassScreen} />
      <Tab.Screen name="Services" component={ServicesScreen} />
      <Tab.Screen name="Dining" component={DiningScreen} />
      <Tab.Screen name="Events" component={EventsScreen} />
      <Tab.Screen name="Map" component={MapScreen} />
    </Tab.Navigator>
  );
}
