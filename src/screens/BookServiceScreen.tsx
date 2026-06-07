import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useState} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {EmojiIcon} from '../components/EmojiIcon';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {services} from '../data/services';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {accentColors, colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'BookService'>;
type PickerTarget = 'date' | 'time' | 'guests';
type KeyboardTarget = 'contactName' | 'notes';

const dateOptions = [
  'Today',
  'Tomorrow',
  'June 8',
  'June 9',
  'June 10',
  'This Friday',
  'This Weekend',
  'By Request',
];

const timeOptions = [
  'To be confirmed',
  '7:00 AM',
  '8:00 AM',
  '9:00 AM',
  '10:00 AM',
  '12:00 PM',
  '3:00 PM',
  '5:30 PM',
  '7:00 PM',
  '9:00 PM',
];

const guestOptions = ['1', '2', '3', '4', '5', '6', '7', '8', 'Group 9+'];
const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export function BookServiceScreen({navigation, route}: Props) {
  const service = useMemo(
    () => services.find(item => item.id === route.params.serviceId) ?? services[0],
    [route.params.serviceId],
  );
  const accent = accentColors[service.accent];
  const {addServiceRequest} = useAppData();
  const [date, setDate] = useState('Today');
  const [time, setTime] = useState('');
  const [guests, setGuests] = useState('2');
  const [contactName, setContactName] = useState('');
  const [priority, setPriority] = useState<'Standard' | 'Urgent'>('Standard');
  const [notes, setNotes] = useState('');
  const [pickerTarget, setPickerTarget] = useState<PickerTarget | null>(null);
  const [keyboardTarget, setKeyboardTarget] = useState<KeyboardTarget | null>(null);

  const pickerConfig = useMemo(() => {
    if (pickerTarget === 'date') {
      return {
        title: 'Choose Date',
        icon: '📅',
        options: dateOptions,
        value: date,
      };
    }
    if (pickerTarget === 'time') {
      return {
        title: 'Choose Time',
        icon: '⏰',
        options: timeOptions,
        value: time || 'To be confirmed',
      };
    }
    if (pickerTarget === 'guests') {
      return {
        title: 'Choose Guests',
        icon: '👥',
        options: guestOptions,
        value: guests,
      };
    }
    return null;
  }, [date, guests, pickerTarget, time]);

  const keyboardValue = keyboardTarget === 'notes' ? notes : contactName;
  const keyboardTitle =
    keyboardTarget === 'notes' ? 'Additional Notes' : 'Contact Name';

  const selectPickerOption = (value: string) => {
    if (pickerTarget === 'date') {
      setDate(value);
    }
    if (pickerTarget === 'time') {
      setTime(value === 'To be confirmed' ? '' : value);
    }
    if (pickerTarget === 'guests') {
      setGuests(value);
    }
    setPickerTarget(null);
  };

  const updateKeyboardValue = (next: string) => {
    if (keyboardTarget === 'notes') {
      setNotes(next);
    } else {
      setContactName(next);
    }
  };

  const pressKey = (key: string) => {
    if (!keyboardTarget) {
      return;
    }
    if (key === 'space') {
      updateKeyboardValue(`${keyboardValue} `);
      return;
    }
    if (key === 'delete') {
      updateKeyboardValue(keyboardValue.slice(0, -1));
      return;
    }
    if (key === 'clear') {
      updateKeyboardValue('');
      return;
    }
    updateKeyboardValue(`${keyboardValue}${key}`);
  };

  const submit = () => {
    const request = addServiceRequest({
      serviceId: service.id,
      title: service.title,
      tag: service.tag,
      date: date.trim() || 'Today',
      time: time.trim() || 'To be confirmed',
      guests: guests.trim() || '1',
      contactName: contactName.trim() || 'Guest Visitor',
      priority,
      notes: notes.trim(),
    });
    navigation.replace('RequestSent', {requestId: request.id});
  };

  return (
    <Screen>
      <Header title="Book Service" subtitle={service.title} onBack={navigation.goBack} />
      <Card style={styles.serviceHeader}>
        <EmojiIcon icon={service.icon} color={accent} />
        <View style={styles.serviceCopy}>
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Pill label={service.tag} color={accent} />
        </View>
      </Card>

      <PickerField
        label="Date"
        icon="📅"
        value={date}
        onPress={() => setPickerTarget('date')}
      />
      <PickerField
        label="Preferred Time"
        icon="⏰"
        value={time}
        placeholder="To be confirmed"
        onPress={() => setPickerTarget('time')}
      />
      <PickerField
        label="Number of Guests"
        icon="👥"
        value={guests}
        onPress={() => setPickerTarget('guests')}
      />
      <TextField
        label="Contact Name"
        icon="👤"
        value={contactName}
        placeholder="Your name"
        onPress={() => setKeyboardTarget('contactName')}
      />

      <Text style={styles.label}>Priority</Text>
      <View style={styles.priorityRow}>
        {(['Standard', 'Urgent'] as const).map(item => {
          const active = priority === item;
          return (
            <TouchableOpacity
              key={item}
              activeOpacity={0.82}
              onPress={() => setPriority(item)}
              style={[styles.priority, active && styles.priorityActive]}>
              <Text style={[styles.priorityEmoji, active && styles.priorityTextActive]}>
                {item === 'Standard' ? '✨' : '⚡'}
              </Text>
              <Text style={[styles.priorityText, active && styles.priorityTextActive]}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TextField
        label="Additional Notes"
        icon="📝"
        value={notes}
        placeholder="Any special requirements or preferences..."
        multiline
        onPress={() => setKeyboardTarget('notes')}
      />

      <Button title="Send Booking Request" onPress={submit} style={styles.submit} />

      <SelectionSheet
        visible={Boolean(pickerConfig)}
        title={pickerConfig?.title ?? ''}
        icon={pickerConfig?.icon ?? ''}
        options={pickerConfig?.options ?? []}
        selected={pickerConfig?.value ?? ''}
        onSelect={selectPickerOption}
        onClose={() => setPickerTarget(null)}
      />

      <CustomKeyboard
        visible={Boolean(keyboardTarget)}
        title={keyboardTitle}
        value={keyboardValue}
        onKeyPress={pressKey}
        onClose={() => setKeyboardTarget(null)}
      />
    </Screen>
  );
}

function PickerField({
  label,
  icon,
  value,
  placeholder,
  onPress,
}: {
  label: string;
  icon: string;
  value: string;
  placeholder?: string;
  onPress: () => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.inputRow}>
        <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.inputIcon}>
          <Text style={styles.inputIconText}>{icon}</Text>
        </TouchableOpacity>
        <Text
          style={[styles.inputText, !value && styles.placeholderText]}
          numberOfLines={1}>
          {value || placeholder}
        </Text>
        <Text style={styles.inputChevron}>⌄</Text>
      </TouchableOpacity>
    </View>
  );
}

function TextField({
  label,
  icon,
  value,
  placeholder,
  multiline,
  onPress,
}: {
  label: string;
  icon: string;
  value: string;
  placeholder?: string;
  multiline?: boolean;
  onPress: () => void;
}) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity
        activeOpacity={0.82}
        onPress={onPress}
        style={[styles.inputRow, multiline && styles.notesRow]}>
        <View style={styles.inputIcon}>
          <Text style={styles.inputIconText}>{icon}</Text>
        </View>
        <Text
          style={[
            styles.inputText,
            !value && styles.placeholderText,
            multiline && styles.notesText,
          ]}
          numberOfLines={multiline ? 4 : 1}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function SelectionSheet({
  visible,
  title,
  icon,
  options,
  selected,
  onSelect,
  onClose,
}: {
  visible: boolean;
  title: string;
  icon: string;
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.modalScrim} />
        <View style={styles.sheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetIcon}>{icon}</Text>
            <Text style={styles.sheetTitle}>{title}</Text>
            <TouchableOpacity activeOpacity={0.82} onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.optionGrid}>
            {options.map(option => {
              const active = selected === option;
              return (
                <TouchableOpacity
                  key={option}
                  activeOpacity={0.82}
                  onPress={() => onSelect(option)}
                  style={[styles.optionButton, active && styles.optionButtonActive]}>
                  <Text style={[styles.optionText, active && styles.optionTextActive]}>
                    {active ? '✓ ' : ''}
                    {option}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </Modal>
  );
}

function CustomKeyboard({
  visible,
  title,
  value,
  onKeyPress,
  onClose,
}: {
  visible: boolean;
  title: string;
  value: string;
  onKeyPress: (key: string) => void;
  onClose: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.modalScrim} />
        <View style={styles.keyboardSheet}>
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetIcon}>⌨️</Text>
            <View style={styles.keyboardHeaderCopy}>
              <Text style={styles.sheetTitle}>{title}</Text>
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

const styles = StyleSheet.create({
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  serviceCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  serviceTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
  },
  field: {
    marginBottom: spacing.lg,
  },
  label: {
    color: colors.faint,
    fontSize: 11,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: 0,
    marginBottom: spacing.sm,
  },
  inputRow: {
    minHeight: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: colors.cardSoft,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  notesRow: {
    minHeight: 112,
    alignItems: 'flex-start',
    paddingTop: spacing.md,
  },
  inputIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(224, 185, 35, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputIconText: {
    fontSize: 18,
  },
  inputText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.body,
  },
  notesText: {
    lineHeight: typography.body + 7,
    paddingTop: 7,
  },
  placeholderText: {
    color: colors.faint,
  },
  inputChevron: {
    color: colors.faint,
    fontSize: 20,
    fontWeight: '900',
  },
  priorityRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  priority: {
    flex: 1,
    minHeight: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: spacing.sm,
  },
  priorityActive: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(224, 185, 35, 0.12)',
  },
  priorityEmoji: {
    color: colors.muted,
    fontSize: 15,
  },
  priorityText: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: '900',
  },
  priorityTextActive: {
    color: colors.gold,
  },
  submit: {
    marginTop: spacing.sm,
  },
  modalRoot: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.58)',
  },
  sheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.xl,
  },
  keyboardSheet: {
    backgroundColor: colors.bg,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  sheetHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  sheetIcon: {
    fontSize: 24,
  },
  sheetTitle: {
    flex: 1,
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
  },
  keyboardHeaderCopy: {
    flex: 1,
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
  optionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  optionButton: {
    minHeight: 44,
    minWidth: '47%',
    flexGrow: 1,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing.md,
  },
  optionButtonActive: {
    borderColor: colors.gold,
    backgroundColor: 'rgba(224, 185, 35, 0.12)',
  },
  optionText: {
    color: colors.muted,
    fontSize: typography.small,
    fontWeight: '900',
    textAlign: 'center',
  },
  optionTextActive: {
    color: colors.gold,
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
