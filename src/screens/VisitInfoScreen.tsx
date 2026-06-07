import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import venueImage from '../assets/brand/montreal-venue.png';
import {Card} from '../components/Card';
import {EmojiIcon} from '../components/EmojiIcon';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'VisitInfo'>;

export function VisitInfoScreen({navigation}: Props) {
  const {preferences} = useAppData();

  return (
    <Screen>
      <Header title="Visit Info" onBack={navigation.goBack} />
      <Card accentColor={colors.gold} style={styles.profile}>
        <View style={styles.profileTop}>
          <Image source={venueImage} style={styles.avatar} />
          <View style={styles.profileCopy}>
            <Text style={styles.name}>Guest Visitor</Text>
            <Text style={styles.small}>Pass ID: MCP-4827</Text>
            <Pill label="Active" color={colors.green} icon="●" />
          </View>
        </View>
        <View style={styles.statsRow}>
          <Stat icon="🎟️" value="1" label="Saved Events" />
          <Stat icon="🔖" value="2" label="Saved Places" />
          <Stat icon="🧳" value="3" label="Requests" />
        </View>
      </Card>

      <Card style={styles.details}>
        <Text style={styles.sectionTitle}>Visit Details</Text>
        <InfoRow label="Guest Status" value="Active Visitor" />
        <InfoRow label="Visit Date" value="June 4, 2026" />
        <InfoRow label="Access Level" value="Guest Services" />
        <InfoRow label="Language" value={preferences.language} />
        <InfoRow label="Visit Style" value={preferences.visitStyle} />
      </Card>

      <ActionRow
        icon="⚙️"
        title="Edit Visit Preferences"
        onPress={() => navigation.navigate('VisitPreferences')}
      />
      <ActionRow
        icon="🧾"
        title="My Service Requests"
        onPress={() => navigation.navigate('MyRequests')}
      />
      <ActionRow
        icon="?"
        title="Help & Information"
        onPress={() => navigation.navigate('ConciergeChat')}
      />
    </Screen>
  );
}

function Stat({icon, value, label}: {icon: string; value: string; label: string}) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statIcon}>{icon}</Text>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function InfoRow({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

function ActionRow({
  icon,
  title,
  onPress,
}: {
  icon: string;
  title: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.actionRow}>
      <EmojiIcon icon={icon} size={32} color={colors.gold} />
      <Text style={styles.actionText}>{title}</Text>
      <Text style={styles.chevron}>›</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginBottom: spacing.lg,
  },
  profileTop: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  avatar: {
    width: 58,
    height: 58,
    borderRadius: 14,
  },
  profileCopy: {
    flex: 1,
    gap: spacing.xs,
  },
  name: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
  },
  small: {
    color: colors.muted,
    fontSize: typography.small,
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.lg,
  },
  stat: {
    flex: 1,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    padding: spacing.md,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 16,
  },
  statValue: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginTop: 4,
  },
  statLabel: {
    color: colors.faint,
    fontSize: 9,
    marginTop: 3,
    textAlign: 'center',
  },
  details: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: spacing.sm,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
    paddingVertical: 11,
    gap: spacing.md,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: typography.small,
  },
  infoValue: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '800',
    textAlign: 'right',
    flex: 1,
  },
  actionRow: {
    minHeight: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.card,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.sm,
  },
  actionText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '800',
  },
  chevron: {
    color: colors.faint,
    fontSize: 22,
  },
});
