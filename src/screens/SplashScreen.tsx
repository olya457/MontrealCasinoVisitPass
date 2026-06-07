import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import venueImage from '../assets/brand/montreal-venue.png';
import {colors, spacing, typography} from '../theme/theme';

export function SplashScreen() {
  return (
    <View style={styles.root}>
      <View style={styles.glow} />
      <Text style={styles.star}>✦</Text>
      <Image source={venueImage} style={styles.logo} />
      <Text style={styles.kicker}>MONTRÉAL</Text>
      <Text style={styles.title}>Visit Pass</Text>
      <View style={styles.dividerRow}>
        <View style={styles.divider} />
        <Text style={styles.dot}>◆</Text>
        <View style={styles.divider} />
      </View>
      <Text style={styles.loading}>Preparing your guest access...</Text>
      <View style={styles.progressTrack}>
        <View style={styles.progressFill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.xxl,
  },
  glow: {
    position: 'absolute',
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: 'rgba(224, 185, 35, 0.08)',
    top: '31%',
  },
  star: {
    color: colors.gold,
    fontSize: 42,
    marginBottom: 74,
  },
  logo: {
    width: 96,
    height: 96,
    borderRadius: 22,
    marginBottom: spacing.xl,
  },
  kicker: {
    color: colors.gold,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0,
    marginBottom: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typography.title,
    fontWeight: '900',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginTop: 28,
  },
  divider: {
    width: 52,
    height: 1,
    backgroundColor: colors.goldDark,
  },
  dot: {
    color: colors.gold,
    fontSize: 10,
  },
  loading: {
    color: colors.faint,
    fontSize: typography.body,
    marginTop: spacing.xl,
  },
  progressTrack: {
    width: 162,
    height: 2,
    backgroundColor: colors.border,
    marginTop: 34,
  },
  progressFill: {
    width: '66%',
    height: 2,
    backgroundColor: colors.gold,
  },
});
