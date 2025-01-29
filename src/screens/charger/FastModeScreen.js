import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import {Header} from "../../components/Header";
import ChargerService from "../../services/ChargerService";
import {useCharger} from "../../context/ChargerContext";

export const FastModeScreen = ({ navigation }) => {

    const { status, setStatus } = useCharger(); // Status inicial do carregador

    const handleStartCharging = () => {
        ChargerService.startTransaction(1, 'USER_123');
        setStatus('Charging');
        alert('Carregamento iniciado!');
        navigation.navigate('ChargingMonitor');
    };

    return (
      <Layout style={styles.container}>
        <Header title="Modo rápido" onBackPress={() => navigation.goBack()} />
        <Text style={styles.description}>
          Carregue seu carro na potência máxima. Ideal para quando você está com pressa!
        </Text>
        <Button
            style={styles.button}
            onPress={handleStartCharging}
        >
            Comece a carregar
        </Button>
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  description: { fontSize: 16, marginBottom: 32, textAlign: 'center' },
  button: { alignSelf: 'center', width: '50%' },
});
