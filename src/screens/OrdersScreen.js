import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  StyleSheet,
  Alert,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/colors';
import { fontSize, spacing, borderRadius, shadows } from '../constants/theme';
import { placeOrder, getOrders, deleteOrder } from '../services/orderService';
import CustomButton from '../components/CustomButton';

export default function OrdersScreen() {
  const [orders, setOrders] = useState([]);
  const [foodName, setFoodName] = useState('');
  const [quantity, setQuantity] = useState('1');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useFocusEffect(
    useCallback(() => {
      loadOrders();
    }, [])
  );

  const loadOrders = async () => {
    try {
      const data = await getOrders();
      setOrders(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePlaceOrder = async () => {
    if (!foodName.trim() || !price.trim()) {
      Alert.alert('Error', 'Please fill in food name and price');
      return;
    }
    setLoading(true);
    try {
      await placeOrder(foodName.trim(), parseInt(quantity) || 1, parseFloat(price));
      Alert.alert('Success', 'Order placed!');
      setFoodName('');
      setQuantity('1');
      setPrice('');
      loadOrders();
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = (orderId) => {
    Alert.alert('Delete Order', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete', style: 'destructive',
        onPress: async () => {
          await deleteOrder(orderId);
          loadOrders();
        },
      },
    ]);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    await loadOrders();
    setRefreshing(false);
  };

  const renderOrder = ({ item }) => (
    <View style={styles.orderCard}>
      <View style={styles.orderInfo}>
        <Text style={styles.orderName}>{item.foodName}</Text>
        <Text style={styles.orderDetail}>Qty: {item.quantity} · ${item.price}</Text>
        <Text style={styles.orderTime}>
          {new Date(item.orderTime).toLocaleDateString()} {new Date(item.orderTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </View>
      <CustomButton title="Delete" onPress={() => handleDelete(item.id)} danger small />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.sectionTitle}>Place New Order</Text>
        <TextInput
          style={styles.input}
          placeholder="Food Name"
          placeholderTextColor={Colors.textLight}
          value={foodName}
          onChangeText={setFoodName}
        />
        <View style={styles.row}>
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="Qty"
            placeholderTextColor={Colors.textLight}
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
          />
          <TextInput
            style={[styles.input, styles.half]}
            placeholder="Price"
            placeholderTextColor={Colors.textLight}
            value={price}
            onChangeText={setPrice}
            keyboardType="decimal-pad"
          />
        </View>
        <CustomButton
          title={loading ? 'Placing...' : 'Place Order'}
          onPress={handlePlaceOrder}
          loading={loading}
        />
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderOrder}
        ListHeaderComponent={
          orders.length > 0 ? <Text style={[styles.sectionTitle, styles.ordersHeader]}>Your Orders</Text> : null
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>📋</Text>
            <Text style={styles.emptyText}>No orders yet</Text>
          </View>
        }
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={Colors.primary} colors={[Colors.primary]} />}
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
  form: {
    padding: spacing.md,
    backgroundColor: Colors.surface,
    margin: spacing.md,
    borderRadius: borderRadius.lg,
    ...shadows.medium,
    gap: spacing.sm,
  },
  sectionTitle: {
    fontSize: fontSize.lg,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.3,
  },
  ordersHeader: {
    marginBottom: spacing.sm,
  },
  input: {
    backgroundColor: Colors.background,
    borderRadius: borderRadius.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 4,
    fontSize: fontSize.md,
    color: Colors.text,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  row: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  half: {
    flex: 1,
  },
  list: {
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.xxl,
  },
  orderCard: {
    backgroundColor: Colors.surface,
    borderRadius: borderRadius.md,
    padding: spacing.md,
    marginBottom: spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    ...shadows.small,
  },
  orderInfo: {
    flex: 1,
  },
  orderName: {
    fontSize: fontSize.md,
    fontWeight: '600',
    color: Colors.text,
  },
  orderDetail: {
    fontSize: fontSize.sm,
    color: Colors.primary,
    fontWeight: '500',
    marginTop: spacing.xs,
  },
  orderTime: {
    fontSize: fontSize.xs,
    color: Colors.textLight,
    marginTop: spacing.xs,
  },
  empty: {
    alignItems: 'center',
    paddingVertical: spacing.xxl + 10,
  },
  emptyIcon: {
    fontSize: 36,
    marginBottom: spacing.sm,
  },
  emptyText: {
    fontSize: fontSize.md,
    color: Colors.textSecondary,
  },
});
