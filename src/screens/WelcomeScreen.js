import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { fontSize, spacing, borderRadius } from '../constants/theme';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.heroIcon}>
          <Text style={styles.emoji}>🍔</Text>
        </View>
        <Text style={styles.brand}>QuickBite</Text>
        <Text style={styles.tagline}>Delicious food, delivered fast</Text>
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={styles.primaryBtn}
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={styles.primaryBtnText}>Create Account</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.outlineBtn}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.outlineBtnText}>Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

import { TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  top: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: Colors.primary + '15',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  emoji: {
    fontSize: 56,
  },
  brand: {
    fontSize: fontSize.title,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: -1,
  },
  tagline: {
    fontSize: fontSize.md,
    color: Colors.textSecondary,
    marginTop: spacing.sm,
    letterSpacing: 0.2,
  },
  bottom: {
    gap: spacing.sm + 2,
  },
  primaryBtn: {
    backgroundColor: Colors.primary,
    paddingVertical: spacing.sm + 6,
    borderRadius: borderRadius.md,
    alignItems: 'center',
  },
  primaryBtnText: {
    color: Colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  outlineBtn: {
    paddingVertical: spacing.sm + 6,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  outlineBtnText: {
    color: Colors.primary,
    fontSize: fontSize.md,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
});
