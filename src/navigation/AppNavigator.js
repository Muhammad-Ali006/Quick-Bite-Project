import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import Colors from '../constants/colors';
import { fontSize } from '../constants/theme';

import WelcomeScreen from '../screens/WelcomeScreen';
import SignupScreen from '../screens/SignupScreen';
import LoginScreen from '../screens/LoginScreen';
import DashboardScreen from '../screens/DashboardScreen';
import HomeScreen from '../screens/HomeScreen';
import FoodDetailScreen from '../screens/FoodDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import OrdersScreen from '../screens/OrdersScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const tabs = [
  { name: 'Home', icon: '🍔' },
  { name: 'Favorites', icon: '❤️' },
  { name: 'Orders', icon: '📋' },
  { name: 'Dashboard', icon: '👤' },
];

function TabIcon({ routeName, focused }) {
  const tab = tabs.find(t => t.name === routeName);
  return <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.5 }}>{tab?.icon || '?'}</Text>;
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => <TabIcon routeName={route.name} focused={focused} />,
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textLight,
        tabBarStyle: {
          backgroundColor: Colors.surface,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 6,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: fontSize.xs,
          fontWeight: '600',
          letterSpacing: 0.2,
        },
        headerShown: false,
      })}
    >
      {tabs.map(t => (
        <Tab.Screen key={t.name} name={t.name} component={t.name === 'Home' ? HomeScreen : t.name === 'Favorites' ? FavoritesScreen : t.name === 'Orders' ? OrdersScreen : DashboardScreen} />
      ))}
    </Tab.Navigator>
  );
}

export default function AppNavigator({ user }) {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <>
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen
              name="FoodDetail"
              component={FoodDetailScreen}
              options={{
                headerShown: true,
                headerTitle: 'Food Details',
                headerTintColor: Colors.primary,
                headerTitleStyle: { fontWeight: '600', letterSpacing: -0.3 },
                headerStyle: { backgroundColor: Colors.surface, shadowColor: 'transparent', elevation: 0 },
                headerBackTitleVisible: false,
              }}
            />
          </>
        ) : (
          <>
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
