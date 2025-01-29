import React, { useEffect, useState } from 'react';
import { View, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { Buffer } from 'buffer';
import {
    Layout,
    TopNavigation,
    TopNavigationAction,
    Icon,
    Text,
    Card,
    Button,
    Spinner,
} from '@ui-kitten/components';

// Polyfill para o Buffer
global.Buffer = global.Buffer || Buffer;

const API_SECRET_KEY = 'sk_test_f47318ced13b44b1a987f089ea10ee63';
const API_BASE_URL = 'https://api.pagar.me/core/v5';

const PaymentPixScreen = ({ route }) => {
    const { chargerInfo } = route.params;
    const [pixCode, setPixCode] = useState('');
    const [amount, setAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [expiration, setExpiration] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
        generatePixPayment();
    }, []);

    const generatePixPayment = async () => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/orders`,
                {
                    items: [
                        {
                            amount: 5000,
                            description: `Carregamento - ${chargerInfo.id}`,
                            quantity: 1,
                        },
                    ],
                    customer: {
                        name: 'Cliente Teste',
                        email: 'cliente@email.com',
                        type: 'individual',
                        document: '111111111111',
                        phones: {
                            home_phone: {
                                country_code: '55',
                                number: '22180513',
                                area_code: '21',
                            },
                        },
                    },
                    payments: [
                        {
                            payment_method: 'pix',
                            pix: {
                                expires_in: '3600',
                            },
                        },
                    ],
                },
                {
                    headers: {
                        Authorization:
                            'Basic ' + Buffer.from(`${API_SECRET_KEY}:`).toString('base64'),
                        'Content-Type': 'application/json',
                    },
                }
            );

            const paymentPix = response.data.charges[0].last_transaction.qr_code;
            const paymentAmount = (response.data.charges[0].amount / 100)
                .toFixed(2)
                .replace('.', ',');
            const paymentExpiration = new Date(
                response.data.charges[0].last_transaction.expires_at
            ).toLocaleString('pt-BR');

            setPixCode(paymentPix);
            setAmount(`R$ ${paymentAmount}`);
            setExpiration(paymentExpiration);
            setLoading(false);
        } catch (err) {
            console.error('Erro ao gerar PIX:', err);
            setError('Erro ao gerar código PIX. Tente novamente.');
            setLoading(false);
        }
    };

    const BackIcon = (props) => (
        <Icon {...props} name="arrow-back" onPress={() => navigation.goBack()} />
    );
    const BackAction = () => <TopNavigationAction icon={BackIcon} />;

    return (
        <Layout style={styles.container}>
            <TopNavigation
                title="Pagamento via PIX"
                accessoryLeft={BackAction}
                alignment="center"
            />
            <Layout style={styles.content}>
                {/* Informações do Pagamento */}
                <Card style={styles.card}>
                    <Text category="h6" style={styles.headerText}>
                        Falta pouco!
                    </Text>
                    <Text category="s1" style={styles.description}>
                        Use o QR Code abaixo ou copie o código para realizar o pagamento.
                    </Text>
                    <Text category="c1" style={styles.expiration}>
                        Vencimento: {expiration}
                    </Text>
                </Card>

                {/* QR Code */}
                <Layout style={styles.qrContainer}>
                    {loading ? (
                        <Spinner size="large" />
                    ) : error ? (
                        <Text status="danger">{error}</Text>
                    ) : (
                        <>
                            <QRCode value={pixCode} size={150} />
                            <Button
                                appearance="ghost"
                                status="primary"
                                style={styles.copyButton}
                                onPress={() => {
                                    Alert.alert('Copiado!', 'O código foi copiado para a área de transferência.');
                                }}
                            >
                                Copiar Código
                            </Button>
                            <Text category="h6" style={styles.amount}>
                                {amount}
                            </Text>
                        </>
                    )}
                </Layout>

                {/* Instruções */}
                <Card style={styles.instructions}>
                    <Text category="h6" style={styles.instructionsTitle}>
                        Como pagar?
                    </Text>
                    <Text category="p1" style={styles.step}>
                        1. Abra o app ou site do seu banco e selecione Pix.
                    </Text>
                    <Text category="p1" style={styles.step}>
                        2. Escaneie o QR Code ou cole o código copiado.
                    </Text>
                    <Text category="p1" style={styles.step}>
                        3. Pronto! O pagamento será confirmado na hora.
                    </Text>
                </Card>
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F7F9FC',
    },
    content: {
        flex: 1,
        padding: 16,
    },
    card: {
        marginBottom: 20,
        borderRadius: 8,
    },
    headerText: {
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 8,
    },
    description: {
        textAlign: 'center',
        marginBottom: 8,
        color: '#6E6E6E',
    },
    expiration: {
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#34C759',
    },
    qrContainer: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 8,
        marginBottom: 16,
        elevation: 3,
    },
    copyButton: {
        marginTop: 10,
    },
    amount: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: 'bold',
    },
    instructions: {
        padding: 16,
        borderRadius: 8,
        elevation: 2,
    },
    instructionsTitle: {
        marginBottom: 10,
        fontWeight: 'bold',
    },
    step: {
        marginBottom: 6,
        color: '#333',
    },
});

export default PaymentPixScreen;
