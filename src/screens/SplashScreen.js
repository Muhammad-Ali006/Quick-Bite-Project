import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';
import { fontSize, spacing } from '../constants/theme';

export default function SplashScreen({ onFinish }) {
  useEffect(() => {
    const timer = setTimeout(() => onFinish(), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.iconWrap}>
        <Text style={styles.emoji}>🍔</Text>
      </View>
      <Text style={styles.title}>QuickBite</Text>
      <Text style={styles.subtitle}>Food Delivery</Text>
      <ActivityIndicator size="large" color={Colors.white + 'CC'} style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.white + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emoji: {
    fontSize: 48,
  },
  title: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: Colors.white,
    letterSpacing: -1,
  },
  subtitle: {
    fontSize: fontSize.lg,
    color: Colors.white + 'BB',
    marginTop: spacing.xs,
    letterSpacing: 0.5,
  },
  loader: {
    marginTop: spacing.xxl,
  },
});
