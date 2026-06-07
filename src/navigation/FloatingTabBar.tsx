import type {BottomTabBarProps} from '@react-navigation/bottom-tabs';
import React from 'react';
import {Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, platformSpace, radii, typography} from '../theme/theme';

const labels: Record<string, string> = {
  Pass: 'Pass',
  Services: 'Services',
  Dining: 'Dining',
  Events: 'Events',
  Map: 'Map',
};

const icons: Record<string, string> = {
  Pass: '▦',
  Services: '🔔',
  Dining: '🍴',
  Events: '📅',
  Map: '📍',
};

export function FloatingTabBar({state, descriptors, navigation}: BottomTabBarProps) {
  const insets = useSafeAreaInsets();
  const bottom = platformSpace.tabBottom + insets.bottom;

  return (
    <View
      style={[
        styles.container,
        {
          bottom,
          paddingBottom: Platform.OS === 'android' ? 4 : 6,
        },
      ]}>
      {state.routes.map((route, index) => {
        const focused = state.index === index;
        const options = descriptors[route.key]?.options;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!focused && !event.defaultPrevented) {
            navigation.navigate(route.name as never);
          }
        };

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            activeOpacity={0.82}
            onPress={onPress}
            style={styles.item}>
            <View style={[styles.iconWrap, focused && styles.iconWrapActive]}>
              <Text style={[styles.icon, focused && styles.active]}>{icons[route.name]}</Text>
            </View>
            <Text style={[styles.label, focused && styles.active]} numberOfLines={1}>
              {labels[route.name]}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 16,
    right: 16,
    height: 78,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 9, 24, 0.94)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
  },
  item: {
    flex: 1,
    height: 66,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  iconWrap: {
    width: 38,
    height: 34,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconWrapActive: {
    backgroundColor: 'rgba(224, 185, 35, 0.16)',
    borderWidth: 1,
    borderColor: 'rgba(224, 185, 35, 0.42)',
  },
  icon: {
    color: colors.faint,
    fontSize: 20,
    lineHeight: 24,
    fontWeight: '900',
  },
  label: {
    color: colors.faint,
    fontSize: typography.small,
    fontWeight: '800',
  },
  active: {
    color: colors.gold,
  },
});
