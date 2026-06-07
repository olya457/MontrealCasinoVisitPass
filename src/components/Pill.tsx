import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {hexToRgba} from '../theme/utils';
import {colors, radii, typography} from '../theme/theme';

type PillProps = {
  label: string;
  color?: string;
  icon?: string;
};

export function Pill({label, color = colors.gold, icon}: PillProps) {
  return (
    <View
      style={[
        styles.pill,
        {backgroundColor: hexToRgba(color, 0.16), borderColor: hexToRgba(color, 0.34)},
      ]}>
      {icon ? <Text style={[styles.text, {color}]}>{icon}</Text> : null}
      <Text style={[styles.text, {color}]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pill: {
    alignSelf: 'flex-start',
    borderRadius: radii.pill,
    borderWidth: 1,
    paddingHorizontal: 9,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  text: {
    fontSize: typography.small,
    fontWeight: '800',
  },
});
