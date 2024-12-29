import React, { useEffect, useState } from 'react';
import { View, Text, Button, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';

const PaymentScreen = ({ route }) => {
    const { chargerInfo } = route.params; // Dados do carregador
    const [paymentLink, setPaymentLink] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Função para gerar o link de pagamento
        const createPayment = async () => {
            try {
                // Substitua pelos dados corretos da sua conta na Pagar.me
                const apiKey = 'pk_test_zmaD9kvefmty4YZO';
                const response = await axios.post(
                    'https://api.pagar.me/core/v5/orders',
                    {
                        customer: {
                            name: 'Cliente Teste',
                            email: 'cliente@email.com',
                            phones: {
                                mobile_phone: {
                                    country_code: '55',
                                    area_code: '11',
                                    number: '999999999',
                                },
                            },
                        },
                        items: [
                            {
                                name: 'Recarga de Carro Elétrico',
                                quantity: 1,
                                unit_price: 5000, // Valor em centavos (R$50,00)
                            },
                        ],
                        payments: [
                            {
                                payment_method: 'pix', // Método de pagamento PIX
                            },
                        ],
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Basic ${btoa(apiKey + ':')}`,
                        },
                    }
                );

                // Obtendo o link de pagamento PIX
                const qrCodeLink = response.data.charges[0].last_transaction.qr_code_url;
                setPaymentLink(qrCodeLink);
                setLoading(false); // Finaliza o carregamento
            } catch (error) {
                console.error('Erro ao criar pagamento:', error);
                Alert.alert('Erro', 'Não foi possível criar o pagamento.');
                setLoading(false);
            }
        };

        createPayment();
    }, []);

    const handlePaymentConfirmation = () => {
        Alert.alert('Pagamento Confirmado!', 'Obrigado por utilizar nossos serviços.');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Pagamento</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#007BFF" />
            ) : paymentLink ? (
                <>
                    <QRCode value={paymentLink} size={200} />
                    <Text style={styles.instruction}>
                        Escaneie o QR Code para realizar o pagamento.
                    </Text>
                </>
            ) : (
                <Text>Erro ao carregar QR Code.</Text>
            )}
            <Button title="Confirmar Pagamento" onPress={handlePaymentConfirmation} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    instruction: {
        marginTop: 16,
        textAlign: 'center',
        fontSize: 16,
    },
});

export default PaymentScreen;
