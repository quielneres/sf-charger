import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text, Button, Layout } from '@ui-kitten/components'; // UI Kitten components
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../utils/colors'; // Manter suas cores, se necessário

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const { isLoggedIn } = useContext(AuthContext);

    // useEffect(() => {
    //     if (isLoggedIn) {
    //         navigation.navigate("HOME");
    //     }
    // }, [isLoggedIn, navigation]);

    const handleLogin = () => {
        navigation.navigate("LOGIN");
    };

    const handleSignup = () => {
        navigation.navigate("SIGNUP");
    };

    return (
      <Layout style={styles.container}>
          <Image source={require("../assets/logo.png")} style={styles.logo} />
          <Image source={require("../assets/man.png")} style={styles.bannerImage} />
          <Text style={styles.title}>Lorem ipsum dolor.</Text>
          <Button
            style={styles.button}
            appearance="outline"
            status="basic"
            onPress={() => navigation.navigate("HOME")}
          >
              Continuar sem login
          </Button>

          <View style={styles.buttonContainer}>
              <Button
                onPress={handleLogin}
              >
                  Entrar
              </Button>
              <Button
                style={styles.button}
                onPress={handleSignup}
              >
                  Cadastrar-se
              </Button>
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
        fontSize: 30,
        fontWeight: 'bold',
        color: colors.primary,
        marginBottom: 20,
    },
    buttonContainer: {
        width: '80%',
        marginTop: 30,
    },
    button: {
        marginVertical: 10,
        borderRadius: 5,
    },
});
