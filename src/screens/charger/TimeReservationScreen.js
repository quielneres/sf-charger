import React, { useState } from 'react';
import { Layout, Text, Input, Button } from '@ui-kitten/components';
import {StyleSheet} from "react-native";
import {Header} from "../../components/Header";

export const TimeReservationScreen = ({ navigation }) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('');

    const handleSave = () => {
        if (!startTime || !endTime) {
            alert('Por favor, preencha todos os campos!');
            return;
        }
        alert(`Reserva configurada: ${startTime} - ${endTime}`);
        navigation.goBack(); // Volta à tela anterior
    };

    return (
        <Layout style={styles.container}>
            <Header title="Time Reservation" onBackPress={() => navigation.goBack()} />
            <Text category="h6" style={styles.label}>Start Time</Text>
            <Input
                style={styles.input}
                placeholder="Enter start time (e.g., 18:00)"
                value={startTime}
                onChangeText={setStartTime}
            />
            <Text category="h6" style={styles.label}>End Time</Text>
            <Input
                style={styles.input}
                placeholder="Enter end time (e.g., 20:00)"
                value={endTime}
                onChangeText={setEndTime}
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
