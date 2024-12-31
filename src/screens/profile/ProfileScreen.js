    import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Alert, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import firestore from '@react-native-firebase/firestore';
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const usersCollection = firestore().collection('users');
                const userSnapshot = await usersCollection.get();
                const users = userSnapshot.docs.map(doc => doc.data());
                // Supondo que o primeiro usuário seja o logado
                setUser(users[0]);
            } catch (error) {
                console.error('Erro ao buscar usuário:', error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('users');
            Alert.alert('Sucesso', 'Logout realizado com sucesso');
            navigation.navigate("LOGIN");
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
            Alert.alert('Erro', 'Não foi possível fazer logout');
        }
    };

    return (
      <View style={styles.container}>
          <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
              <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
          </TouchableOpacity>
          <View style={styles.textContainer}>
              <Text style={styles.headingText}>Perfil</Text>
          </View>
          {user ? (
            <View style={styles.profileContainer}>
                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>
                <TouchableOpacity style={styles.logoutButtonWrapper} onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
          ) : (
            <Text>Carregando...</Text>
          )}
      </View>
    );
};

export default ProfileScreen;

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
    profileContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontFamily: fonts.SemiBold,
        color: colors.primary,
    },
    value: {
        fontSize: 16,
        fontFamily: fonts.Regular,
        color: colors.secondary,
        marginBottom: 20,
    },
    logoutButtonWrapper: {
        backgroundColor: colors.primary,
        borderRadius: 7,
        marginTop: 20,
    },
    logoutText: {
        color: colors.white,
        fontSize: 20,
        fontFamily: fonts.SemiBold,
        textAlign: "center",
        padding: 10,
    },
});
