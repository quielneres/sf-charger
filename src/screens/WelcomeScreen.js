import React, { useContext, useEffect } from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import { Text, Button, Layout } from '@ui-kitten/components'; // UI Kitten components
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../utils/colors'; // Manter suas cores, se necessário

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate("HOME");
        }
    }, [isLoggedIn, navigation]);

    const handleLogin = () => {
        navigation.navigate("LOGIN");
    };

    const handleSignup = () => {
        navigation.navigate("SIGNUP");
    };

    return (
      <Layout style={styles.container}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Image source={require("../assets/3173433.jpg")} style={styles.bannerImage} />
          <Text style={styles.title}>Seu recurso para carregamento</Text>
          <Button
            style={styles.button}
            appearance="ghost"
            status="basic"
            onPress={() => navigation.navigate("HOME")}
          >
              Continuar sem login
          </Button>

          <View style={styles.buttonContainer}>

              <Button
                style={styles.button}
                onPress={handleSignup}
              >
                  Crie uma conta
              </Button>


              <TouchableOpacity onPress={handleLogin}>
                  <Text style={{ textAlign: 'center', color: colors.primary, marginTop: 10 }}>
                      Já tem uma conta? Entrar
                  </Text>
              </TouchableOpacity>

          </View>
      </Layout>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        height: 40,
        width: 140,
        marginVertical: 30,
    },
    bannerImage: {
        marginVertical: 20,
        height: 250,
        width: 231,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '80%',
        marginTop: 10,
    },
    button: {
        marginVertical: 10,
        borderRadius: 5,
    },
});
