import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
  RefreshControl,
  Image,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/colors';
import { fontSize, spacing, borderRadius, shadows } from '../constants/theme';
import { getFavorites, removeFavorite, clearFavorites } from '../services/favoritesService';
import CustomButton from '../components/CustomButton';

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      loadFavorites();
    }, [])
  );

  const loadFavorites = async () => {
    setLoading(true);
    const data = await getFavorites();
    setFavorites(data);
    setLoading(false);
  };

  const handleRemove = async (id) => {
    const updated = await removeFavorite(id);
    setFavorites(updated);
  };

  const handleClearAll = () => {
    Alert.alert('Clear All', 'Remove all favorites?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Clear', style: 'destructive',
        onPress: async () => {
          const updated = await clearFavorites();
          setFavorites(updated);
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.category}>{item.category || item.area || 'General'}</Text>
      </View>
      <CustomButton title="Remove" onPress={() => handleRemove(item.id)} danger small />
    </View>
  );

  return (
    <View style={styles.container}>
      {favorites.length > 0 && (
        <CustomButton title="Clear All" onPress={handleClearAll} outline style={styles.clearBtn} />
      )}
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id?.toString()}
        renderItem={renderItem}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={loadFavorites} tintColor={Colors.primary} colors={[Colors.primary]} />}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🤍</Text>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySub}>Browse food and save your favorites!</Text>
          </View>
        }
        contentContainerStyle={favorites.length === 0 ? styles.emptyContainer : styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  clearBtn: {
    margin: spacing.md,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: borderRadius.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    padding: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  image: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.sm,
  },
  info: {
    flex: 1,
    paddingHorizontal: spacing.sm,
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  category: {
    fontSize: fontSize.sm,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  empty: {
    alignItems: 'center',
    paddingHorizontal: spacing.lg,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: Colors.text,
  },
  emptySub: {
    fontSize: fontSize.sm,
    color: Colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: 'center',
  },
});
