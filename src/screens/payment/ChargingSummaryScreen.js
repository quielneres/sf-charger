import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { Header } from '../../components/Header';
import {StyleSheet} from "react-native";
import {useNavigation} from "@react-navigation/native";

export const ChargingSummaryScreen = ({ navigation, route }) => {
    const { energy, totalTime, cost } = route.params; // Recebe os dados do carregamento
    // const navigation = useNavigation();

    const chargerInfo = {
        id: 2,
        name: 'Eletroposto Sol Fort',
        latitude: -15.6008448,
        longitude: -47.6839936,
        description: 'Eletroposto Sol Fort Plug Charger',
    };


    const handlePayment = () => {
        // Redireciona para o gateway de pagamento
        alert('Iniciando processo de pagamento...');
        navigation.navigate('PaymentOptions', {chargerInfo});

        // Aqui você pode chamar uma função para integrar com PagSeguro ou Pagar.me
    };

    return (
        <Layout style={styles.container}>
            <Header title="Resumo do Carregamento" onBackPress={() => navigation.goBack()} />

            <Layout style={styles.content}>
                <Text category="h5" style={styles.label}>Resumo do Carregamento</Text>

                <Layout style={styles.infoContainer}>
                    <Text category="h6">Energia Carregada</Text>
                    <Text category="s1">{energy.toFixed(2)} kWh</Text>
                </Layout>

                <Layout style={styles.infoContainer}>
                    <Text category="h6">Tempo Total</Text>
                    <Text category="s1">{totalTime} minutos</Text>
                </Layout>

                <Layout style={styles.infoContainer}>
                    <Text category="h6">Custo Final</Text>
                    <Text category="s1">R$ {cost.toFixed(2)}</Text>
                </Layout>

                <Button style={styles.button} onPress={handlePayment}>
                    Pagar Agora
                </Button>
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    content: { flex: 1, padding: 16 },
    label: { textAlign: 'center', marginBottom: 16 },
    infoContainer: {
        alignItems: 'center',
        marginVertical: 16,
        padding: 16,
        backgroundColor: '#F7F9FC',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#E4E9F2',
    },
    button: { marginTop: 24 },
});
