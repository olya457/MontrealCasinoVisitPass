import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {places} from '../data/places';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {accentColors, colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'LocationDetails'>;

export function LocationDetailsScreen({navigation, route}: Props) {
  const place = places.find(item => item.id === route.params.placeId) ?? places[0];
  const accent = accentColors[place.accent];
  const {savedPlaces, toggleSavedPlace} = useAppData();
  const saved = savedPlaces.includes(place.id);

  return (
    <Screen>
      <Header
        title="Location Details"
        onBack={navigation.goBack}
        action={
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => toggleSavedPlace(place.id)}
            style={styles.headerAction}>
            <Text style={[styles.headerActionText, saved && {color: accent}]}>
              {saved ? '▣' : '▢'}
            </Text>
          </TouchableOpacity>
        }
      />
      <ImageBackground source={place.image} resizeMode="cover" style={styles.hero}>
        <View style={styles.heroScrim} />
        <View style={[styles.heroPin, {borderColor: accent}]}>
          <Text style={[styles.heroPinText, {color: accent}]}>{place.icon}</Text>
        </View>
        <View style={styles.heroTag}>
          <Pill label={place.tag} color={accent} />
        </View>
      </ImageBackground>
      <Text style={styles.title}>{place.name}</Text>
      <InfoCard title="About This Place" body={place.about} />
      <InfoCard title="Why Visit" body={place.whyVisit} />
      <InfoCard title="Best Time to Visit" body={place.bestTime} icon="◷" />
      <InfoCard title="Local Tip" body={place.localTip} icon="💡" subtle />
      <Button
        title={saved ? 'Saved Place' : 'Save Place'}
        icon="🔖"
        variant="ghost"
        onPress={() => toggleSavedPlace(place.id)}
      />
    </Screen>
  );
}

function InfoCard({
  title,
  body,
  icon,
  subtle,
}: {
  title: string;
  body: string;
  icon?: string;
  subtle?: boolean;
}) {
  return (
    <Card style={[styles.infoCard, subtle && styles.subtleCard]}>
      <View style={styles.infoHeader}>
        {icon ? <Text style={styles.infoIcon}>{icon}</Text> : null}
        <Text style={styles.eyebrow}>{title}</Text>
      </View>
      <Text style={styles.body}>{body}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  headerAction: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerActionText: {
    color: colors.faint,
    fontSize: 20,
  },
  hero: {
    height: 180,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.xl,
  },
  heroScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(7, 9, 24, 0.48)',
  },
  heroPin: {
    position: 'absolute',
    right: 14,
    top: 14,
    zIndex: 2,
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(7, 9, 24, 0.68)',
  },
  heroPinText: {
    fontSize: 24,
  },
  heroTag: {
    position: 'absolute',
    left: 14,
    bottom: 14,
    zIndex: 2,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: '900',
    marginBottom: spacing.lg,
  },
  infoCard: {
    marginBottom: spacing.md,
  },
  subtleCard: {
    backgroundColor: 'rgba(18, 26, 52, 0.56)',
  },
  infoHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  infoIcon: {
    color: colors.gold,
    fontSize: 16,
  },
  eyebrow: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  body: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 8,
  },
});
