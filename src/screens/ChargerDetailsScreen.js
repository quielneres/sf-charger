import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

import chargerImage from '../assets/charger.jpeg'; // Caminho relativo para a imagem
import { useNavigation } from "@react-navigation/native";

const ChargerDetailsScreen = ({ route }) => {
    const navigation = useNavigation();

    const { charger } = route.params;

    const handleCharger = () => {
        navigation.navigate("CHARGING");
    }

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {/* Imagem do carregador */}
            <View style={styles.imageContainer}>
                <Image
                    source={ chargerImage }
                    style={styles.image}
                />
                <Text style={styles.location}>{charger.name}</Text>
            </View>

            {/* Detalhes do carregador */}
            <View style={styles.detailsContainer}>
                <View style={styles.chargeType}>
                    <Text style={styles.chargeTitle}>Tipo 2</Text>
                    <Text style={styles.chargePower}>22.2 kW</Text>
                    <Text style={styles.chargeLabel}>Cortesia</Text>
                </View>
            </View>

            {/* Tarifa e Aviso */}
            <View style={styles.tariffContainer}>
                <Text style={styles.tariffTitle}>TARIFA: R$ 2,50</Text>

                <Text style={styles.link}>Acesse <Text style={styles.bold}>solfort.com/br</Text>, conheça nossa linha completa de produtos e faça um test-drive!</Text>
            </View>

            {/* Botão */}
            <TouchableOpacity style={styles.button} onPress={() => handleCharger()}>
                <Text style={styles.buttonText}>Iniciar a Recarga</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    imageContainer: {
        alignItems: 'center',
        marginBottom: 16,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    location: {
        marginTop: 8,
        fontSize: 16,
        fontStyle: 'italic',
        color: '#666',
    },
    detailsContainer: {
        alignItems: 'center',
        marginVertical: 16,
    },
    chargeType: {
        alignItems: 'center',
        padding: 16,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    chargeTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    chargePower: {
        fontSize: 16,
        marginTop: 4,
    },
    chargeLabel: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
    tariffContainer: {
        paddingVertical: 16,
    },
    tariffTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1E88E5',
    },
    notice: {
        marginTop: 8,
        fontSize: 14,
        color: 'red',
    },
    link: {
        marginTop: 8,
        fontSize: 14,
        color: '#666',
    },
    bold: {
        fontWeight: 'bold',
    },
    button: {
        marginTop: 20,
        paddingVertical: 12,
        backgroundColor: '#1E88E5',
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ChargerDetailsScreen;
