import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {EmptyState} from '../components/EmptyState';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {events} from '../data/events';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {accentColors, colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedEvents'>;

export function SavedEventsScreen({navigation}: Props) {
  const {savedEvents, removeSavedEvent} = useAppData();
  const saved = events.filter(event => savedEvents.includes(event.id));

  if (saved.length === 0) {
    return (
      <Screen scroll={false}>
        <Header title="Saved Events" subtitle="0 saved" onBack={navigation.goBack} />
        <EmptyState
          icon="🔖"
          title="No saved events"
          body="Browse events and save ones you are interested in."
          buttonTitle="Browse Events"
          onPress={() => navigation.navigate('MainTabs', {screen: 'Events'})}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Saved Events"
        subtitle={`${saved.length} saved`}
        onBack={navigation.goBack}
      />
      <View style={styles.list}>
        {saved.map(event => {
          const accent = accentColors[event.accent];
          return (
            <Card key={event.id} accentColor={accent}>
              <View style={styles.top}>
                <View style={styles.copy}>
                  <Text style={styles.title}>{event.name}</Text>
                  <Pill label={event.category} color={accent} />
                  <Text style={styles.meta}>◷ {event.time} · {event.date}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.82}
                  onPress={() => removeSavedEvent(event.id)}
                  style={styles.remove}>
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
              <Button
                title="View Event"
                variant="ghost"
                onPress={() => navigation.navigate('EventDetails', {eventId: event.id})}
                style={styles.button}
              />
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  top: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
  },
  meta: {
    color: colors.muted,
    fontSize: typography.small,
  },
  remove: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(237, 79, 99, 0.3)',
    backgroundColor: 'rgba(237, 79, 99, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: colors.danger,
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '900',
  },
  button: {
    marginTop: spacing.md,
  },
});
