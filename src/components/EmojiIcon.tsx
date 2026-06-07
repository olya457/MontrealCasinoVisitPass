import React from 'react';
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native';
import {hexToRgba} from '../theme/utils';
import {colors, radii} from '../theme/theme';

type EmojiIconProps = {
  icon: string;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

export function EmojiIcon({
  icon,
  color = colors.gold,
  size = 46,
  style,
}: EmojiIconProps) {
  return (
    <View
      style={[
        styles.wrap,
        {
          width: size,
          height: size,
          borderRadius: Math.min(radii.md, size / 4),
          backgroundColor: hexToRgba(color, 0.16),
          borderColor: hexToRgba(color, 0.36),
        },
        style,
      ]}>
      <Text style={[styles.icon, {fontSize: size * 0.42}]}>{icon}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
  icon: {
    color: colors.text,
  },
});
