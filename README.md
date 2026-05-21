# QuickBite 🍕

A modern React Native food delivery application built with Expo, featuring real-time authentication, intuitive food browsing, and seamless ordering experience.

## 📱 Features

- **User Authentication**: Secure login and signup with Firebase
- **Food Discovery**: Browse and search for delicious food items
- **Food Details**: View detailed information about food items including descriptions and pricing
- **Favorites**: Save your favorite food items for quick access
- **Order Management**: Place orders and track your order history
- **Responsive Design**: Works seamlessly across iOS, Android, and Web platforms
- **Real-time Updates**: Firebase integration for real-time data synchronization
- **Professional UI**: Custom themed components with consistent design language

## 🛠️ Tech Stack

- **Frontend Framework**: React Native with Expo
- **Navigation**: React Navigation (Bottom Tabs, Native Stack, Stack)
- **Authentication & Database**: Firebase (Firestore)
- **State Management**: React Hooks
- **Storage**: AsyncStorage for local persistence
- **Styling**: React Native built-in components with theme system

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or pnpm package manager
- Expo CLI
- Firebase account and project setup

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Muhammad-Ali006/Quick-Bite-Project.git
cd QuickBite-main
```

### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Or using npm:
```bash
npm install
```

### 3. Configure Firebase

Update your Firebase configuration in `src/config/firebase.js` with your Firebase project credentials:

```javascript
// src/config/firebase.js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 4. Start the Development Server

```bash
pnpm start
```

### 5. Run on Different Platforms

**Android:**
```bash
pnpm android
```

**iOS:**
```bash
pnpm ios
```

**Web:**
```bash
pnpm web
```

## 📁 Project Structure

```
QuickBite-main/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── CustomButton.js
│   │   ├── CustomHeader.js
│   │   ├── FoodCard.js
│   │   └── SearchBar.js
│   ├── config/              # Configuration files
│   │   └── firebase.js
│   ├── constants/           # App constants
│   │   ├── colors.js
│   │   └── theme.js
│   ├── navigation/          # Navigation setup
│   │   └── AppNavigator.js
│   ├── screens/             # Screen components
│   │   ├── DashboardScreen.js
│   │   ├── FavoritesScreen.js
│   │   ├── FoodDetailScreen.js
│   │   ├── HomeScreen.js
│   │   ├── LoginScreen.js
│   │   ├── OrdersScreen.js
│   │   ├── SignupScreen.js
│   │   ├── SplashScreen.js
│   │   └── WelcomeScreen.js
│   └── services/            # Business logic & API calls
│       ├── api.js
│       ├── authService.js
│       ├── favoritesService.js
│       └── orderService.js
├── assets/                  # App assets (images, fonts)
├── App.js                   # Root component
├── app.json                 # Expo configuration
├── package.json
└── README.md
```

## 🔑 Key Features Breakdown

### Authentication (`src/services/authService.js`)
- User registration and login
- Real-time authentication state management
- Firebase authentication integration

### Favorites Management (`src/services/favoritesService.js`)
- Save/unsave favorite food items
- Persistent storage with AsyncStorage
- Quick access to favorite items

### Order Management (`src/services/orderService.js`)
- Place orders
- View order history
- Track order status

### Navigation Flow
- Splash Screen → Welcome/Login → Dashboard with Bottom Tab Navigation
- Screens: Home, Food Details, Favorites, Orders, Profile

## 🔐 Firestore Rules

Security rules are configured in `firestore.rules` to ensure data protection and user privacy.

## 🎨 Customization

### Theme Configuration
Modify `src/constants/theme.js` and `src/constants/colors.js` to customize the app's appearance:

```javascript
// src/constants/colors.js
export const colors = {
  primary: "#FF6B35",
  secondary: "#004E89",
  // ... more colors
};
```

## 📦 Dependencies

- `@react-navigation/*`: Navigation libraries
- `firebase`: Backend and authentication
- `expo-*`: Expo SDK modules
- `react-native-*`: Native modules
- `@react-native-async-storage/async-storage`: Local storage

## 🐛 Troubleshooting

### Build Issues
```bash
# Clear cache and reinstall
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

### Firebase Connection
- Verify Firebase config is correctly set up
- Ensure Firestore database rules are properly configured
- Check network connectivity

### Expo Issues
```bash
# Clear Expo cache
expo start -c
```

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Developer

**Muhammad Ali**
- GitHub: [@Muhammad-Ali006](https://github.com/Muhammad-Ali006)

## 🤝 Contributing

Contributions are welcome! Feel free to submit pull requests or open issues for bug reports and feature requests.

## 📞 Support

For questions or support, please open an issue on the GitHub repository.

---

**Made with ❤️ by Muhammad Ali**
