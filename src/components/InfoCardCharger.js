import React from 'react';
import { Card, Text, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const InfoCardCharger = ({ title, status, location, onPress }) => {

    return (
        <Card style={styles.card} onPress={onPress}>
            <Text category="h6" style={styles.title}>
                {title}
            </Text>
            <Text category="s1" style={styles.status}>
                {status}
            </Text>
            <Text category="s1" style={styles.location}>
                {location}
            </Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: { marginBottom: 16, borderRadius: 12, padding: 5 },
    icon: { width: 32, height: 32, marginBottom: 8 },
    title: { fontWeight: 'bold', marginBottom: 4, fontSize: 18 },
    status: { color: 'green' },
    location: { color: '#8F9BB3' }
});
