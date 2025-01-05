import React, {useEffect, useState} from 'react';
import {View, Text, Button, StyleSheet, Alert, ActivityIndicator, TouchableOpacity} from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import {useNavigation} from "@react-navigation/native";
import {Buffer} from 'buffer';
import Ionicons from "react-native-vector-icons/Ionicons";
import {colors} from "../utils/colors";
import BackButton from "../../components/BackButton"; // Importa o polyfill do buffer
global.Buffer = global.Buffer || Buffer;

const API_SECRET_KEY = 'sk_test_f47318ced13b44b1a987f089ea10ee63'; // Chave secreta para teste
const API_BASE_URL = 'https://api.pagar.me/core/v5';

const PaymentPixScreen = ({route}) => {
    const {chargerInfo} = route.params; // Informações do carregador
    const [pixCode, setPixCode] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expiration, setExpiration] = useState('');

    const navigation = useNavigation();

    // Gera o código PIX assim que a tela carrega
    useEffect(() => {
        generatePixPayment();
    }, []);

    const generatePixPayment = async () => {
        try {
            // Faz requisição para criar o pagamento
            const response = await axios.post(
                `${API_BASE_URL}/orders`, // Endpoint da Pagar.me
                {
                    "items": [
                        {
                            "amount": 5000,
                            "description":  `Carregamento - ${chargerInfo.id}`,
                            "quantity": 1
                        }
                    ],
                    "customer": {
                        "name": "Cliente Teste",
                        "email": "cliente@email.com",
                        "type": "individual",
                        "document": "111111111111",
                        "phones": {
                            "home_phone": {
                                "country_code": "55",
                                "number": "22180513",
                                "area_code": "21"
                            }
                        }
                    },
                    "payments": [
                        {
                            "payment_method": "pix",
                            "pix": {
                                "expires_in": "3600"
                            }
                        }
                    ]
                },
                {
                    headers: {
                        Authorization: 'Basic ' + Buffer.from(`${API_SECRET_KEY}:`).toString('base64'),
                        'Content-Type': 'application/json',
                    },
                }
            );

            const paymentPix = response.data.charges[0].last_transaction.qr_code;
            const paymentAmount = (response.data.charges[0].amount / 100).toFixed(2).replace('.', ',');
            const paymentExpiration = new Date(response.data.charges[0].last_transaction.expires_at).toLocaleString('pt-BR');

            setPixCode(paymentPix); // Salva o código PIX gerado
            setAmount(`R$ ${paymentAmount}`);
            setExpiration(paymentExpiration);
            setLoading(false);
        } catch (err) {
            console.error('log do erro', err);
            setError('Erro ao gerar código PIX. Tente novamente.');
            setLoading(false);
        }
    };

    const confirmPayment = () => {
        Alert.alert('Pagamento Confirmado!', 'Seu pagamento via PIX foi recebido com sucesso!');
        navigation.navigate('PaymentOptions', {chargerInfo});
    };

    return (
        <View style={styles.container}>

            <BackButton />

            <View style={styles.header}>
                <Text style={styles.headerText}>Falta pouco!</Text>
                <Text style={styles.description}>
                    Use a informação abaixo para concluir o pagamento
                </Text>
                <Text style={styles.expiration}>Vencimento: {expiration}</Text>
            </View>

            <View style={styles.qrContainer}>
                {loading ? (
                    <ActivityIndicator size="large" />
                ) : error ? (
                    <Text style={styles.error}>{error}</Text>
                ) : (
                    <>
                        <QRCode value={pixCode} size={150} />
                        <TouchableOpacity>
                            <Text style={styles.copyText}>Copiar</Text>
                        </TouchableOpacity>
                        <Text style={styles.amount}>{amount}</Text>
                        <Text style={styles.pixText}>Pix</Text>
                    </>
                )}
            </View>

            <View style={styles.instructions}>
                <Text style={styles.instructionsTitle}>Como pagar?</Text>
                <Text style={styles.step}>
                    1. Entre no app ou site do seu banco e escolha a opção de pagamento via Pix.
                </Text>
                <Text style={styles.step}>
                    2. Escaneie o código QR ou copie e cole o código de pagamento.
                </Text>
                <Text style={styles.step}>
                    3. Pronto! O pagamento será creditado na hora e você receberá um e-mail de confirmação.
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#F9F9F9',
    },
    header: {
        alignItems: 'center',
        marginBottom: 20,
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    description: {
        textAlign: 'center',
        fontSize: 16,
        color: '#333',
        marginVertical: 10,
    },
    expiration: {
        color: 'green',
        fontWeight: 'bold',
    },
    qrContainer: {
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 10,
        marginBottom: 20,
        elevation: 5,
    },
    pixCode: {
        marginTop: 10,
        fontSize: 14,
        color: '#666',
    },
    copyText: {
        color: '#007BFF',
        fontWeight: 'bold',
        marginVertical: 10,
    },
    amount: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#333',
    },
    pixText: {
        fontSize: 16,
        color: '#666',
    },
    instructions: {
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        elevation: 5,
    },
    instructionsTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    step: {
        fontSize: 14,
        marginBottom: 8,
        color: '#333',
    },

});

export default PaymentPixScreen;
