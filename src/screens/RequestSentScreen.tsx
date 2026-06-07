import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestSent'>;

export function RequestSentScreen({navigation, route}: Props) {
  const {serviceRequests} = useAppData();
  const request = serviceRequests.find(item => item.id === route.params.requestId);

  return (
    <Screen>
      <Header title="Request Sent" onBack={navigation.goBack} />
      <View style={styles.successWrap}>
        <View style={styles.successIcon}>
          <Text style={styles.check}>✓</Text>
        </View>
        <Text style={styles.title}>Request Sent</Text>
        <Text style={styles.body}>
          Your service request has been submitted. A concierge team member will
          confirm the details shortly.
        </Text>
      </View>
      {request ? (
        <Card style={styles.summary}>
          <Text style={styles.eyebrow}>Request Summary</Text>
          <SummaryRow label="Service" value={request.title} />
          <SummaryRow label="Date" value={request.date} />
          <SummaryRow label="Time" value={request.time} />
          <View style={styles.statusRow}>
            <Text style={styles.summaryLabel}>Status</Text>
            <Pill label={request.status} color={colors.gold} />
          </View>
        </Card>
      ) : null}
      <Button title="View My Requests" onPress={() => navigation.navigate('MyRequests')} />
      <Button
        title="Back to Services"
        variant="ghost"
        onPress={() => navigation.navigate('MainTabs', {screen: 'Services'})}
        style={styles.secondary}
      />
    </Screen>
  );
}

function SummaryRow({label, value}: {label: string; value: string}) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  successWrap: {
    alignItems: 'center',
    paddingVertical: 54,
    gap: spacing.md,
  },
  successIcon: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(53, 212, 124, 0.14)',
    borderWidth: 2,
    borderColor: 'rgba(53, 212, 124, 0.46)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    color: colors.green,
    fontSize: 42,
    fontWeight: '900',
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: '900',
  },
  body: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 7,
    textAlign: 'center',
    maxWidth: 292,
  },
  summary: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: spacing.md,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  summaryLabel: {
    color: colors.muted,
    fontSize: typography.small,
  },
  summaryValue: {
    flex: 1,
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '900',
    textAlign: 'right',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingTop: spacing.md,
  },
  secondary: {
    marginTop: spacing.md,
  },
});
