import { Platform } from 'react-native';
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence, getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: 'AIzaSyC4PaQ1aVUJ8gw3c_lJVQSsxpk_7ENS1uk',
  authDomain: 'quickbite-97fd0.firebaseapp.com',
  projectId: 'quickbite-97fd0',
  storageBucket: 'quickbite-97fd0.firebasestorage.app',
  messagingSenderId: '334270882220',
  appId: '1:334270882220:web:14c9aee4b7acb4f14a5a09',
};

const app = initializeApp(firebaseConfig);

let auth;
if (Platform.OS === 'web') {
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

const db = getFirestore(app);

export { auth, db };
export default app;
