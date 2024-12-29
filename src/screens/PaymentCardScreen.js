import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BackButton from "../components/BackButton";

import {useNavigation} from "@react-navigation/native";



const PaymentCardScreen = ({ route }) => {
    const { chargerInfo } = route.params;
    const [cardNumber, setCardNumber] = useState('');
    const [holderName, setHolderName] = useState('');
    const [expirationDate, setExpirationDate] = useState('');
    const [cvv, setCvv] = useState('');

    const navigation = useNavigation();
    

    console.log('chargerInfo', chargerInfo);
    

    const saveCard = async () => {
        const newCard = { cardNumber, holderName, expirationDate, cvv };
        try {
            let savedCards = await AsyncStorage.getItem('savedCards');
            savedCards = savedCards ? JSON.parse(savedCards) : [];
            savedCards.push(newCard);
            await AsyncStorage.setItem('savedCards', JSON.stringify(savedCards));
            Alert.alert('Sucesso', 'Cartão salvo com sucesso!');

            if (chargerInfo) {
                navigation.navigate('PaymentOptions', { chargerInfo });
            } else { 
                navigation.goBack();
            }
        } catch (error) {
            console.error('Erro ao salvar cartão:', error);
            Alert.alert('Erro', 'Não foi possível salvar o cartão.');
        }
    };

    return (
        <View style={styles.container}>
                            <BackButton/>
            
            <Text style={styles.title}>Cadastrar Novo Cartão</Text>
            <TextInput
                style={styles.input}
                placeholder="Número do Cartão"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
            />
            <TextInput
                style={styles.input}
                placeholder="Nome do Titular"
                value={holderName}
                onChangeText={setHolderName}
            />
            <TextInput
                style={styles.input}
                placeholder="MM/AA"
                value={expirationDate}
                onChangeText={setExpirationDate}
            />
            <TextInput
                style={styles.input}
                placeholder="CVV"
                keyboardType="numeric"
                value={cvv}
                onChangeText={setCvv}
            />
            <Button title="Salvar Cartão" onPress={saveCard} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
    },
});

export default PaymentCardScreen;
