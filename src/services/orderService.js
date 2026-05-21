import { db } from '../config/firebase';
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
} from 'firebase/firestore';
import { getCurrentUser } from './authService';

const ORDERS_COLLECTION = 'orders';

export async function placeOrder(foodName, quantity, price) {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');
  return addDoc(collection(db, ORDERS_COLLECTION), {
    userId: user.uid,
    foodName,
    quantity,
    price,
    orderTime: new Date().toISOString(),
  });
}

export async function getOrders() {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');
  const q = query(
    collection(db, ORDERS_COLLECTION),
    where('userId', '==', user.uid)
  );
  const snapshot = await getDocs(q);
  const orders = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  return orders.sort((a, b) => new Date(b.orderTime) - new Date(a.orderTime));
}

export async function deleteOrder(orderId) {
  return deleteDoc(doc(db, ORDERS_COLLECTION, orderId));
}
