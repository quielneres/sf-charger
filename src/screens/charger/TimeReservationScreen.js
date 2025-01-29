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
            <Header title="Reserva de horário" onBackPress={() => navigation.goBack()} />
            <Text category="h6" style={styles.label}>Hora de início</Text>
            <Input
                style={styles.input}
                placeholder="Insira a hora de início (por exemplo, 18:00)"
                value={startTime}
                onChangeText={setStartTime}
            />
            <Text category="h6" style={styles.label}>Hora de término</Text>
            <Input
                style={styles.input}
                placeholder="Insira o horário de término (por exemplo, 20h)"
                value={endTime}
                onChangeText={setEndTime}
            />
            <Button style={styles.button} onPress={handleSave}>
                Salvar reserva
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
