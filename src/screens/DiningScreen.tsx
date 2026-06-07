import {useNavigation} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Button} from '../components/Button';
import {Card} from '../components/Card';
import {Pill} from '../components/Pill';
import {Screen} from '../components/Screen';
import {breakfastItems} from '../data/dining';
import type {RootStackParamList} from '../navigation/types';
import {useAppData} from '../storage/AppDataContext';
import {accentColors, colors, spacing, typography} from '../theme/theme';

type Navigation = NativeStackNavigationProp<RootStackParamList>;

export function DiningScreen() {
  const navigation = useNavigation<Navigation>();
  const {cart, cartItems, addToCart} = useAppData();
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <Screen withTabBar>
      <View style={styles.header}>
        <View style={styles.headerCopy}>
          <Text style={styles.title}>Dining Menu</Text>
          <Text style={styles.subtitle}>Browse breakfast choices and prepare your order.</Text>
        </View>
        <TouchableOpacity
          activeOpacity={0.82}
          onPress={() => navigation.navigate('BreakfastOrder')}
          style={styles.cartButton}>
          <Text style={styles.cartIcon}>🛒</Text>
          {cartCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          ) : null}
        </TouchableOpacity>
      </View>
      {breakfastItems.map(item => {
        const accent = accentColors[item.accent];
        const quantity = cart[item.id] ?? 0;
        return (
          <Card key={item.id} accentColor={accent} style={styles.itemCard}>
            <View style={styles.itemRow}>
              <View style={styles.itemCopy}>
                <View style={styles.titleRow}>
                  <Text style={styles.itemTitle}>{item.name}</Text>
                  <Pill label={item.tag} color={accent} />
                </View>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
              </View>
              <Image source={item.image} style={[styles.foodImage, {borderColor: accent}]} />
            </View>
            <View style={styles.itemFooter}>
              {quantity > 0 ? <Pill label={`×${quantity}`} color={colors.gold} /> : <View />}
              <Button
                title={quantity > 0 ? 'Add more' : 'Add'}
                icon="+"
                onPress={() => addToCart(item.id)}
                style={styles.addButton}
              />
            </View>
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
    marginTop: 4,
  },
  cartButton: {
    width: 50,
    height: 50,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.goldDark,
    backgroundColor: 'rgba(224, 185, 35, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cartIcon: {
    fontSize: 21,
  },
  badge: {
    position: 'absolute',
    right: -4,
    top: -4,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: colors.gold,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeText: {
    color: colors.black,
    fontSize: 11,
    fontWeight: '900',
  },
  itemCard: {
    marginBottom: spacing.md,
  },
  itemRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  itemCopy: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    flexWrap: 'wrap',
  },
  itemTitle: {
    color: colors.text,
    fontSize: typography.body,
    fontWeight: '900',
    flexShrink: 1,
  },
  description: {
    color: colors.muted,
    fontSize: typography.body,
    lineHeight: typography.body + 7,
    marginTop: spacing.sm,
  },
  price: {
    color: colors.gold,
    fontSize: typography.h2,
    fontWeight: '900',
    marginTop: spacing.md,
  },
  foodImage: {
    width: 72,
    height: 72,
    borderRadius: 16,
    borderWidth: 1,
  },
  itemFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: spacing.md,
    gap: spacing.md,
  },
  addButton: {
    minHeight: 38,
    minWidth: 112,
  },
});
