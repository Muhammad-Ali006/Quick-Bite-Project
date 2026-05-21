import React, { useState, useEffect, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import Colors from '../constants/colors';
import { fontSize, spacing, borderRadius, shadows } from '../constants/theme';
import FoodCard from '../components/FoodCard';
import SearchBar from '../components/SearchBar';
import { fetchFoodItems, fetchRestaurants } from '../services/api';
import { getFavorites, addFavorite, removeFavorite } from '../services/favoritesService';

export default function HomeScreen({ navigation }) {
  const [foodItems, setFoodItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadData();
    loadFavorites();
  }, []);

  const loadData = async () => {
    try {
      const [foods, rests] = await Promise.all([
        fetchFoodItems(search),
        fetchRestaurants(),
      ]);
      setFoodItems(foods);
      setRestaurants(rests);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadFavorites = async () => {
    const favs = await getFavorites();
    setFavorites(favs.map(f => f.id));
  };

  const handleSearch = async (text) => {
    setSearch(text);
    setLoading(true);
    try {
      const foods = await fetchFoodItems(text);
      setFoodItems(foods);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([loadData(), loadFavorites()]);
    setRefreshing(false);
  }, []);

  const handleFavorite = async (item) => {
    if (favorites.includes(item.id)) {
      const updated = await removeFavorite(item.id);
      setFavorites(updated.map(f => f.id));
    } else {
      const updated = await addFavorite({
        id: item.id,
        name: item.name,
        category: item.category,
        image: item.image,
        area: item.area,
      });
      setFavorites(updated.map(f => f.id));
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Loading delicious food...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SearchBar value={search} onChangeText={handleSearch} />
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <FoodCard
            item={item}
            onPress={(food) => navigation.navigate('FoodDetail', { food })}
            onFavorite={handleFavorite}
            isFav={favorites.includes(item.id)}
          />
        )}
        ListHeaderComponent={
          restaurants.length > 0 ? (
            <View style={styles.restaurantSection}>
              <Text style={styles.sectionTitle}>Nearby Restaurants</Text>
              <View style={styles.restaurantList}>
                {restaurants.slice(0, 3).map((r) => (
                  <View key={r.id} style={styles.restaurantCard}>
                    <Text style={styles.restName}>{r.name}</Text>
                    <Text style={styles.restDetail}>{r.address}</Text>
                    <View style={styles.restBottom}>
                      <Text style={styles.restRating}>⭐ {r.rating}</Text>
                      <Text style={styles.restHours}>{r.openingHours}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.center}>
            <Text style={styles.emptyIcon}>🍽️</Text>
            <Text style={styles.emptyText}>No food items found</Text>
          </View>
        }
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} colors={[Colors.primary]} />
        }
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: spacing.sm,
    color: Colors.textSecondary,
    fontSize: fontSize.sm,
  },
  list: {
    paddingBottom: spacing.xxl,
  },
  restaurantSection: {
    padding: spacing.md,
    paddingBottom: spacing.xs,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
    marginBottom: spacing.sm,
  },
  restaurantList: {
    gap: spacing.sm,
  },
  restaurantCard: {
    backgroundColor: Colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    ...shadows.small,
  },
  restName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  restDetail: {
    fontSize: fontSize.sm,
    color: Colors.textSecondary,
    marginTop: spacing.xs,
  },
  restBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
  },
  restRating: {
    fontSize: fontSize.sm,
    color: Colors.secondary,
    fontWeight: '600',
  },
  restHours: {
    fontSize: fontSize.xs,
    color: Colors.textLight,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: spacing.md,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: Colors.textSecondary,
  },
});
