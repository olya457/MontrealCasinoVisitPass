import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from './Button';
import {colors, spacing, typography} from '../theme/theme';

type EmptyStateProps = {
  icon: string;
  title: string;
  body: string;
  buttonTitle?: string;
  onPress?: () => void;
};

export function EmptyState({icon, title, body, buttonTitle, onPress}: EmptyStateProps) {
  return (
    <View style={styles.empty}>
      <Text style={styles.icon}>{icon}</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
      {buttonTitle ? (
        <Button title={buttonTitle} onPress={onPress} style={styles.button} />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xl,
    gap: spacing.md,
  },
  icon: {
    color: colors.faint,
    fontSize: 54,
  },
  title: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
    textAlign: 'center',
  },
  body: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 6,
    textAlign: 'center',
  },
  button: {
    marginTop: spacing.md,
    minWidth: 190,
  },
});
