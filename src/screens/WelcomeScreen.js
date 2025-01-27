import React, { useContext, useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { colors } from '../utils/colors';

const WelcomeScreen = () => {
    const navigation = useNavigation();
    const { isLoggedIn } = useContext(AuthContext);

    useEffect(() => {
        if (isLoggedIn) {
            navigation.navigate('HOME');
        }
    }, [isLoggedIn, navigation]);

    const handleLogin = () => {
        navigation.navigate('LOGIN');
    };

    const handleSignup = () => {
        navigation.navigate('SIGNUP');
    };

    const handleGoogleLogin = () => {
        console.log('Login com Google');
    };

    const handleAppleLogin = () => {
        console.log('Login com Apple');
    };

    return (
        <Layout style={styles.container}>
            {/* Logo */}
            <Image source={require('../assets/logo-sol-fort.png')} style={styles.logo} />

            {/* Banner */}
            <Image source={require('../assets/3173433.jpg')} style={styles.bannerImage} />

            {/* Título */}
            <Text category="h5" style={styles.title}>
                O seu recurso para carregamento
            </Text>

            {/* Botões Login e Cadastro */}
            <View style={styles.authContainer}>
                <Button style={styles.authButton} onPress={handleLogin}>
                    Login
                </Button>

                <TouchableOpacity onPress={handleSignup}>
                    <Text style={styles.signupText}>Criar conta</Text>
                </TouchableOpacity>
            </View>

            {/* Botões de Redes Sociais */}
            <View style={styles.socialButtonsContainer}>
                <Button
                    style={[styles.socialButton, styles.googleButton]}
                    appearance="outline"
                    accessoryLeft={(props) => <Icon {...props} name="google-outline" />}
                    onPress={handleGoogleLogin}
                >
                    Google
                </Button>

                <Button
                    style={[styles.socialButton, styles.appleButton]}
                    appearance="outline"
                    accessoryLeft={(props) => <Icon {...props} name="car-outline" />}
                    onPress={handleAppleLogin}
                >
                    Apple
                </Button>
            </View>

            {/* Botão Continuar sem Login */}
            <Button
                style={styles.continueButton}
                appearance="ghost"
                onPress={() => navigation.navigate('HOME')}
            >
                Continuar sem login
            </Button>


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
        paddingHorizontal: 20,
    },
    logo: {
        height: 50,
        width: 240,
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
        textAlign: 'center',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '90%',
        marginBottom: 20,
    },
    socialButton: {
        flex: 1,
        marginHorizontal: 5,
        borderRadius: 5,
        // height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
    googleButton: {
        borderColor: '#DB4437',
    },
    appleButton: {
        borderColor: '#000000',
    },
    continueButton: {
        marginBottom: 20,
        alignSelf: 'center',
    },
    authContainer: {
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
        marginBottom: 50,
    },
    authButton: {
        width: '90%',
        borderRadius: 5,
        height: 45,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.primary,
        marginBottom: 10,
    },
    signupText: {
        color: colors.primary,
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
    },
});
