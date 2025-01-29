import React, { useEffect, useState } from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import ChargerService from "../../services/ChargerService";
import {ChargerStatus} from "../../components/ChargerStatus";

export const ChargerDetailsScreen = ({ route, navigation }) => {
    const { chargerId } = route.params; // ID do carregador vindo da HomeScreen
    const [status, setStatus] = useState(ChargerService.getStatus());

    useEffect(() => {
        // Conecta ao carregador selecionado
        ChargerService.connect();

        // Atualiza o status conforme mudanças no WebSocket
        const handleStatusChange = (newStatus) => setStatus(newStatus);
        ChargerService.on('statusChanged', handleStatusChange);

        // Limpa conexões ao desmontar
        return () => {
            ChargerService.disconnect();
            ChargerService.off('statusChanged', handleStatusChange);
        };
    }, [chargerId]);

    return (
        <Layout style={styles.container}>
            <Text category="h1" style={styles.title}>
                {chargerId}
            </Text>
            <ChargerStatus status={status.status} />
            <Text style={styles.lastPing}>Último Ping: {status.lastPing || '---'}</Text>
            <Button style={styles.button} onPress={() => navigation.navigate('ChargingModes')}>
                Configurar Modo de Carregamento
            </Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    title: { textAlign: 'center', marginBottom: 16 },
    lastPing: { textAlign: 'center', marginVertical: 16 },
    button: { marginTop: 16, alignSelf: 'center', width: '80%' },
});
