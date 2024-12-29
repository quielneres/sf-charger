import React, { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from "@react-navigation/native";
import BackButton from "../../components/BackButton";


const PaymentOptionsScreen = ({  route }) => {
    const { chargerInfo } = route.params;
    const [hasSavedCard, setHasSavedCard] = useState(false);
    const navigation = useNavigation();


    // Verifica se há cartões salvos
    useEffect(() => {
        const checkSavedCards = async () => {
            const savedCards = await AsyncStorage.getItem('savedCards');
            setHasSavedCard(savedCards !== null);
        };
        checkSavedCards();
    }, []);

    return (
        <View style={styles.container}>
            <BackButton />

            <Text style={styles.title}>Escolha o método de pagamento:</Text>
            <Button
                title="Pagar com PIX"
                onPress={() => navigation.navigate('PaymentPix', { chargerInfo })}
            />
            {hasSavedCard && (
                <Button
                    title="Pagar com Cartão Salvo"
                    onPress={() => navigation.navigate('SavedCards', { chargerInfo })}
                />
            )}
            <Button
                title="Cadastrar Novo Cartão"
                onPress={() => navigation.navigate('PaymentCard', { chargerInfo })}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
});

export default PaymentOptionsScreen;
