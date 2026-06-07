import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import venueImage from '../assets/brand/montreal-venue.png';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {QrCode} from '../components/QrCode';
import {Screen} from '../components/Screen';
import type {RootStackParamList} from '../navigation/types';
import {colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'FullPass'>;

export function FullPassScreen({navigation, route}: Props) {
  const [brightnessBoosted, setBrightnessBoosted] = useState(
    Boolean(route.params?.boost),
  );

  return (
    <Screen>
      <Header
        title="Full QR Pass"
        subtitle="Montreal Casino Visit Pass"
        onBack={navigation.goBack}
      />
      <Card
        accentColor={colors.gold}
        style={[styles.pass, brightnessBoosted && styles.passBoosted]}>
        <View style={styles.top}>
          <View>
            <Text style={styles.eyebrow}>PASS ID</Text>
            <Text style={styles.passId}>MCP-4827</Text>
          </View>
          <Pill label="Active" color={colors.green} icon="●" />
        </View>
        <View style={[styles.qrWrap, brightnessBoosted && styles.qrWrapBoosted]}>
          <View style={brightnessBoosted && styles.qrPanelBoosted}>
            <QrCode size={brightnessBoosted ? 236 : 220} />
          </View>
          {brightnessBoosted ? (
            <Text style={styles.scanMode}>Scan mode is active</Text>
          ) : null}
          <Text style={styles.valid}>Valid for today only</Text>
          <Text style={styles.date}>June 4, 2026 · 00:00 - 23:59</Text>
        </View>
        <View style={styles.detailGrid}>
          <Info label="Guest Type" value="Visitor" />
          <Info label="Access Level" value="Visit Services" />
          <Info label="Issued" value="Today, 09:00" />
          <Info label="Expires" value="Today, 23:59" />
        </View>
      </Card>
      <Card style={[styles.help, brightnessBoosted && styles.helpBoosted]}>
        <Text style={styles.helpText}>
          {brightnessBoosted
            ? 'QR contrast is boosted for scanning. Keep this screen open and present the code when requested.'
            : 'Show this screen when requested by guest service staff. Keep the display visible and bright when presenting your pass.'}
        </Text>
      </Card>
      <Button
        title={brightnessBoosted ? 'Brightness Mode On' : 'Increase Brightness'}
        icon={brightnessBoosted ? '✓' : '☀'}
        variant={brightnessBoosted ? 'primary' : 'secondary'}
        onPress={() => setBrightnessBoosted(current => !current)}
      />
      <View style={styles.brandWrap}>
        <Image source={venueImage} style={styles.brand} />
      </View>
    </Screen>
  );
}

function Info({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.info}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  pass: {
    marginBottom: spacing.lg,
  },
  passBoosted: {
    borderColor: colors.gold,
    backgroundColor: '#17203d',
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  eyebrow: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0,
  },
  passId: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: '900',
    marginTop: 6,
  },
  qrWrap: {
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  qrWrapBoosted: {
    marginTop: spacing.lg,
  },
  qrPanelBoosted: {
    borderRadius: 16,
    backgroundColor: colors.white,
    padding: 12,
  },
  scanMode: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  valid: {
    color: colors.muted,
    fontSize: 11,
    marginTop: spacing.md,
  },
  date: {
    color: colors.faint,
    fontSize: 10,
    marginTop: 3,
  },
  detailGrid: {
    borderWidth: 1,
    borderColor: colors.borderSoft,
    borderRadius: 10,
    padding: spacing.md,
    marginTop: spacing.xl,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  info: {
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
  help: {
    marginBottom: spacing.md,
  },
  helpBoosted: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(224, 185, 35, 0.09)',
  },
  helpText: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: typography.small + 6,
    textAlign: 'center',
  },
  brandWrap: {
    alignItems: 'center',
    marginTop: spacing.xl,
    opacity: 0.22,
  },
  brand: {
    width: 58,
    height: 58,
    borderRadius: 16,
  },
});
