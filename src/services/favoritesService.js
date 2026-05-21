import AsyncStorage from '@react-native-async-storage/async-storage';

const FAVORITES_KEY = 'quickbite_favorites';

export async function getFavorites() {
  try {
    const data = await AsyncStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function addFavorite(item) {
  const favorites = await getFavorites();
  const exists = favorites.some(fav => fav.id === item.id);
  if (!exists) {
    favorites.push(item);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
  return favorites;
}

export async function removeFavorite(itemId) {
  const favorites = await getFavorites();
  const updated = favorites.filter(fav => fav.id !== itemId);
  await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
  return updated;
}

export async function clearFavorites() {
  await AsyncStorage.removeItem(FAVORITES_KEY);
  return [];
}

export async function isFavorite(itemId) {
  const favorites = await getFavorites();
  return favorites.some(fav => fav.id === itemId);
}
