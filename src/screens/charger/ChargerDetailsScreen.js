import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import chargerImage from '../../assets/charger.jpeg';
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from '../../context/AuthContext';
import { commonStyles } from '../../styles/commonStyles';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import BackButton from '../../components/BackButton';


const ChargerDetailsScreen = ({ route }) => {
    const { chargerInfo } = route.params;
    const navigation = useNavigation();
    const { isLoggedIn } = useContext(AuthContext);

    const handleStartCharging = () => {
        try {
            if (isLoggedIn) {
                navigation.navigate('CHARGING', { chargerInfo });
            } else {
                navigation.navigate('LOGIN');
            }
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao iniciar o carregamento. Por favor, tente novamente.');
            console.error('Error starting charging:', error);
        }
    };

    return (
      <ScrollView contentContainerStyle={commonStyles.container}>
          <BackButton/>
          <View style={styles.imageContainer}>
              <Image source={chargerImage} style={styles.image} />
              <Text style={styles.location}>{chargerInfo.name}</Text>
          </View>
          <View style={styles.detailsContainer}>
              <View style={styles.chargeType}>
                  <Text style={styles.chargeTitle}>Tipo 2</Text>
                  <Text style={styles.chargePower}>22.2 kW</Text>
                  <Text style={styles.chargeLabel}>Cortesia</Text>
              </View>
          </View>
          <View style={styles.tariffContainer}>
              <Text style={styles.tariffTitle}>TARIFA: R$ 2,50</Text>
              <Text style={styles.link}>Acesse <Text style={styles.bold}>solfort.com/br</Text>, conheça nossa linha completa de produtos e faça um test-drive!</Text>
          </View>
          <TouchableOpacity style={styles.buttonWrapper} onPress={handleStartCharging}>
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
    // buttonText: {
    //     color: '#fff',
    //     fontSize: 16,
    //     fontWeight: 'bold',
    // },

    buttonWrapper: {
        backgroundColor: colors.primary,
        borderRadius: 7,
        marginTop: 20,
    },

    buttonText: {
        color: colors.white,
        fontSize: 20,
        fontFamily: fonts.SemiBold,
        textAlign: "center",
        padding: 10,
    },
});

export default ChargerDetailsScreen;
