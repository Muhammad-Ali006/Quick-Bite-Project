import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import Colors from '../constants/colors';
import { fontSize, spacing, borderRadius, shadows } from '../constants/theme';
import CustomButton from '../components/CustomButton';
import { logoutUser, getCurrentUser } from '../services/authService';

export default function DashboardScreen({ navigation }) {
  const user = getCurrentUser();

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>
            {user?.email?.[0]?.toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.email}>{user?.email || 'No email'}</Text>
        <Text style={styles.uid}>ID: {user?.uid?.slice(0, 12)}...</Text>
      </View>
      <CustomButton title="Logout" onPress={handleLogout} danger />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    padding: spacing.lg,
    justifyContent: 'center',
    gap: spacing.lg,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: borderRadius.xl,
    padding: spacing.xxl,
    alignItems: 'center',
    ...shadows.medium,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  avatarText: {
    fontSize: fontSize.xxl,
    fontWeight: '700',
    color: Colors.white,
  },
  email: {
    fontSize: fontSize.lg,
    fontWeight: '600',
    color: Colors.text,
  },
  uid: {
    fontSize: fontSize.sm,
    color: Colors.textSecondary,
    marginTop: spacing.xs,
  },
});
