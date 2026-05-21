import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  Alert,
} from 'react-native';
import Colors from '../constants/colors';
import { fontSize, spacing, borderRadius, shadows } from '../constants/theme';
import CustomButton from '../components/CustomButton';
import { placeOrder } from '../services/orderService';
import { addFavorite, removeFavorite, getFavorites } from '../services/favoritesService';

export default function FoodDetailScreen({ route, navigation }) {
  const { food } = route.params;
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    checkFavorite();
  }, []);

  const checkFavorite = async () => {
    const favs = await getFavorites();
    setIsFav(favs.some(f => f.id === food.id));
  };

  const handleOrder = async () => {
    try {
      await placeOrder(food.name, 1, '10.99');
      Alert.alert('Order Placed', `${food.name} has been ordered!`);
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleFavorite = async () => {
    if (isFav) {
      await removeFavorite(food.id);
      setIsFav(false);
      Alert.alert('Removed', 'Removed from favorites');
    } else {
      await addFavorite({
        id: food.id,
        name: food.name,
        category: food.category,
        image: food.image,
        area: food.area,
      });
      setIsFav(true);
      Alert.alert('Added', 'Added to favorites');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <Image source={{ uri: food.image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={styles.name}>{food.name}</Text>
        <View style={styles.badges}>
          {food.category && <Text style={styles.badge}>{food.category}</Text>}
          {food.area && <Text style={styles.badge}>{food.area}</Text>}
        </View>
        <Text style={styles.sectionTitle}>Instructions</Text>
        <Text style={styles.instructions}>{food.instructions}</Text>
        {food.ingredients && (
          <>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientList}>
              {food.ingredients.map((ing, i) => (
                <Text key={i} style={styles.ingredient}>• {ing}</Text>
              ))}
            </View>
          </>
        )}
        <View style={styles.actions}>
          <CustomButton title="Order Now" onPress={handleOrder} style={styles.btn} />
          <CustomButton
            title={isFav ? 'Remove from Favorites' : 'Add to Favorites'}
            onPress={handleFavorite}
            outline
            style={styles.btn}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  content: {
    paddingBottom: spacing.xxl,
  },
  image: {
    width: '100%',
    height: 320,
  },
  details: {
    padding: spacing.lg,
  },
  name: {
    fontSize: fontSize.xl,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  badges: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: spacing.sm,
  },
  badge: {
    color: Colors.primary,
    backgroundColor: Colors.primary + '15',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: borderRadius.sm,
    fontSize: fontSize.sm,
    fontWeight: '500',
    overflow: 'hidden',
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    marginTop: spacing.lg,
    marginBottom: spacing.sm,
    letterSpacing: -0.3,
  },
  instructions: {
    fontSize: fontSize.md,
    color: Colors.textSecondary,
    lineHeight: 26,
  },
  ingredientList: {
    gap: spacing.xs,
  },
  ingredient: {
    fontSize: fontSize.md,
    color: Colors.text,
    lineHeight: 24,
  },
  actions: {
    marginTop: spacing.xl,
    gap: spacing.sm,
  },
  btn: {
    width: '100%',
  },
});
