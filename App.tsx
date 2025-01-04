import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './src/context/AuthContext';

import firebase from '@react-native-firebase/app';


import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from "./src/screens/auth/LoginScreen";
import SignupScreen from "./src/screens/auth/SignupScreen";
import HomeScreen from "./src/screens/HomeScreen";
import ChargerDetailsScreen from "./src/screens/charger/ChargerDetailsScreen";
import ChargingScreen from "./src/screens/charger/ChargingScreen";
import PaymentScreen from "./src/screens/payment/PaymentScreen";
import PaymentOptionsScreen from "./src/screens/payment/PaymentOptionsScreen";
import PaymentPixScreen from "./src/screens/payment/PaymentPixScreen";
import CreateCardScreen from "./src/screens/profile/CreateCardScreen";
import SavedCardsScreen from "./src/screens/profile/SavedCardsScreen";
import ProfileScreen from "./src/screens/profile/ProfileScreen";
import CardListScreen from "./src/screens/profile/CardListScreen";
import EditProfileScreen from './src/screens/profile/EditProfileScreen';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    console.log("Firebase initialized:", firebase.apps.length > 0);
  }, []);

  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WELCOME" component={WelcomeScreen} />
          <Stack.Screen name="LOGIN" component={LoginScreen} />
          <Stack.Screen name="SIGNUP" component={SignupScreen} />
          <Stack.Screen name="HOME" component={HomeScreen} />
          <Stack.Screen name="CHARGER" component={ChargerDetailsScreen} />
          <Stack.Screen name="CHARGING" component={ChargingScreen} />
          <Stack.Screen name="Payment" component={PaymentScreen} />
          <Stack.Screen name="PaymentOptions" component={PaymentOptionsScreen} />
          <Stack.Screen name="PaymentPix" component={PaymentPixScreen} />
          <Stack.Screen name="CreateCard" component={CreateCardScreen} />
          <Stack.Screen name="SavedCards" component={SavedCardsScreen} />
          <Stack.Screen name="PROFILE" component={ProfileScreen} />
          <Stack.Screen name="CARDLIST" component={CardListScreen} />
          <Stack.Screen name="EDIT_PROFILE" component={EditProfileScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};

export default App;
