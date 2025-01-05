import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { colors } from "../../utils/colors";
import { fonts } from "../../utils/fonts";

const CardListScreen = () => {
    const navigation = useNavigation();
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            try {
                const storedCards = await AsyncStorage.getItem('savedCards');
                const cards = storedCards ? JSON.parse(storedCards) : [];
                setCards(cards);
            } catch (error) {
                console.error('Erro ao buscar cartões:', error);
            }
        };

        fetchCards();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.cardContainer}>
            <Text style={styles.cardText}>Número do Cartão: {item.cardNumber}</Text>
            <Text style={styles.cardText}>Nome no Cartão: {item.holderName}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButtonWrapper} onPress={() => navigation.goBack()}>
                <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
            </TouchableOpacity>
            <View style={styles.textContainer}>
                <Text style={styles.headingText}>Meus Cartões</Text>
            </View>
            <FlatList
                data={cards}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.listContainer}
            />
            <TouchableOpacity
                style={styles.addButtonWrapper}
                onPress={() => navigation.navigate('PaymentCard', {})}
            >
                <Text style={styles.addButtonText}>Adicionar Novo Cartão</Text>
            </TouchableOpacity>
        </View>
    );
};

export default CardListScreen;

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
    listContainer: {
        marginTop: 20,
    },
    cardContainer: {
        borderWidth: 1,
        borderColor: colors.secondary,
        borderRadius: 7,
        padding: 20,
        marginVertical: 10,
    },
    cardText: {
        fontSize: 16,
        fontFamily: fonts.Regular,
        color: colors.secondary,
    },
    addButtonWrapper: {
        backgroundColor: colors.primary,
        borderRadius: 7,
        marginTop: 20,
        padding: 15,
        alignItems: 'center',
    },
    addButtonText: {
        color: colors.white,
        fontSize: 20,
        fontFamily: fonts.SemiBold,
    },
});