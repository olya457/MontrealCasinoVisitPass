import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {colors, platformSpace, spacing} from '../theme/theme';

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  withTabBar?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export function Screen({
  children,
  scroll = true,
  withTabBar = false,
  style,
  contentStyle,
}: ScreenProps) {
  const insets = useSafeAreaInsets();
  const topPadding =
    Platform.OS === 'android'
      ? Math.max(insets.top, platformSpace.androidEdge)
      : insets.top + spacing.sm;
  const bottomPadding =
    Platform.OS === 'android'
      ? Math.max(insets.bottom, platformSpace.androidEdge)
      : insets.bottom + spacing.md;
  const tabPadding = withTabBar ? 118 + platformSpace.tabBottom + insets.bottom : 0;
  const resolvedContentStyle = [
    styles.content,
    {paddingTop: topPadding, paddingBottom: bottomPadding + tabPadding},
    contentStyle,
  ];

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={[styles.root, style]}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={resolvedContentStyle}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}>
          {children}
        </ScrollView>
      ) : (
        <View style={resolvedContentStyle}>{children}</View>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.page,
  },
});
