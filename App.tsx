import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthProvider} from './src/context/AuthContext';
import {ApplicationProvider, IconRegistry} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import {EvaIconsPack} from '@ui-kitten/eva-icons';

import firebase from '@react-native-firebase/app';

import WelcomeScreen from './src/screens/WelcomeScreen';
import LoginScreen from './src/screens/auth/LoginScreen';
import SignupScreen from './src/screens/auth/SignupScreen';
import ChargerDetailsScreenBkp from './src/screens/charger/ChargerDetailsScreen-bkp';
import ChargingScreen from './src/screens/charger/ChargingScreen';
import PaymentScreen from './src/screens/payment/PaymentScreen';
import PaymentOptionsScreen from './src/screens/payment/PaymentOptionsScreen';
import PaymentPixScreen from './src/screens/payment/PaymentPixScreen';
import AddCardScreen from './src/screens/profile/AddCardScreen';
import SavedCardsScreen from './src/screens/profile/SavedCardsScreen';
import ProfileScreen from './src/screens/profile/ProfileScreen';
import CardListScreen from './src/screens/profile/CardListScreen';
import EditProfileScreen from './src/screens/profile/EditProfileScreen';
import DetailPaymentScreen from './src/screens/payment/DetailPaymentScreen';
import DetailSuccessfulScreen from './src/screens/payment/DetailSuccessfulScreen';
import SplashScreen from './src/screens/SplashScreen';
import {ChargerDetailsScreen} from "./src/screens/charger/ChargerDetailsScreen";
import {ChargingModesScreen} from "./src/screens/charger/ChargingModesScreen";
import {FastModeScreen} from "./src/screens/charger/FastModeScreen";
import {TimeReservationScreen } from "./src/screens/charger/TimeReservationScreen";
import {ChargingProgressScreen} from "./src/screens/charger/ChargingProgressScreen";
import HomeScreen from "./src/screens/HomeScreen";
import {CapacityReservationScreen} from "./src/screens/charger/CapacityReservationScreen";
import {ChargingMonitorScreen} from "./src/screens/charger/ChargingMonitorScreen";
import {ChargerProvider} from "./src/context/ChargerContext";
import {ChargingSummaryScreen} from "./src/screens/payment/ChargingSummaryScreen";

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    console.log('Firebase initialized:', firebase.apps.length > 0);
  }, []);

  return (
    <>
      <AuthProvider>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider {...eva} theme={eva.light}>
          <ChargerProvider>
          <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen name="SPLASH" component={SplashScreen} />

              <Stack.Screen name="WELCOME" component={WelcomeScreen} />
              <Stack.Screen name="LOGIN" component={LoginScreen} />
              <Stack.Screen name="SIGNUP" component={SignupScreen} />
              <Stack.Screen name="HOME" component={HomeScreen} />
              <Stack.Screen name="CHARGER" component={ChargerDetailsScreenBkp} />
              <Stack.Screen name="ChargerDetails" component={ChargerDetailsScreen} />
              <Stack.Screen name="CHARGING" component={ChargingScreen} />
              <Stack.Screen name="Payment" component={PaymentScreen} />
              <Stack.Screen
                name="PaymentOptions"
                component={PaymentOptionsScreen}
              />
              <Stack.Screen name="PaymentPix" component={PaymentPixScreen} />
              <Stack.Screen name="AddCard" component={AddCardScreen} />
              <Stack.Screen name="SavedCards" component={SavedCardsScreen} />
              <Stack.Screen
                name="DetailPayment"
                component={DetailPaymentScreen}
              />
              <Stack.Screen
                name="DetailSuccessful"
                component={DetailSuccessfulScreen}
              />
              <Stack.Screen name="PROFILE" component={ProfileScreen} />
              <Stack.Screen name="CARDLIST" component={CardListScreen} />
              <Stack.Screen name="EDIT_PROFILE" component={EditProfileScreen} />


              <Stack.Screen name="ChargingModes" component={ChargingModesScreen} />
              <Stack.Screen name="FastMode" component={FastModeScreen} />
              <Stack.Screen name="TimeReservation" component={TimeReservationScreen} />
              <Stack.Screen name="ChargingProgress" component={ChargingProgressScreen} />
              <Stack.Screen name="CapacityReservation" component={CapacityReservationScreen} />
              <Stack.Screen name="ChargingMonitor" component={ChargingMonitorScreen} />
              <Stack.Screen name="ChargingSummary" component={ChargingSummaryScreen} />
            </Stack.Navigator>
          </NavigationContainer>
          </ChargerProvider>
        </ApplicationProvider>
      </AuthProvider>
    </>
  );
};

export default App;
