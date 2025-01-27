import React from 'react';
import { Input, Button, Layout, Text } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const ReservationForm = ({ onSubmit }) => {
    const [time, setTime] = React.useState('');
    const [capacity, setCapacity] = React.useState('');

    return (
        <Layout style={styles.container}>
            <Text category="h6" style={styles.label}>
                Reservation Time
            </Text>
            <Input
                style={styles.input}
                placeholder="Enter Time (e.g., 18:00)"
                value={time}
                onChangeText={setTime}
            />
            <Text category="h6" style={styles.label}>
                Capacity (kWh)
            </Text>
            <Input
                style={styles.input}
                placeholder="Enter Capacity (e.g., 50)"
                value={capacity}
                onChangeText={setCapacity}
            />
            <Button onPress={() => onSubmit({ time, capacity })}>Save Reservation</Button>
        </Layout>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    label: {
        marginBottom: 8,
    },
    input: {
        marginBottom: 16,
    },
});
