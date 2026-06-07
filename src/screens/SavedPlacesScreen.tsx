import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {EmojiIcon} from '../components/EmojiIcon';
import {EmptyState} from '../components/EmptyState';
import {Header} from '../components/Header';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {places} from '../data/places';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {accentColors, colors, spacing, typography} from '../theme/theme';

type Props = NativeStackScreenProps<RootStackParamList, 'SavedPlaces'>;

export function SavedPlacesScreen({navigation}: Props) {
  const {savedPlaces, removeSavedPlace} = useAppData();
  const saved = places.filter(place => savedPlaces.includes(place.id));

  if (saved.length === 0) {
    return (
      <Screen scroll={false}>
        <Header
          title="Saved Places"
          subtitle="0 locations saved"
          onBack={navigation.goBack}
        />
        <EmptyState
          icon="📍"
          title="No saved places"
          body="Explore the map and save places you would like to visit."
          buttonTitle="Explore Map"
          onPress={() => navigation.navigate('MainTabs', {screen: 'Map'})}
        />
      </Screen>
    );
  }

  return (
    <Screen>
      <Header
        title="Saved Places"
        subtitle={`${saved.length} locations saved`}
        onBack={navigation.goBack}
      />
      <View style={styles.list}>
        {saved.map(place => {
          const accent = accentColors[place.accent];
          return (
            <Card key={place.id}>
              <View style={styles.top}>
                <EmojiIcon icon={place.icon} color={accent} />
                <View style={styles.copy}>
                  <Text style={styles.title}>{place.name}</Text>
                  <Pill label={place.tag} color={accent} />
                  <Text style={styles.body}>{place.localTip}</Text>
                </View>
                <TouchableOpacity
                  activeOpacity={0.82}
                  onPress={() => removeSavedPlace(place.id)}
                  style={styles.remove}>
                  <Text style={styles.removeText}>×</Text>
                </TouchableOpacity>
              </View>
              <Button
                title="View Details"
                variant="ghost"
                onPress={() => navigation.navigate('LocationDetails', {placeId: place.id})}
                style={styles.button}
              />
            </Card>
          );
        })}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  list: {
    gap: spacing.md,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  copy: {
    flex: 1,
    gap: spacing.sm,
  },
  title: {
    color: colors.text,
    fontSize: typography.h2,
    fontWeight: '900',
  },
  body: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: typography.small + 6,
  },
  remove: {
    width: 36,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(237, 79, 99, 0.3)',
    backgroundColor: 'rgba(237, 79, 99, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeText: {
    color: colors.danger,
    fontSize: 22,
    lineHeight: 22,
    fontWeight: '900',
  },
  button: {
    marginTop: spacing.md,
  },
});
