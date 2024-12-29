import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedCardsScreen = ({ navigation, route }) => {
    const { chargerInfo } = route.params;
    const [savedCards, setSavedCards] = useState([]);

    useEffect(() => {
        const fetchCards = async () => {
            const cards = await AsyncStorage.getItem('savedCards');
            setSavedCards(cards ? JSON.parse(cards) : []);
        };
        fetchCards();
    }, []);

    const handlePayment = (card) => {
        Alert.alert('Pagamento Confirmado!', `Cartão: **** **** **** ${card.cardNumber.slice(-4)}`);
        navigation.navigate('PaymentOptions', { chargerInfo });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Escolha um Cartão Salvo:</Text>
            <FlatList
                data={savedCards}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <Text>**** **** **** {item.cardNumber.slice(-4)}</Text>
                        <Button title="Usar Este Cartão" onPress={() => handlePayment(item)} />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    card: {
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
});

export default SavedCardsScreen;

