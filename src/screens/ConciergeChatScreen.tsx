import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useMemo, useRef, useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {Header} from '../components/Header';
import {Screen} from '../components/Screen';
import {faqs} from '../data/faqs';
import type {RootStackParamList} from '../navigation/types';
import {colors, spacing, typography} from '../theme/theme';
import type {ChatMessage} from '../types/entities';

type Props = NativeStackScreenProps<RootStackParamList, 'ConciergeChat'>;

const quickQuestions = [
  'What can this demo chat show?',
  'Where can I find breakfast?',
  'How do I use the QR pass?',
  'Where can I see my pass?',
  'How do I book a service?',
  'Can I book a restaurant table?',
  'What events are available?',
  'How do I save an event?',
  'Can I request a table for an event?',
  'Can I request transport?',
  'How do I check request status?',
  'What should I wear?',
  'What is the best time to arrive?',
  'Show nearby places',
  'What is closest outdoor place?',
  'Best place for evening photos?',
  'How do I open a route?',
];

const keyboardRows = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export function ConciergeChatScreen({navigation}: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const [input, setInput] = useState('');
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'support',
      text: 'Demo chat is ready. Try a guest question to preview how visit guidance, dining, service, event, and map answers can look.',
    },
  ]);

  const quick = useMemo(() => quickQuestions, []);

  const send = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) {
      return;
    }
    const response = findAnswer(trimmed);
    setMessages(current => [
      ...current,
      {id: `${Date.now()}-guest`, role: 'guest', text: trimmed},
      {id: `${Date.now()}-support`, role: 'support', text: response},
    ]);
    setInput('');
    setKeyboardOpen(false);
    setTimeout(() => scrollRef.current?.scrollToEnd({animated: true}), 80);
  };

  const pressKey = (key: string) => {
    if (key === 'space') {
      setInput(current => `${current} `);
      return;
    }
    if (key === 'delete') {
      setInput(current => current.slice(0, -1));
      return;
    }
    if (key === 'clear') {
      setInput('');
      return;
    }
    setInput(current => `${current}${key}`);
  };

  return (
    <Screen scroll={false}>
      <Header
        title="Concierge Chat"
        subtitle="Demo Version · Preview Only"
        onBack={navigation.goBack}
      />
      <View style={styles.demoBanner}>
        <Text style={styles.demoBadge}>DEMO</Text>
        <Text style={styles.demoText}>
          Preview answers only. This chat does not contact live guest support.
        </Text>
      </View>
      <ScrollView
        ref={scrollRef}
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}>
        {messages.map(message => (
          <View
            key={message.id}
            style={[
              styles.messageRow,
              message.role === 'guest' && styles.messageRowGuest,
            ]}>
            {message.role === 'support' ? <Text style={styles.bubbleIcon}>💬</Text> : null}
            <View
              style={[
                styles.bubble,
                message.role === 'guest' ? styles.guestBubble : styles.supportBubble,
              ]}>
              <Text
                style={[
                  styles.bubbleText,
                  message.role === 'guest' && styles.guestBubbleText,
                ]}>
                {message.text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <View style={styles.quickWrap}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {quick.map(question => (
            <TouchableOpacity
              key={question}
              activeOpacity={0.82}
              onPress={() => send(question)}
              style={styles.quickButton}>
              <Text style={styles.quickText}>{question}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <View style={styles.inputRow}>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => send('What can this demo chat show?')}
          style={styles.flash}>
          <Text style={styles.flashText}>⚡</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => setKeyboardOpen(true)}
          style={styles.input}>
          <Text
            style={[styles.inputText, !input && styles.placeholderText]}
            numberOfLines={1}>
            {input || 'Try a demo question...'}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.82} onPress={() => send(input)} style={styles.send}>
          <Text style={styles.sendText}>➤</Text>
        </TouchableOpacity>
      </View>
      <CustomKeyboard
        visible={keyboardOpen}
        value={input}
        onKeyPress={pressKey}
        onClose={() => setKeyboardOpen(false)}
        onSend={() => send(input)}
      />
    </Screen>
  );
}

function findAnswer(question: string) {
  const normalized = question.toLowerCase();
  const match = faqs.find(item => {
    const haystack = `${item.question} ${item.answer}`.toLowerCase();
    return normalized
      .split(/\s+/)
      .filter(word => word.length > 3)
      .some(word => haystack.includes(word));
  });

  return (
    match?.answer ??
    'Demo response: this preview can show answers about the QR pass, dining, services, events, and places around Montreal. It does not send messages to live support.'
  );
}

const styles = StyleSheet.create({
  demoBanner: {
    minHeight: 54,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: 'rgba(224, 185, 35, 0.1)',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
  },
  demoBadge: {
    color: colors.black,
    backgroundColor: colors.gold,
    borderRadius: 8,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 4,
    fontSize: 10,
    fontWeight: '900',
  },
  demoText: {
    flex: 1,
    color: colors.text,
    fontSize: typography.small,
    lineHeight: typography.small + 5,
    fontWeight: '700',
  },
  messages: {
    flex: 1,
  },
  messagesContent: {
    paddingBottom: spacing.md,
    gap: spacing.md,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: spacing.sm,
  },
  messageRowGuest: {
    justifyContent: 'flex-end',
  },
  bubbleIcon: {
    color: colors.blue,
    fontSize: 16,
    marginBottom: 8,
  },
  bubble: {
    maxWidth: '80%',
    borderRadius: 14,
    padding: spacing.md,
  },
  supportBubble: {
    backgroundColor: colors.cardSoft,
  },
  guestBubble: {
    backgroundColor: colors.gold,
  },
  bubbleText: {
    color: colors.text,
    fontSize: typography.small,
    lineHeight: typography.small + 6,
  },
  guestBubbleText: {
    color: colors.black,
    fontWeight: '800',
  },
  quickWrap: {
    borderTopWidth: 1,
    borderTopColor: colors.borderSoft,
    paddingTop: spacing.sm,
    marginTop: spacing.sm,
  },
  quickButton: {
    minHeight: 32,
    borderRadius: 12,
    backgroundColor: colors.cardSoft,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    paddingHorizontal: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  quickText: {
    color: colors.muted,
    fontSize: 11,
    fontWeight: '800',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingTop: spacing.md,
  },
  flash: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.cardSoft,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  flashText: {
    color: colors.gold,
    fontSize: 16,
  },
  input: {
    flex: 1,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.cardSoft,
    paddingHorizontal: spacing.md,
    justifyContent: 'center',
  },
  inputText: {
    color: colors.text,
    fontSize: typography.small,
  },
  placeholderText: {
    color: colors.faint,
  },
  send: {
    width: 42,
    height: 42,
    borderRadius: 12,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sendText: {
    color: colors.black,
    fontSize: 16,
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
  keyboardActions: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.md,
  },
  keyboardAction: {
    flex: 1,
    minHeight: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyboardActionPrimary: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  keyboardActionText: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: '900',
  },
  keyboardActionTextPrimary: {
    color: colors.black,
  },
});

function CustomKeyboard({
  visible,
  value,
  onKeyPress,
  onClose,
  onSend,
}: {
  visible: boolean;
  value: string;
  onKeyPress: (key: string) => void;
  onClose: () => void;
  onSend: () => void;
}) {
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalRoot}>
        <TouchableOpacity activeOpacity={1} onPress={onClose} style={styles.modalScrim} />
        <View style={styles.keyboardSheet}>
          <View style={styles.keyboardHeader}>
            <Text style={styles.keyboardIcon}>⌨️</Text>
            <View style={styles.keyboardTitleWrap}>
              <Text style={styles.keyboardTitle}>Demo Keyboard</Text>
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
          <View style={styles.keyboardActions}>
            <TouchableOpacity activeOpacity={0.82} onPress={onClose} style={styles.keyboardAction}>
              <Text style={styles.keyboardActionText}>Done</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={onSend}
              style={[styles.keyboardAction, styles.keyboardActionPrimary]}>
              <Text style={[styles.keyboardActionText, styles.keyboardActionTextPrimary]}>
                Send
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}
