import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import venueImage from '../assets/brand/montreal-venue.png';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {EmojiIcon} from '../components/EmojiIcon';
import {Pill} from '../components/Pill';
import {QrCode} from '../components/QrCode';
import {Screen} from '../components/Screen';
import type {RootStackParamList} from '../navigation/types';
import {colors, spacing, typography} from '../theme/theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function PassScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <Screen withTabBar>
      <View style={styles.logoRow}>
        <Image source={venueImage} style={styles.logo} />
        <View style={styles.logoCopy}>
          <Text style={styles.logoKicker}>MONTRÉAL</Text>
          <Text style={styles.logoTitle}>Visit Pass</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('VisitInfo')}
          style={styles.profileButton}>
          <Text style={styles.profileIcon}>♙</Text>
        </TouchableOpacity>
      </View>

      <Card style={styles.welcomeCard}>
        <Text style={styles.eyebrow}>WELCOME</Text>
        <Text style={styles.welcomeTitle}>Welcome to Montreal Casino</Text>
        <Text style={styles.muted}>Your guest access and concierge support.</Text>
      </Card>

      <Card accentColor={colors.gold} style={styles.passCard}>
        <View style={styles.cardHeader}>
          <View>
            <Text style={styles.eyebrow}>QR GUEST PASS</Text>
            <Text style={styles.passId}>MCP-4827</Text>
          </View>
          <Pill label="Active" color={colors.green} icon="●" />
        </View>
        <View style={styles.qrSmallWrap}>
          <QrCode size={118} />
        </View>
        <View style={styles.infoGrid}>
          <InfoCell label="Status" value="Active" />
          <InfoCell label="Guest Type" value="Visitor" />
          <InfoCell label="Access" value="Visit Services" />
          <InfoCell label="Validity" value="Today" />
        </View>
        <Text style={styles.note}>
          Present this pass when guest access or service confirmation is requested.
        </Text>
        <Button
          title="Show Full QR Pass"
          onPress={() => navigation.navigate('FullPass')}
          style={styles.stackButton}
        />
        <Button
          title="Increase Brightness"
          icon="☀"
          variant="ghost"
          onPress={() => navigation.navigate('FullPass', {boost: true})}
        />
      </Card>

      <Card style={styles.chatCard}>
        <View style={styles.chatRow}>
          <EmojiIcon icon="💬" color={colors.blue} size={42} />
          <View style={styles.chatCopy}>
            <Text style={styles.cardTitle}>Concierge Demo Chat</Text>
            <Text style={styles.muted}>
              Preview answers for directions, dining help, bookings, and events.
            </Text>
          </View>
        </View>
        <Button
          title="Open Demo Chat"
          icon="💬"
          variant="secondary"
          onPress={() => navigation.navigate('ConciergeChat')}
        />
      </Card>

      <View style={styles.quickRow}>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('BookService', {serviceId: 'restaurant'})}
          style={styles.quickButton}>
          <Text style={styles.quickIcon}>🔔</Text>
          <Text style={styles.quickText}>Book Services</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('MainTabs', {screen: 'Dining'})}
          style={styles.quickButton}>
          <Text style={styles.quickIcon}>🍽️</Text>
          <Text style={styles.quickText}>Browse Dining</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

function InfoCell({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.infoCell}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.xl,
    gap: spacing.sm,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 9,
  },
  logoCopy: {
    flex: 1,
  },
  logoKicker: {
    color: colors.gold,
    fontSize: 9,
    fontWeight: '900',
    letterSpacing: 0,
  },
  logoTitle: {
    color: colors.text,
    fontSize: 13,
    fontWeight: '900',
    marginTop: 1,
  },
  profileButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: colors.cardSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileIcon: {
    color: colors.muted,
    fontSize: 16,
  },
  welcomeCard: {
    marginBottom: spacing.lg,
  },
  eyebrow: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
  },
  welcomeTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
    marginTop: spacing.sm,
  },
  muted: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: typography.small + 6,
    marginTop: 4,
  },
  passCard: {
    marginBottom: spacing.lg,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  passId: {
    color: colors.text,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 6,
  },
  qrSmallWrap: {
    alignItems: 'center',
    marginVertical: spacing.lg,
  },
  infoGrid: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: spacing.md,
  },
  infoCell: {
    width: '50%',
    marginBottom: spacing.md,
  },
  infoLabel: {
    color: colors.faint,
    fontSize: 9,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  infoValue: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '800',
    marginTop: 4,
  },
  note: {
    color: colors.faint,
    fontSize: 10,
    textAlign: 'center',
    marginVertical: spacing.md,
  },
  stackButton: {
    marginBottom: spacing.sm,
  },
  chatCard: {
    marginBottom: spacing.lg,
  },
  chatRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  chatCopy: {
    flex: 1,
  },
  cardTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
  },
  quickRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  quickButton: {
    flex: 1,
    minHeight: 66,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
    paddingHorizontal: spacing.sm,
  },
  quickIcon: {
    fontSize: 18,
  },
  quickText: {
    color: colors.text,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
});
