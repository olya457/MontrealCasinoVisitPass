import React from 'react';
import {StyleProp, StyleSheet, View, ViewStyle} from 'react-native';
import {colors, radii, spacing} from '../theme/theme';

type CardProps = {
  children: React.ReactNode;
  accentColor?: string;
  style?: StyleProp<ViewStyle>;
};

export function Card({children, accentColor, style}: CardProps) {
  return (
    <View
      style={[
        styles.card,
        accentColor ? {borderTopColor: accentColor, borderTopWidth: 3} : null,
        style,
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radii.md,
    padding: spacing.lg,
  },
});
