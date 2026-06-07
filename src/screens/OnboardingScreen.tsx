import React, {useState} from 'react';
import {
  ImageBackground,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Button} from '../components/Button';
import {EmojiIcon} from '../components/EmojiIcon';
import {onboardingSlides} from '../data/onboarding';
import {accentColors, colors, platformSpace, spacing, typography} from '../theme/theme';

type OnboardingScreenProps = {
  onFinish: () => void;
};

export function OnboardingScreen({onFinish}: OnboardingScreenProps) {
  const [index, setIndex] = useState(0);
  const insets = useSafeAreaInsets();
  const slide = onboardingSlides[index];
  const accent = accentColors[slide.accent];
  const last = index === onboardingSlides.length - 1;
  const topPadding =
    Platform.OS === 'android'
      ? Math.max(insets.top, platformSpace.androidEdge)
      : insets.top + spacing.md;
  const bottomPadding =
    Platform.OS === 'android'
      ? Math.max(insets.bottom, platformSpace.androidEdge)
      : insets.bottom + spacing.xl;

  const advance = () => {
    if (last) {
      onFinish();
      return;
    }
    setIndex(current => current + 1);
  };

  return (
    <ImageBackground source={slide.image} style={styles.root} resizeMode="cover">
      <View style={styles.scrim} />
      <View style={[styles.content, {paddingTop: topPadding, paddingBottom: bottomPadding}]}>
        <View style={styles.dots}>
          {onboardingSlides.map((item, dotIndex) => (
            <TouchableOpacity
              key={item.id}
              activeOpacity={0.8}
              onPress={() => setIndex(dotIndex)}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    dotIndex === index ? accent : 'rgba(255, 255, 255, 0.28)',
                },
              ]}
            />
          ))}
        </View>
        <View style={styles.bottom}>
          <EmojiIcon icon={slide.icon} color={accent} size={42} />
          <Text style={styles.title}>{slide.title}</Text>
          <Text style={styles.body}>{slide.body}</Text>
          <Button
            title={slide.cta}
            icon="›"
            onPress={advance}
            variant={last ? 'primary' : 'secondary'}
            style={[
              styles.button,
              !last && {
                borderColor: accent,
                backgroundColor: 'rgba(18, 26, 52, 0.76)',
              },
            ]}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(3, 5, 17, 0.14)',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.page,
    justifyContent: 'space-between',
  },
  dots: {
    flexDirection: 'row',
    alignSelf: 'center',
    gap: spacing.sm,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 4,
  },
  bottom: {
    gap: spacing.md,
  },
  title: {
    color: colors.text,
    fontSize: typography.h1,
    fontWeight: '900',
  },
  body: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 8,
    maxWidth: 350,
  },
  button: {
    marginTop: spacing.xl,
  },
});
