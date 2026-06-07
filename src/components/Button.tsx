import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {colors, radii, typography} from '../theme/theme';

type ButtonProps = {
  title: string;
  onPress?: () => void;
  icon?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  onPress,
  icon,
  variant = 'primary',
  disabled = false,
  loading = false,
  style,
}: ButtonProps) {
  const isPrimary = variant === 'primary';
  const isGhost = variant === 'ghost';

  return (
    <TouchableOpacity
      activeOpacity={0.84}
      disabled={disabled || loading}
      onPress={onPress}
      style={[
        styles.button,
        isPrimary && styles.primary,
        !isPrimary && styles.secondary,
        isGhost && styles.ghost,
        disabled && styles.disabled,
        style,
      ]}>
      {loading ? (
        <ActivityIndicator color={isPrimary ? colors.black : colors.gold} />
      ) : (
        <>
          {icon ? <Text style={[styles.icon, isPrimary && styles.primaryText]}>{icon}</Text> : null}
          <Text style={[styles.text, isPrimary && styles.primaryText]} numberOfLines={1}>
            {title}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 48,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 16,
    gap: 8,
  },
  primary: {
    backgroundColor: colors.gold,
  },
  secondary: {
    backgroundColor: colors.cardSoft,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.45,
  },
  text: {
    color: colors.gold,
    fontSize: typography.body,
    fontWeight: '800',
  },
  primaryText: {
    color: colors.black,
  },
  icon: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '800',
  },
});
