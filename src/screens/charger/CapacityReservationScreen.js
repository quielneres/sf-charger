import React, { useState } from 'react';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import {StyleSheet} from "react-native";
import {Header} from "../../components/Header";

export const CapacityReservationScreen = ({ navigation }) => {
    const [capacity, setCapacity] = useState('');

    const handleSave = () => {
        if (!capacity) {
            alert('Por favor, insira a capacidade desejada!');
            return;
        }
        alert(`Reserva configurada: ${capacity} kWh`);
        navigation.goBack();
    };

    return (
        <Layout style={styles.container}>
            <Header title="Capacity Reservation" onBackPress={() => navigation.goBack()} />
            <Text category="h6" style={styles.label}>Capacity (kWh)</Text>
            <Input
                style={styles.input}
                placeholder="Enter desired capacity (e.g., 50)"
                value={capacity}
                onChangeText={setCapacity}
            />
            <Button style={styles.button} onPress={handleSave}>
                Save Reservation
            </Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16 },
    label: { marginBottom: 8 },
    input: { marginBottom: 16 },
    button: { marginTop: 16 },
});
