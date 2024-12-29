
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
// import firestore from '@react-native-firebase/firestore';
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

const SignupScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);

    const handleGoBack = () => {
        navigation.goBack();
    };

    const handleLogin = () => {
        navigation.navigate("LOGIN");
    };

    const signup = async () => {

        navigation.navigate("LOGIN");

        // try {
        //     const usersCollection = firestore().collection('users');
        //     const userSnapshot = await usersCollection.where('email', '==', email).get();
        //
        //     if (!userSnapshot.empty) {
        //         Alert.alert('Erro', 'Usuário já cadastrado');
        //     } else {
        //         await usersCollection.add({ email, password });
        //         Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
        //         navigation.navigate("LOGIN");
        //     }
        // } catch (error) {
        //     console.error('Erro ao cadastrar usuário:', error);
        //     Alert.alert('Erro', 'Não foi possível cadastrar o usuário');
        // }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
                <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Vamos começar</Text>
            </View>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Entre com seu e-mail"
                        placeholderTextColor={colors.secondary}
                        keyboardType="email-address"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Entre com sua senha"
                        placeholderTextColor={colors.secondary}
                        secureTextEntry={secureEntry}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>
                        <SimpleLineIcons name={"eye"} size={20} color={colors.secondary} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.signupButtonWrapper} onPress={signup}>
                    <Text style={styles.signupText}>Cadastrar</Text>
                </TouchableOpacity>
                <Text style={styles.continueText}>ou continue com</Text>
                <TouchableOpacity style={styles.googleButtonContainer}>
                    <Text style={styles.googleText}>Google</Text>
                </TouchableOpacity>
                <View style={styles.footerContainer}>
                    <Text style={styles.accountText}>Já tem uma conta?</Text>
                    <TouchableOpacity onPress={handleLogin}>
                        <Text style={styles.loginText}>Entrar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

export default SignupScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        padding: 20,
    },
    backButtonWrapper: {
        height: 40,
        width: 40,
        backgroundColor: colors.gray,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        marginVertical: 20,
    },
    headingText: {
        fontSize: 32,
        color: colors.primary,
        fontFamily: fonts.SemiBold,
    },
    formContainer: {
        marginTop: 20,
    },
    inputContainer: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 7,
        paddingHorizontal: 20,
        flexDirection: "row",
        alignItems: "center",
        padding: 2,
        marginVertical: 10,
    },
    textInput: {
        flex: 1,
        paddingHorizontal: 10,
        fontFamily: fonts.Light,
    },
    signupButtonWrapper: {
        backgroundColor: colors.primary,
        borderRadius: 7,
        marginTop: 20,
    },
    signupText: {
        color: colors.white,
        fontSize: 20,
        fontFamily: fonts.SemiBold,
        textAlign: "center",
        padding: 10,
    },
    continueText: {
        textAlign: "center",
        marginVertical: 20,
        fontSize: 14,
        fontFamily: fonts.Regular,
        color: colors.primary,
    },
    googleButtonContainer: {
        flexDirection: "row",
        borderWidth: 2,
        borderColor: colors.primary,
        borderRadius: 7,
        justifyContent: "center",
        alignItems: "center",
        padding: 10,
        gap: 10,
    },
    googleText: {
        fontSize: 20,
        fontFamily: fonts.SemiBold,
    },
    footerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 5,
    },
    accountText: {
        color: colors.primary,
        fontFamily: fonts.Regular,
    },
    loginText: {
        color: colors.primary,
        fontFamily: fonts.Bold,
    },
});
