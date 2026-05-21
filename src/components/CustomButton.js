import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import Colors from '../constants/colors';
import { fontSize, borderRadius, spacing } from '../constants/theme';

export default function CustomButton({ title, onPress, loading, outline, danger, small, style }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        outline && styles.outline,
        danger && styles.danger,
        small && styles.small,
        style,
      ]}
      onPress={onPress}
      disabled={loading}
      activeOpacity={0.85}
    >
      {loading ? (
        <ActivityIndicator color={outline ? Colors.primary : Colors.white} size="small" />
      ) : (
        <Text style={[styles.text, outline && styles.outlineText, danger && styles.dangerText, small && styles.smallText]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: spacing.sm + 6,
    paddingHorizontal: spacing.lg,
    borderRadius: borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 50,
  },
  small: {
    paddingVertical: spacing.sm + 2,
    paddingHorizontal: spacing.md,
    minHeight: 38,
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  danger: {
    backgroundColor: Colors.error,
  },
  text: {
    color: Colors.white,
    fontSize: fontSize.md,
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  smallText: {
    fontSize: fontSize.sm,
  },
  outlineText: {
    color: Colors.primary,
  },
  dangerText: {
    color: Colors.white,
  },
});
