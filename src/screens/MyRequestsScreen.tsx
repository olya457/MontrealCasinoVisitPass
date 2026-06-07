import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {colors, spacing, typography} from '../theme/theme';
import type {ServiceRequestStatus} from '../types/entities';

type Props = NativeStackScreenProps<RootStackParamList, 'MyRequests'>;

export function MyRequestsScreen({navigation}: Props) {
  const {serviceRequests} = useAppData();

  return (
    <Screen>
      <Header
        title="My Requests"
        subtitle={`${serviceRequests.length} service requests`}
        onBack={navigation.goBack}
      />
      <View style={styles.list}>
        {serviceRequests.map(request => (
          <Card key={request.id}>
            <View style={styles.requestTop}>
              <View style={styles.requestCopy}>
                <Text style={styles.requestTitle}>{request.title}</Text>
                <Text style={styles.requestId}>{request.id}</Text>
              </View>
              <Pill label={request.status} color={statusColor(request.status)} />
            </View>
            <Text style={styles.meta}>◷ {request.date}  ·  {request.time}</Text>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() =>
                navigation.navigate('RequestDetails', {requestId: request.id})
              }
              style={styles.detailButton}>
              <Text style={styles.detailText}>View Details</Text>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </Card>
        ))}
      </View>
      <Button
        title="+ New Service Request"
        onPress={() => navigation.navigate('BookService', {serviceId: 'restaurant'})}
        style={styles.newButton}
      />
    </Screen>
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
  list: {
    gap: spacing.md,
  },
  requestTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  requestCopy: {
    flex: 1,
  },
  requestTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
  },
  requestId: {
    color: colors.faint,
    fontSize: typography.small,
    marginTop: 3,
  },
  meta: {
    color: colors.muted,
    fontSize: typography.small,
    marginTop: spacing.md,
  },
  detailButton: {
    minHeight: 38,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.cardSoft,
    marginTop: spacing.md,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    flex: 1,
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: '800',
  },
  chevron: {
    color: colors.faint,
    fontSize: 20,
  },
  newButton: {
    marginTop: spacing.xl,
  },
});
