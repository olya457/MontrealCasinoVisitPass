import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {eventDays, events} from '../data/events';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {accentColors, colors, spacing, typography} from '../theme/theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function EventsScreen() {
  const navigation = useNavigation<Navigation>();
  const {savedEvents, toggleSavedEvent} = useAppData();
  const [selectedDayId, setSelectedDayId] = useState(eventDays[0].id);
  const selectedDay =
    eventDays.find(day => day.id === selectedDayId) ?? eventDays[0];
  const visibleEvents = useMemo(
    () => events.filter(event => selectedDay.dates.includes(event.date)),
    [selectedDay],
  );

  return (
    <Screen withTabBar>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Event Calendar</Text>
          <Text style={styles.subtitle}>
            Preview what an event schedule can look like during a visit.
          </Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('SavedEvents')}
          style={styles.savedButton}>
          <Text style={styles.savedIcon}>🔖</Text>
          {savedEvents.length > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{savedEvents.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={styles.demoBanner}>
        <Text style={styles.demoBadge}>DEMO</Text>
        <Text style={styles.demoText}>
          Sample calendar only. Pick a date to preview filtering; availability is
          not live.
        </Text>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.days}>
        {eventDays.map(day => {
          const active = day.id === selectedDay.id;
          return (
            <TouchableOpacity
              key={day.id}
              activeOpacity={0.82}
              onPress={() => setSelectedDayId(day.id)}
              style={[styles.dayChip, active && styles.dayChipActive]}>
              <Text style={[styles.dayLabel, active && styles.dayTextActive]}>
                {day.label}
              </Text>
              <Text style={[styles.dayNumber, active && styles.dayTextActive]}>
                {day.day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
      <View style={styles.selectedSummary}>
        <Text style={styles.selectedSummaryText}>
          Showing {visibleEvents.length} demo {visibleEvents.length === 1 ? 'event' : 'events'} for{' '}
          {selectedDay.label} {selectedDay.day}.
        </Text>
      </View>
      <View style={styles.list}>
        {visibleEvents.map(event => {
          const accent = accentColors[event.accent];
          const saved = savedEvents.includes(event.id);
          return (
            <Card key={event.id} accentColor={accent}>
              <View style={styles.eventTop}>
                <View style={styles.eventCopy}>
                  <Text style={styles.eventTitle}>{event.name}</Text>
                  <View style={styles.metaRow}>
                    <Pill label={event.category} color={accent} />
                    <Text style={styles.meta}>◷ {event.time} · {event.date}</Text>
                  </View>
                </View>
                <TouchableOpacity
                  activeOpacity={0.82}
                  onPress={() => toggleSavedEvent(event.id)}
                  style={styles.bookmark}>
                  <Text style={[styles.bookmarkText, saved && {color: accent}]}>
                    {saved ? '▣' : '▢'}
                  </Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.description}>{event.about}</Text>
              <Button
                title="View Event"
                icon="›"
                variant="ghost"
                onPress={() => navigation.navigate('EventDetails', {eventId: event.id})}
                style={[styles.viewButton, {borderColor: accent}]}
              />
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body,
    marginTop: 4,
  },
  demoBanner: {
    minHeight: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: 'rgba(224, 185, 35, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  demoBadge: {
    color: colors.black,
    backgroundColor: colors.gold,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: '900',
  },
  demoText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.small,
    lineHeight: typography.small + 5,
    fontWeight: '700',
  },
  savedButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '900',
  },
  days: {
    gap: spacing.sm,
    paddingBottom: spacing.md,
  },
  dayChip: {
    width: 62,
    height: 58,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dayChipActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  dayLabel: {
    color: colors.muted,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  dayNumber: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
    marginTop: 2,
  },
  dayTextActive: {
    color: colors.black,
  },
  selectedSummary: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    marginBottom: spacing.lg,
  },
  selectedSummaryText: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: '800',
  },
  list: {
    gap: spacing.md,
  },
  eventTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  eventCopy: {
    flex: 1,
  },
  eventTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  meta: {
    color: colors.muted,
    fontSize: typography.small,
  },
  bookmark: {
    width: 42,
    height: 42,
    borderRadius: 13,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookmarkText: {
    color: colors.faint,
    fontSize: 20,
  },
  description: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 7,
    marginTop: spacing.md,
  },
  viewButton: {
    marginTop: spacing.lg,
  },
});
