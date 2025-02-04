import React, {useContext, useEffect} from 'react';
import { StyleSheet, View, Image, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {AuthContext} from "../context/AuthContext";

const SplashScreen = () => {
  const navigation = useNavigation();

  const {isLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      isLoggedIn ? navigation.navigate('HOME') : navigation.navigate('WELCOME');
    }, 300);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
      <View style={styles.container}>
        <Image
            source={require('../assets/logo-sol-fort.png')}
            style={styles.logo}
        />
        {/*<ActivityIndicator size="large" color="#007AFF" />*/}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 150,
    height: 60,
    marginBottom: 20,
  },
});

export default SplashScreen;
