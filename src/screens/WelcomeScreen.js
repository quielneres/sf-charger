import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, {useContext, useEffect} from 'react';
import { colors } from "../utils/colors";
import { fonts } from "../utils/fonts";
import { useNavigation } from "@react-navigation/native";
import {AuthContext} from '../context/AuthContext';

const WelcomeScreen = () => {

    const navigation = useNavigation();
    const {isLoggedIn} = useContext(AuthContext);

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
        <View style={styles.container}>
            <Image source={require("../assets/logo.png")} style={styles.logo} />
            <Image source={require("../assets/man.png")} style={styles.bannerImage} />
            <Text style={styles.title}>Lorem ipsum dolor.</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("HOME")}
            >
                <Text style={styles.subTitle}>
                    Continuar sem login
                </Text>
            </TouchableOpacity>


            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={[
                        styles.loginButtonWrapper,
                        { backgroundColor: colors.primary },
                    ]}
                    onPress={handleLogin}
                >
                    <Text style={styles.loginButtonText}>Entrar</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.loginButtonWrapper]}
                    onPress={handleSignup}
                >
                    <Text style={styles.signupButtonText}>Cadastra-se</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: "center",
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
        fontSize: 40,
        fontFamily: fonts.SemiBold,
        paddingHorizontal: 20,
        textAlign: "center",
        color: colors.primary,
        marginTop: 40,
    },
    subTitle: {
        fontSize: 18,
        paddingHorizontal: 20,
        textAlign: "center",
        color: colors.secondary,
        fontFamily: fonts.Medium,
        marginVertical: 20,
    },
    buttonContainer: {
        marginTop: 20,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: colors.primary,
        width: "80%",
        height: 60,
        borderRadius: 7,
    },
    loginButtonWrapper: {
        justifyContent: "center",
        alignItems: "center",
        width: "50%",
        borderRadius: 5,
    },
    loginButtonText: {
        color: colors.white,
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
    signupButtonText: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
    },
});
