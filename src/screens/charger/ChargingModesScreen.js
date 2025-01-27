import React from 'react';
import { StyleSheet } from 'react-native';
import {Layout} from "@ui-kitten/components";
import {Header} from "../../components/Header";
import {InfoCard} from "./InfoCard";

export const ChargingModesScreen = ({ navigation }) => {
    return (
        <Layout style={styles.container}>
            <Header title="Charging Modes" onBackPress={() => navigation.goBack()} />
            {/* Modos de Carregamento */}
            <InfoCard
                title="Fast Mode"
                description="Charge directly with maximum power."
                iconName="flash-outline"
                onPress={() => navigation.navigate('FastMode')}
            />
            <InfoCard
                title="Time Reservation"
                description="Schedule your charging session."
                iconName="clock-outline"
                onPress={() => navigation.navigate('TimeReservation')}
            />
            <InfoCard
                title="Capacity Reservation"
                description="Reserve a session based on capacity."
                iconName="battery-outline"
                onPress={() => navigation.navigate('CapacityReservation')}
            />
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
});
