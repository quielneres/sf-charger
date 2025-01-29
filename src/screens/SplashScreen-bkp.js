import React, {useContext, useEffect} from 'react';
import {View, Image, StyleSheet} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';

const SplashScreen = () => {
  const navigation = useNavigation();
  const {isLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      isLoggedIn ? navigation.navigate('HOME') : navigation.navigate('WELCOME');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/electric-power_7402743.png')}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 80,
    height: 80,
  },
});

export default SplashScreen;
