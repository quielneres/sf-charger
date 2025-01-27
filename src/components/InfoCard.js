import React from 'react';
import { Card, Text, Icon } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

export const InfoCard = ({ title, description, iconName, onPress }) => {
    const IconComponent = (props) => <Icon {...props} name={iconName} />;

    return (
        <Card style={styles.card} onPress={onPress}>
            <IconComponent style={styles.icon} fill="#3366FF" />
            <Text category="h6" style={styles.title}>
                {title}
            </Text>
            <Text category="s1" style={styles.description}>
                {description}
            </Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    card: { marginBottom: 16, borderRadius: 12, padding: 16 },
    icon: { width: 32, height: 32, marginBottom: 8 },
    title: { fontWeight: 'bold', marginBottom: 4 },
    description: { color: '#8F9BB3' },
});
