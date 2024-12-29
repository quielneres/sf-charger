import React, {useState, useEffect} from 'react';
import * as Progress from 'react-native-progress';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';


const ChargingScreen = ({navigation}) => {
    const [progress, setProgress] = useState(0);
    const [chargerInfo, setChargerInfo] = useState({});

    useEffect(() => {
        // Simula o progresso do carregamento
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 1) {
                    clearInterval(interval);
                    navigation.navigate('Payment', { chargerInfo });
                    return 1;
                }
                return prev + 0.1;
            });
        }, 1000);

        // Simula a coleta de informações do carregador
        setChargerInfo({
            id: 'CHG-12345',
            location: 'Estação A - Setor 3',
            status: 'Carregando'
        });

        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Carregamento em Progresso</Text>
            <Progress.Bar progress={progress} width={200}/>
            <Text>Status: {chargerInfo.status}</Text>
            <Text>Local: {chargerInfo.location}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
});

export default ChargingScreen;
