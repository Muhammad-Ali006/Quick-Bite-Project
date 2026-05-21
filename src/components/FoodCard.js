import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { fontSize, borderRadius, spacing, shadows } from '../constants/theme';

export default function FoodCard({ item, onPress, onFavorite, isFav }) {
  return (
    <TouchableOpacity style={styles.card} onPress={() => onPress(item)} activeOpacity={0.95}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
        <View style={styles.tags}>
          {item.category && <Text style={styles.tag}>{item.category}</Text>}
          {item.area && <Text style={styles.tag}>{item.area}</Text>}
        </View>
      </View>
      {onFavorite && (
        <TouchableOpacity style={styles.favBtn} onPress={() => onFavorite(item)} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <Text style={styles.favIcon}>{isFav ? '❤️' : '🤍'}</Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.surface,
    borderRadius: borderRadius.lg,
    marginHorizontal: spacing.md,
    marginVertical: spacing.xs,
    flexDirection: 'row',
    overflow: 'hidden',
    ...shadows.small,
  },
  image: {
    width: 90,
    height: 90,
    borderRadius: borderRadius.md,
    margin: spacing.sm,
  },
  content: {
    flex: 1,
    paddingVertical: spacing.sm + 2,
    paddingRight: spacing.sm,
    justifyContent: 'center',
  },
  name: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: Colors.text,
    letterSpacing: -0.2,
  },
  tags: {
    flexDirection: 'row',
    gap: spacing.xs,
    marginTop: spacing.xs + 2,
    flexWrap: 'wrap',
  },
  tag: {
    fontSize: fontSize.xs,
    color: Colors.primary,
    backgroundColor: Colors.primary + '12',
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: borderRadius.sm,
    fontWeight: '500',
    overflow: 'hidden',
  },
  favBtn: {
    padding: spacing.md,
    justifyContent: 'center',
  },
  favIcon: {
    fontSize: 18,
  },
});
