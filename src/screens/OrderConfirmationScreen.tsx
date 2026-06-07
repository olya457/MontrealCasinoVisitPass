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

type Props = NativeStackScreenProps<RootStackParamList, 'OrderConfirmation'>;

export function OrderConfirmationScreen({navigation, route}: Props) {
  const {breakfastOrders} = useAppData();
  const order = breakfastOrders.find(item => item.id === route.params.orderId);

  return (
    <Screen>
      <Header title="Order Confirmation" />
      <View style={styles.successWrap}>
        <View style={styles.successIcon}>
          <Text style={styles.check}>✓</Text>
        </View>
        <Text style={styles.title}>Breakfast Order Sent</Text>
        <Text style={styles.body}>
          Your breakfast request has been prepared for confirmation. Our dining team
          will reach out shortly.
        </Text>
      </View>
      {order ? (
        <Card style={styles.summary}>
          <Text style={styles.eyebrow}>Order Summary</Text>
          {order.items.map(item => (
            <SummaryRow
              key={item.itemId}
              label={`${item.name} ×${item.quantity}`}
              value={`$${(item.price * item.quantity).toFixed(2)}`}
            />
          ))}
          <SummaryRow label="Preferred Time" value={order.preferredTime} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${order.total.toFixed(2)}</Text>
          </View>
          <View style={styles.statusRow}>
            <Text style={styles.summaryLabel}>Status</Text>
            <Pill label={order.status} color={colors.gold} />
          </View>
        </Card>
      ) : null}
      <Button
        title="Back to Dining"
        onPress={() => navigation.navigate('MainTabs', {screen: 'Dining'})}
      />
      <Button
        title="View Order"
        variant="ghost"
        onPress={() => navigation.navigate('BreakfastOrder')}
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
    textAlign: 'center',
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
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderSoft,
  },
  summaryLabel: {
    flex: 1,
    color: colors.muted,
    fontSize: typography.small,
  },
  summaryValue: {
    color: colors.text,
    fontSize: typography.small,
    fontWeight: '900',
    textAlign: 'right',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: spacing.md,
  },
  totalLabel: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
  },
  totalValue: {
    color: colors.gold,
    fontSize: typography.h2,
    fontWeight: '900',
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
