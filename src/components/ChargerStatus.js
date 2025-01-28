import React, {useEffect, useState} from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import {useCharger} from "../context/ChargerContext";

export const ChargerStatus = ({ status }) => {



    const getStatusColor = () => {
        switch (status) {
            case 'Charging': return '#34C759';
            case 'Idle': return '#8E8E93';
            case 'Error': return '#FF3B30';
            default: return '#8E8E93';
        }
    };

    const getText = () => {
        switch (status) {
            case 'Charging': return 'Carregando';
            case 'Idle': return 'Parado';
            case 'Error': return 'Indisponível';
            default: return '';
        }
    };

    return (
        <Layout style={[styles.container, { borderColor: getStatusColor() }]}>
            <Icon style={styles.icon} fill={getStatusColor()} name="car-outline" />
            <Text category="h6" style={{ color: getStatusColor() }}>
                {getText()}
            </Text>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderRadius: 8, marginBottom: 16 },
    icon: { width: 32, height: 32, marginRight: 8 },
});
