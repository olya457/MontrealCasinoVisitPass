import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {StyleSheet, Switch, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {colors, spacing, typography} from '../theme/theme';
import type {VisitPreferences} from '../types/entities';

type Props = NativeStackScreenProps<RootStackParamList, 'VisitPreferences'>;

const diningTimes = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM'];
const languages: VisitPreferences['language'][] = ['English', 'French'];
const visitStyles: VisitPreferences['visitStyle'][] = [
  'Solo',
  'Couple',
  'Friends',
  'Business',
];

export function VisitPreferencesScreen({navigation}: Props) {
  const {preferences, updatePreferences} = useAppData();
  const [draft, setDraft] = useState(preferences);

  const save = () => {
    updatePreferences(draft);
    navigation.goBack();
  };

  return (
    <Screen>
      <Header title="Visit Preferences" onBack={navigation.goBack} />
      <Card style={styles.card}>
        <Section title="Dining">
          <Text style={styles.label}>Preferred Dining Time</Text>
          <Segmented
            values={diningTimes}
            selected={draft.diningTime}
            onChange={diningTime => setDraft(current => ({...current, diningTime}))}
          />
        </Section>
        <Section title="Language">
          <Segmented
            values={languages}
            selected={draft.language}
            onChange={language => setDraft(current => ({...current, language}))}
          />
        </Section>
        <Section title="Visit Style">
          <Segmented
            values={visitStyles}
            selected={draft.visitStyle}
            onChange={visitStyle => setDraft(current => ({...current, visitStyle}))}
          />
        </Section>
        <View style={styles.switchRow}>
          <View>
            <Text style={styles.sectionTitle}>Notifications</Text>
            <Text style={styles.label}>Event Reminders</Text>
          </View>
          <Switch
            value={draft.eventReminders}
            onValueChange={eventReminders =>
              setDraft(current => ({...current, eventReminders}))
            }
            trackColor={{false: colors.cardMuted, true: colors.goldDark}}
            thumbColor={draft.eventReminders ? colors.gold : colors.muted}
          />
        </View>
      </Card>
      <Button title="Save Preferences" onPress={save} />
    </Screen>
  );
}

function Section({title, children}: {title: string; children: React.ReactNode}) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Segmented<T extends string>({
  values,
  selected,
  onChange,
}: {
  values: T[];
  selected: T;
  onChange: (value: T) => void;
}) {
  return (
    <View style={styles.segmented}>
      {values.map(value => {
        const active = selected === value;
        return (
          <TouchableOpacity
            key={value}
            activeOpacity={0.82}
            onPress={() => onChange(value)}
            style={[styles.segment, active && styles.segmentActive]}>
            <Text style={[styles.segmentText, active && styles.segmentTextActive]}>
              {active ? '✓ ' : ''}
              {value}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.lg,
    gap: spacing.lg,
  },
  section: {
    gap: spacing.sm,
  },
  sectionTitle: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  label: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: '700',
  },
  segmented: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  segment: {
    minHeight: 34,
    minWidth: 86,
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  segmentActive: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(224, 185, 35, 0.12)',
  },
  segmentText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  segmentTextActive: {
    color: colors.gold,
  },
  switchRow: {
    minHeight: 64,
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    paddingTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
});
