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
import type {ServiceRequestStatus} from '../types/entities';

type Props = NativeStackScreenProps<RootStackParamList, 'RequestDetails'>;

export function RequestDetailsScreen({navigation, route}: Props) {
  const {serviceRequests} = useAppData();
  const request = serviceRequests.find(item => item.id === route.params.requestId);

  if (!request) {
    return (
      <Screen>
        <Header title="Request Details" onBack={navigation.goBack} />
        <Card style={styles.missingCard}>
          <Text style={styles.title}>Request not found</Text>
          <Text style={styles.body}>
            This service request is no longer available in your saved requests.
          </Text>
        </Card>
        <Button title="Back to My Requests" onPress={navigation.goBack} />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Request Details"
        subtitle={request.id}
        onBack={navigation.goBack}
      />
      <Card accentColor={statusColor(request.status)} style={styles.hero}>
        <View style={styles.heroTop}>
          <View style={styles.heroCopy}>
            <Text style={styles.title}>{request.title}</Text>
            <Text style={styles.requestId}>{request.id}</Text>
          </View>
          <Pill label={request.status} color={statusColor(request.status)} />
        </View>
        <Pill label={request.tag} color={colors.gold} />
      </Card>

      <Card style={styles.details}>
        <Text style={styles.sectionTitle}>Request Summary</Text>
        <InfoRow label="Date" value={request.date} />
        <InfoRow label="Time" value={request.time} />
        <InfoRow label="Guests" value={request.guests} />
        <InfoRow label="Contact Name" value={request.contactName} />
        <InfoRow label="Priority" value={request.priority} />
        <InfoRow label="Status" value={request.status} />
      </Card>

      <Card style={styles.details}>
        <Text style={styles.sectionTitle}>Additional Notes</Text>
        <Text style={styles.body}>
          {request.notes || 'No additional notes were added for this request.'}
        </Text>
      </Card>

      <Button
        title="Ask Concierge About This"
        icon="💬"
        onPress={() => navigation.navigate('ConciergeChat')}
      />
      <Button
        title="Back to My Requests"
        variant="ghost"
        onPress={navigation.goBack}
        style={styles.secondary}
      />
    </Screen>
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

function statusColor(status: ServiceRequestStatus) {
  if (status === 'Confirmed') {
    return colors.blue;
  }
  if (status === 'Completed') {
    return colors.green;
  }
  return colors.gold;
}

const styles = StyleSheet.create({
  hero: {
    marginBottom: spacing.lg,
  },
  heroTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  heroCopy: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
  },
  requestId: {
    color: colors.faint,
    fontSize: typography.small,
    marginTop: spacing.xs,
  },
  details: {
    marginBottom: spacing.md,
  },
  sectionTitle: {
    color: colors.faint,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0,
    marginBottom: spacing.sm,
    textTransform: 'uppercase',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  infoLabel: {
    color: colors.muted,
    fontSize: typography.small,
  },
  infoValue: {
    flex: 1,
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '900',
    textAlign: 'right',
  },
  body: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 7,
  },
  secondary: {
    marginTop: spacing.md,
  },
  missingCard: {
    marginBottom: spacing.lg,
  },
});
