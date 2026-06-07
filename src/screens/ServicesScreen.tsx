import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {EmojiIcon} from '../components/EmojiIcon';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {services} from '../data/services';
import type {RootStackParamList} from '../navigation/types';
import {accentColors, colors, spacing, typography} from '../theme/theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function ServicesScreen() {
  const navigation = useNavigation<Navigation>();

  return (
    <Screen withTabBar>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Book Services</Text>
          <Text style={styles.subtitle}>
            Request useful guest services during your visit.
          </Text>
        </View>
        <Button
          title="My Requests"
          variant="secondary"
          onPress={() => navigation.navigate('MyRequests')}
          style={styles.requestsButton}
        />
      </View>
      {services.map(service => {
        const accent = accentColors[service.accent];
        return (
          <Card key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceRow}>
              <EmojiIcon icon={service.icon} color={accent} />
              <View style={styles.serviceCopy}>
                <Text style={styles.serviceTitle}>{service.title}</Text>
                <Pill label={service.tag} color={accent} />
                <Text style={styles.description}>{service.description}</Text>
              </View>
            </View>
            <TouchableOpacity
              activeOpacity={0.82}
              onPress={() => navigation.navigate('BookService', {serviceId: service.id})}
              style={[styles.serviceButton, {borderColor: accent}]}>
              <Text style={[styles.serviceButtonText, {color: accent}]}>
                {service.cta} ›
              </Text>
            </TouchableOpacity>
          </Card>
        );
      })}
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  headerCopy: {
    flex: 1,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: '900',
  },
  subtitle: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 6,
    marginTop: 4,
  },
  requestsButton: {
    minHeight: 44,
    minWidth: 112,
  },
  serviceCard: {
    marginBottom: spacing.md,
  },
  serviceRow: {
    flexDirection: 'row',
    gap: spacing.md,
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
  description: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 7,
  },
  serviceButton: {
    marginTop: spacing.lg,
    minHeight: 42,
    borderRadius: 12,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceButtonText: {
    fontSize: typography.small,
    fontWeight: '900',
  },
});
