import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {EmojiIcon} from '../components/EmojiIcon';
import {EmptyState} from '../components/EmptyState';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {breakfastTimes} from '../data/dining';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'BreakfastOrder'>;
const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export function BreakfastOrderScreen({navigation}: Props) {
  const {
    cartItems,
    cartTotal,
    addToCart,
    decreaseCartItem,
    removeCartItem,
    submitBreakfastOrder,
  } = useAppData();
  const [time, setTime] = useState('9:00 AM');
  const [notes, setNotes] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const pressKey = (key: string) => {
    if (key === 'space') {
      setNotes(current => `${current} `);
      return;
    }
    if (key === 'delete') {
      setNotes(current => current.slice(0, -1));
      return;
    }
    if (key === 'clear') {
      setNotes('');
      return;
    }
    setNotes(current => `${current}${key}`);
  };

  const submit = () => {
    if (cartItems.length === 0) {
      return;
    }
    const order = submitBreakfastOrder({preferredTime: time, notes});
    navigation.replace('OrderConfirmation', {orderId: order.id});
  };

  if (cartItems.length === 0) {
    return (
      <Screen scroll={false}>
        <Header title="Breakfast Order" subtitle="0 items" onBack={navigation.goBack} />
        <EmptyState
          icon="🍽️"
          title="No breakfast items"
          body="Add breakfast choices from the Dining tab before submitting an order."
          buttonTitle="Back to Dining"
          onPress={() => navigation.navigate('MainTabs', {screen: 'Dining'})}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Breakfast Order"
        subtitle={`${cartItems.length} items · $${cartTotal.toFixed(2)} total`}
        onBack={navigation.goBack}
      />
      <Text style={styles.sectionTitle}>Your Items</Text>
      <View style={styles.list}>
        {cartItems.map(item => (
          <Card key={item.itemId} style={styles.cartCard}>
            <EmojiIcon icon="🍳" size={42} color={colors.gold} />
            <View style={styles.cartCopy}>
              <Text style={styles.itemTitle}>{item.name}</Text>
              <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <View style={styles.qtyRow}>
              <TouchableOpacity
                activeOpacity={0.82}
                onPress={() => decreaseCartItem(item.itemId)}
                style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtyText}>{item.quantity}</Text>
              <TouchableOpacity
                activeOpacity={0.82}
                onPress={() => addToCart(item.itemId)}
                style={styles.qtyButton}>
                <Text style={styles.qtyButtonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.82}
                onPress={() => removeCartItem(item.itemId)}
                style={[styles.qtyButton, styles.deleteButton]}>
                <Text style={styles.deleteText}>⌫</Text>
              </TouchableOpacity>
            </View>
          </Card>
        ))}
      </View>
      <Text style={styles.sectionTitle}>Preferred Service Time</Text>
      <View style={styles.timeGrid}>
        {breakfastTimes.map(item => {
          const active = time === item;
          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.82}
              onPress={() => setTime(item)}
              style={[styles.timeButton, active && styles.timeButtonActive]}>
              <Text style={[styles.timeText, active && styles.timeTextActive]}>
                ◷ {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text style={styles.sectionTitle}>Special Requests</Text>
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={() => setKeyboardOpen(true)}
        style={styles.notes}>
        <View style={styles.notesIcon}>
          <Text style={styles.notesIconText}>📝</Text>
        </View>
        <Text
          style={[styles.notesText, !notes && styles.notesPlaceholder]}
          numberOfLines={4}>
          {notes || 'Dietary requirements, allergies, or preferences...'}
        </Text>
      </TouchableOpacity>
      <Card style={styles.summary}>
        {cartItems.map(item => (
          <View key={item.itemId} style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              {item.name} ×{item.quantity}
            </Text>
            <Text style={styles.summaryValue}>
              ${(item.price * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${cartTotal.toFixed(2)}</Text>
        </View>
      </Card>
      <Button title="Submit Breakfast Order" onPress={submit} />
      <CustomKeyboard
        visible={keyboardOpen}
        value={notes}
        onKeyPress={pressKey}
        onClose={() => setKeyboardOpen(false)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  sectionTitle: {
    color: colors.faint,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: spacing.md,
    marginTop: spacing.sm,
  },
  list: {
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  cartCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  cartCopy: {
    flex: 1,
  },
  itemTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
  },
  itemPrice: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: '900',
    marginTop: 4,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  qtyButton: {
    width: 30,
    height: 30,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyButtonText: {
    color: colors.gold,
    fontSize: 17,
    fontWeight: '900',
  },
  qtyText: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
    minWidth: 18,
    textAlign: 'center',
  },
  deleteButton: {
    borderColor: 'rgba(237, 79, 99, 0.3)',
    backgroundColor: 'rgba(237, 79, 99, 0.12)',
  },
  deleteText: {
    color: colors.danger,
    fontSize: 13,
    fontWeight: '900',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  timeButton: {
    minHeight: 34,
    minWidth: 96,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  timeButtonActive: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(224, 185, 35, 0.12)',
  },
  timeText: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: '900',
  },
  timeTextActive: {
    color: colors.gold,
  },
  notes: {
    minHeight: 98,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.cardSoft,
    padding: spacing.md,
    marginBottom: spacing.xl,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  notesIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(224, 185, 35, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notesIconText: {
    fontSize: 18,
  },
  notesText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
    lineHeight: typography.body + 7,
    paddingTop: 7,
  },
  notesPlaceholder: {
    color: colors.faint,
  },
  summary: {
    marginBottom: spacing.xl,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: spacing.md,
    paddingVertical: spacing.sm,
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
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    marginTop: spacing.sm,
    paddingTop: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
  },
  keyboardSheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  keyboardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  keyboardIcon: {
    fontSize: 22,
  },
  keyboardTitleWrap: {
    flex: 1,
  },
  keyboardTitle: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
  },
  keyboardPreview: {
    color: colors.muted,
    fontSize: typography.small,
    marginTop: 3,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: colors.cardSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeText: {
    color: colors.text,
    fontSize: 24,
    lineHeight: 24,
    fontWeight: '900',
  },
  keyRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginBottom: spacing.sm,
  },
  keyButton: {
    flex: 1,
    maxWidth: 34,
    minHeight: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    color: colors.text,
    fontSize: 14,
    fontWeight: '900',
  },
  commandRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
  commandKey: {
    minHeight: 42,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  spaceKey: {
    flex: 1,
  },
  commandText: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: '900',
  },
  doneButton: {
    marginTop: spacing.md,
  },
});

function CustomKeyboard({
  visible,
  value,
  onKeyPress,
  onClose,
}: {
  visible: boolean;
  value: string;
  onKeyPress: (key: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.modalScrim} />
        <View style={styles.keyboardSheet}>
          <View style={styles.keyboardHeader}>
            <Text style={styles.keyboardIcon}>⌨️</Text>
            <View style={styles.keyboardTitleWrap}>
              <Text style={styles.keyboardTitle}>Special Requests</Text>
              <Text style={styles.keyboardPreview} numberOfLines={1}>
                {value || 'Tap keys below'}
              </Text>
            </View>
            <TouchableOpacity activeOpacity={0.82} onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>
          {keyboardRows.map(row => (
            <View key={row} style={styles.keyRow}>
              {row.split('').map(key => (
                <TouchableOpacity
                  key={key}
                  activeOpacity={0.82}
                  onPress={() => onKeyPress(key)}
                  style={styles.keyButton}>
                  <Text style={styles.keyText}>{key}</Text>
                </TouchableOpacity>
              ))}
            </View>
          ))}
          <View style={styles.commandRow}>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => onKeyPress('space')}
              style={[styles.commandKey, styles.spaceKey]}>
              <Text style={styles.commandText}>Space</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => onKeyPress('delete')}
              style={styles.commandKey}>
              <Text style={styles.commandText}>⌫</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => onKeyPress('clear')}
              style={styles.commandKey}>
              <Text style={styles.commandText}>Clear</Text>
            </TouchableOpacity>
          </View>
          <Button title="Done" onPress={onClose} style={styles.doneButton} />
        </View>
      </View>
    </Modal>
  );
}
