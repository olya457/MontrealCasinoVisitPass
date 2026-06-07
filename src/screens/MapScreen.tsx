import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MapView, {Marker, Region} from 'react-native-maps';
import venueImage from '../assets/brand/montreal-venue.png';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {places} from '../data/places';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {accentColors, colors, spacing, typography} from '../theme/theme';
import type {Place} from '../types/entities';

type Navigation = NativeStackNavigationProp<RootStackParamList>;
type PopupPlace = Place | 'venue';

const casinoRegion: Region = {
  latitude: 45.507,
  longitude: -73.543,
  latitudeDelta: 0.065,
  longitudeDelta: 0.065,
};

export function MapScreen() {
  const navigation = useNavigation<Navigation>();
  const {savedPlaces} = useAppData();
  const [region, setRegion] = useState<Region>(casinoRegion);
  const [selectedPlace, setSelectedPlace] = useState<PopupPlace | null>(null);

  const focusCoordinates = (latitude: number, longitude: number, delta = 0.018) => {
    setRegion({
      latitude,
      longitude,
      latitudeDelta: delta,
      longitudeDelta: delta,
    });
  };

  const openPlacePopup = (place: Place) => {
    setSelectedPlace(place);
    focusCoordinates(place.coordinates.latitude, place.coordinates.longitude);
  };

  const zoom = (direction: 'in' | 'out') => {
    const multiplier = direction === 'in' ? 0.55 : 1.55;
    setRegion(current => ({
      ...current,
      latitudeDelta: Math.max(0.004, Math.min(0.16, current.latitudeDelta * multiplier)),
      longitudeDelta: Math.max(0.004, Math.min(0.16, current.longitudeDelta * multiplier)),
    }));
  };

  return (
    <Screen scroll={false} withTabBar contentStyle={styles.screenContent}>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Places to Visit</Text>
          <Text style={styles.subtitle}>Explore memorable locations around Montreal.</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('SavedPlaces')}
          style={styles.savedButton}>
          <Text style={styles.savedIcon}>🔖</Text>
          {savedPlaces.length > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{savedPlaces.length}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      <View style={styles.mapWrap}>
        <MapView style={styles.map} region={region} onRegionChangeComplete={setRegion}>
          <Marker
            coordinate={{latitude: 45.5059, longitude: -73.5251}}
            title="Montreal Casino"
            pinColor={colors.gold}
            onPress={() => {
              setSelectedPlace('venue');
              focusCoordinates(45.5059, -73.5251, 0.018);
            }}
          />
          {places.map(place => (
            <Marker
              key={place.id}
              coordinate={place.coordinates}
              title={place.name}
              description={place.tag}
              pinColor={accentColors[place.accent]}
              onPress={() => openPlacePopup(place)}
            />
          ))}
        </MapView>
        <View style={styles.youHere}>
          <Text style={styles.youHereText}>● You are here</Text>
        </View>
        <View style={styles.mapControls}>
          <MapControl label="+" onPress={() => zoom('in')} />
          <MapControl label="−" onPress={() => zoom('out')} />
          <MapControl
            label="◎"
            onPress={() => {
              setSelectedPlace('venue');
              focusCoordinates(45.5059, -73.5251, 0.02);
            }}
          />
          <MapControl label="🔖" onPress={() => navigation.navigate('SavedPlaces')} />
        </View>
        {selectedPlace ? (
          <MapPopup
            selectedPlace={selectedPlace}
            onClose={() => setSelectedPlace(null)}
            onDetails={() => {
              if (selectedPlace !== 'venue') {
                navigation.navigate('LocationDetails', {placeId: selectedPlace.id});
              }
            }}
          />
        ) : null}
      </View>
    </Screen>
  );
}

function MapControl({label, onPress}: {label: string; onPress: () => void}) {
  return (
    <TouchableOpacity activeOpacity={0.82} onPress={onPress} style={styles.controlButton}>
      <Text style={styles.controlText}>{label}</Text>
    </TouchableOpacity>
  );
}

function MapPopup({
  selectedPlace,
  onClose,
  onDetails,
}: {
  selectedPlace: PopupPlace;
  onClose: () => void;
  onDetails: () => void;
}) {
  const isVenue = selectedPlace === 'venue';
  const accent = isVenue ? colors.gold : accentColors[selectedPlace.accent];
  const title = isVenue ? 'Montreal Casino' : selectedPlace.name;
  const tag = isVenue ? 'You are here' : selectedPlace.tag;
  const body = isVenue
    ? 'Current venue marker. Use the map controls to explore curated demo places nearby.'
    : selectedPlace.localTip;
  const image = isVenue ? venueImage : selectedPlace.image;

  return (
    <View style={styles.popup}>
      <Image source={image} style={styles.popupImage} />
      <View style={styles.popupCopy}>
        <View style={styles.popupTitleRow}>
          <Text style={styles.popupTitle} numberOfLines={2}>
            {title}
          </Text>
          <Pill label={tag} color={accent} />
        </View>
        <Text style={styles.popupBody} numberOfLines={2}>
          {body}
        </Text>
        <View style={styles.popupActions}>
          <TouchableOpacity activeOpacity={0.82} onPress={onClose} style={styles.popupButton}>
            <Text style={styles.popupButtonText}>Close</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.82}
            disabled={isVenue}
            onPress={onDetails}
            style={[styles.popupButton, styles.popupButtonPrimary, isVenue && styles.disabledButton]}>
            <Text style={[styles.popupButtonText, styles.popupButtonPrimaryText]}>
              Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    marginBottom: spacing.md,
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
    fontSize: typography.small,
    marginTop: 4,
  },
  savedButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  savedIcon: {
    fontSize: 18,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.black,
    fontSize: 10,
    fontWeight: '900',
  },
  mapWrap: {
    flex: 1,
    minHeight: 420,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    backgroundColor: colors.card,
  },
  map: {
    flex: 1,
  },
  youHere: {
    position: 'absolute',
    right: 12,
    top: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(7, 9, 24, 0.84)',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  youHereText: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: '900',
  },
  mapControls: {
    position: 'absolute',
    right: 12,
    top: 48,
    gap: spacing.sm,
  },
  controlButton: {
    width: 42,
    height: 42,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 9, 24, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlText: {
    color: colors.gold,
    fontSize: 18,
    fontWeight: '900',
  },
  popup: {
    position: 'absolute',
    left: 12,
    right: 12,
    bottom: 12,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: 'rgba(7, 9, 24, 0.96)',
    padding: spacing.md,
    flexDirection: 'row',
    gap: spacing.md,
  },
  popupImage: {
    width: 92,
    height: 108,
    borderRadius: 12,
    backgroundColor: colors.cardSoft,
  },
  popupCopy: {
    flex: 1,
    gap: spacing.sm,
  },
  popupTitleRow: {
    gap: spacing.sm,
  },
  popupTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
  },
  popupBody: {
    color: colors.muted,
    fontSize: typography.small,
    lineHeight: typography.small + 6,
  },
  popupActions: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  popupButton: {
    flex: 1,
    minHeight: 36,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.cardSoft,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popupButtonPrimary: {
    borderColor: colors.gold,
    backgroundColor: colors.gold,
  },
  disabledButton: {
    opacity: 0.45,
  },
  popupButtonText: {
    color: colors.gold,
    fontSize: typography.small,
    fontWeight: '900',
  },
  popupButtonPrimaryText: {
    color: colors.black,
  },
});
