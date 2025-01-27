import React from 'react';
import { Layout, Text, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const ChargerStatus = ({ status }) => {
    const getStatusColor = () => {
        switch (status) {
            case 'Charging': return '#34C759';
            case 'Idle': return '#8E8E93';
            case 'Error': return '#FF3B30';
            default: return '#8E8E93';
        }
    };

    return (
        <Layout style={[styles.container, { borderColor: getStatusColor() }]}>
            <Icon style={styles.icon} fill={getStatusColor()} name="car-outline" />
            <Text category="h6" style={{ color: getStatusColor() }}>
                {status}
            </Text>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flexDirection: 'row', alignItems: 'center', padding: 16, borderWidth: 1, borderRadius: 8, marginBottom: 16 },
    icon: { width: 32, height: 32, marginRight: 8 },
});
