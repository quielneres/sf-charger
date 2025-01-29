import React, { useState } from 'react';
import {Text, StyleSheet} from 'react-native';
import {Button, Layout} from "@ui-kitten/components";
import {Header} from "../../components/Header";
import {ChargerStatus} from "../../components/ChargerStatus";
import {InfoCard} from "../../components/InfoCard";
import ChargerService from "../../services/ChargerService";
import { useCharger } from '../../context/ChargerContext';

export const ChargerDetailsScreen = ({ navigation, route }) => {
    const { chargerId } = route.params; // Recebe o ID do carregador vindo do HomeScreen
    const { status, setStatus } = useCharger(); // Status inicial do carregador

    const handleStartCharging = () => {
        ChargerService.startTransaction(1, 'USER_123');
        setStatus('Charging');
        alert('Carregamento iniciado!');
        navigation.navigate('ChargingMonitor');
    };

    const handleStopCharging = () => {
        ChargerService.stopTransaction('TX_001', 10.5);
        setStatus('Idle');
        alert('Carregamento parado!');
    };

    return (
        <Layout style={styles.container}>
            <Header title={`Carregador: ${chargerId}`} onBackPress={() => navigation.goBack()} />

            {/* Status do Carregador */}
            <ChargerStatus status={status} />

            {/* Botão para Navegar para Modos de Carregamento */}
            <Button
                style={styles.button}
                onPress={() => navigation.navigate('ChargingModes')}
            >
                Selecionar Modo de Carregamento
            </Button>

            {/* Botões de Controle de Carregamento */}
            <Layout style={styles.buttonContainer}>
                <Button
                    style={[styles.actionButton, { backgroundColor: '#34C759' }]}
                    onPress={handleStartCharging}
                >
                    Iniciar Carregamento (Fast Mode)
                </Button>
                <Button
                    style={[styles.actionButton, { backgroundColor: '#FF3B30' }]}
                    onPress={handleStopCharging}
                >
                    Parar Carregamento
                </Button>
            </Layout>

            {/* Informações Adicionais */}
            <Layout style={styles.infoContainer}>
                <InfoCard
                    title="Modelo"
                    description="THOR-40kW"
                    iconName="flash-outline"
                />
                <InfoCard
                    title="Localização"
                    description="Rua Principal, 101"
                    iconName="pin-outline"
                />
                <InfoCard
                    title="Última Sessão"
                    description="2h de carregamento, 70 kWh"
                    iconName="clock-outline"
                />
            </Layout>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    button: { marginVertical: 16 },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
    actionButton: { flex: 1, marginHorizontal: 4, borderRadius: 8 },
    infoContainer: { marginTop: 16 },
});
