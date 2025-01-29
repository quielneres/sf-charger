import React, { useEffect, useState } from 'react';
import { Layout, Text, Button, Icon } from '@ui-kitten/components';
import {Header} from "../../components/Header";
import {StyleSheet} from "react-native";
import { useCharger } from '../../context/ChargerContext'; // Importa o contexto


export const ChargingMonitorScreen = ({ navigation }) => {
    const [energy, setEnergy] = useState(0); // Energia carregada (kWh)
    const [cost, setCost] = useState(0); // Custo acumulado
    const [timeLeft, setTimeLeft] = useState(30); // Tempo restante (minutos)
    const { setStatus } = useCharger();
    // Simula atualizações de carregamento
    useEffect(() => {
        const interval = setInterval(() => {
            setEnergy((prev) => prev + 0.5); // Incrementa 0.5 kWh
            setCost((prev) => prev + 0.1); // Incrementa o custo acumulado
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0)); // Decrementa o tempo restante
        }, 1000);

        return () => clearInterval(interval); // Limpa o intervalo ao desmontar
    }, []);

    const handleStopCharging = () => {
        setStatus('Idle');
        alert('Carregamento parado!');
        // navigation.goBack(); // Retorna à tela anterior

        navigation.navigate('ChargingSummary', {
            energy: 10.5, // Energia carregada em kWh
            totalTime: 60, // Tempo total em minutos
            cost: 25.00, // Custo final em reais
        });
    };

    return (
        <Layout style={styles.container}>
            {/* Top Navigation */}
            <Header title="Charging Monitor" onBackPress={() => navigation.goBack()} />

            {/* Conteúdo Principal */}
            <Layout style={styles.content}>
                <Text category="h5" style={styles.label}>
                    Monitoramento do Carregamento
                </Text>

                <Layout style={styles.infoContainer}>
                    <Icon style={styles.icon} name="flash-outline" fill="#3366FF" />
                    <Text category="h6">Energia Carregada</Text>
                    <Text category="s1">{energy.toFixed(2)} kWh</Text>
                </Layout>

                <Layout style={styles.infoContainer}>
                    <Icon style={styles.icon} name="credit-card-outline" fill="#3366FF" />
                    <Text category="h6">Custo Acumulado</Text>
                    <Text category="s1">${cost.toFixed(2)}</Text>
                </Layout>

                <Layout style={styles.infoContainer}>
                    <Icon style={styles.icon} name="clock-outline" fill="#3366FF" />
                    <Text category="h6">Tempo Restante</Text>
                    <Text category="s1">
                        {timeLeft > 0 ? `${timeLeft} min` : 'Concluído'}
                    </Text>
                </Layout>

                {/* Botão Parar Carregamento */}
                <Button
                    style={styles.button}
                    status="danger"
                    onPress={handleStopCharging}
                >
                    Parar Carregamento
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
    icon: { width: 32, height: 32, marginBottom: 8 },
    button: { marginTop: 24 },
});
