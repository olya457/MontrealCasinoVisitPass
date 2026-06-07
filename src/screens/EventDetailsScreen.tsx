import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {events} from '../data/events';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {accentColors, colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'EventDetails'>;

export function EventDetailsScreen({navigation, route}: Props) {
  const event = events.find(item => item.id === route.params.eventId) ?? events[0];
  const accent = accentColors[event.accent];
  const {savedEvents, toggleSavedEvent} = useAppData();
  const saved = savedEvents.includes(event.id);

  return (
    <Screen>
      <Header
        title="Event Details"
        subtitle="Montreal Casino Events"
        onBack={navigation.goBack}
        action={
          <TouchableOpacity
            activeOpacity={0.82}
            onPress={() => toggleSavedEvent(event.id)}
            style={styles.headerAction}>
            <Text style={[styles.headerActionText, saved && {color: accent}]}>
              {saved ? '▣' : '▢'}
            </Text>
          </TouchableOpacity>
        }
      />
      <Card style={[styles.hero, {borderColor: accent}]}>
        <View style={[styles.heroGlow, {backgroundColor: accent}]} />
        <Pill label={event.category} color={accent} />
        <Text style={styles.title}>{event.name}</Text>
        <View style={styles.metaRow}>
          <Text style={[styles.meta, {color: accent}]}>◷ {event.time}</Text>
          <Text style={styles.meta}>📍 {event.location}</Text>
        </View>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.eyebrow}>About This Event</Text>
        <Text style={styles.body}>{event.about}</Text>
      </Card>
      <View style={styles.infoGrid}>
        <Info label="Date" value={event.date} />
        <Info label="Time" value={event.time} />
        <Info label="Location" value={event.location} />
        <Info label="Dress Code" value={event.dressCode} />
      </View>
      <Button
        title={saved ? 'Saved Event' : 'Save Event'}
        icon="🔖"
        onPress={() => toggleSavedEvent(event.id)}
      />
      <Button
        title="Request Table"
        variant="ghost"
        onPress={() => navigation.navigate('BookService', {serviceId: 'restaurant'})}
        style={styles.secondary}
      />
    </Screen>
  );
}

function Info({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoCard}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
    minHeight: 146,
    marginBottom: spacing.lg,
    overflow: 'hidden',
    justifyContent: 'flex-end',
  },
  heroGlow: {
    position: 'absolute',
    width: 120,
    height: 120,
    borderRadius: 60,
    opacity: 0.16,
    right: -20,
    top: -28,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: '900',
    marginTop: spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.md,
  },
  meta: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: '700',
  },
  card: {
    marginBottom: spacing.md,
  },
  eyebrow: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: spacing.md,
  },
  body: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 8,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  infoCard: {
    flexBasis: '47%',
    flexGrow: 1,
    minHeight: 76,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    padding: spacing.md,
    justifyContent: 'center',
  },
  infoLabel: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: spacing.sm,
  },
  infoValue: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '900',
  },
  secondary: {
    marginTop: spacing.md,
  },
});
