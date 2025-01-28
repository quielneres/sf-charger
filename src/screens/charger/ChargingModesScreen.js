import React from 'react';
import { StyleSheet } from 'react-native';
import {Layout} from "@ui-kitten/components";
import {Header} from "../../components/Header";
import {InfoCard} from "./InfoCard";

export const ChargingModesScreen = ({ navigation }) => {
    return (
        <Layout style={styles.container}>
            <Header title="Modos de carregamento" onBackPress={() => navigation.goBack()} />
            {/* Modos de Carregamento */}
            <InfoCard
                title="Modo rápido"
                description="Carregue diretamente com potência máxima."
                iconName="flash-outline"
                onPress={() => navigation.navigate('FastMode')}
            />
            <InfoCard
                title="Reserva de horário"
                description="Agende sua sessão de carregamento."
                iconName="clock-outline"
                onPress={() => navigation.navigate('TimeReservation')}
            />
            <InfoCard
                title="Reserva de capacidade"
                description="Reserve uma sessão com base na capacidade."
                iconName="battery-outline"
                onPress={() => navigation.navigate('CapacityReservation')}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
});
