import React, {useContext, useEffect, useState} from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import {Button, Card, Icon, Layout, TopNavigation, TopNavigationAction} from '@ui-kitten/components';
import chargerImage from '../../assets/charger.jpeg';



import Geolocation from 'react-native-geolocation-service';
import { getWalletBalance } from '../../services/WalletService';
import ChargingValidationModal from '../../components/ChargingValidationModal';
import StartChargingModal from "../../components/StartChargingModal";

const ChargerDetailsScreen = ({ route }) => {
  const { chargerInfo } = route.params;
  const navigation = useNavigation();
  const { isLoggedIn, user, logout } = useContext(AuthContext);



  const [isModalVisible, setModalVisible] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [walletBalance, setWalletBalance] = useState(0);
  const [hasCard, setHasCard] = useState(false);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    Geolocation.getCurrentPosition(
        position => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        error => console.error("Erro ao obter localização:", error),
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );

    // Buscar saldo da carteira
    fetchWalletBalance();

  }, []);

  const fetchWalletBalance = async () => {
    try {
      const balance = await getWalletBalance(1);
      setWalletBalance(balance);
    } catch (error) {
      console.error("Erro ao buscar saldo da carteira:", error);
    }
  };

  const confirmStartCharging = async () => {
    setShowModal(false);

    const latitude = -15.60084489;
    const longitude = -47.6839936;

    navigation.navigate('ChargingMonitor');



    // const response = await startCharging(chargerInfo.serialNumber, user._id, latitude, longitude);
    //
    // if (response.error) {
    //   Alert.alert("Erro", response.error);
    // } else {
    //   navigation.navigate('ChargingMonitor');
    // }
  };



  // console.log('charger info', chargerInfo)

  const handleStartCharging = async () => {

    if (!isLoggedIn) {
      return navigation.navigate('LOGIN');
    }

    setShowModal(true);

    // try {
    //   if (isLoggedIn) {
    //     navigation.navigate('CHARGING', { chargerInfo });
    //   } else {
    //     navigation.navigate('LOGIN');
    //   }
    // } catch (error) {
    //   Alert.alert(
    //     'Erro',
    //     'Ocorreu um erro ao iniciar o carregamento. Por favor, tente novamente.',
    //   );
    //   console.error('Error starting charging:', error);
    // }
    //
    // const distance = calculateDistance(
    //     userLocation.latitude, userLocation.longitude,
    //     chargerInfo.latitude, chargerInfo.longitude
    // );
    //
    // if (distance > 0.5) {  // Exemplo: 500m de raio permitido
    //   Alert.alert("Você está longe do carregador!", "Aproxime-se para iniciar a recarga.");
    //   return;
    // }
    //
    // if (walletBalance < 30 && !hasCard) {
    //   setModalVisible(true);
    //   return;
    // }
    //
    // const balance = await getWalletBalance(1);
    // setWalletBalance(balance);
    //
    // if (balance < 30) {
    //   setModalVisible(true);
    //   return;
    // }
    //
    // navigation.navigate('CHARGING', { chargerInfo });
    //
    // navigation.navigate('CHARGING', { chargerInfo });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371; // Raio da Terra em km

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Retorna a distância em km
  };


  const renderAmenityIcon = (amenityName) => {
    switch (amenityName.toLowerCase()) {
      case 'café':
        return 'coffee-outline';
      case 'wifi':
        return 'wifi-outline';
      case 'comida':
        return 'restaurant-outline';
      case 'conveniencia':
        return 'shopping-bag-outline';
      case 'bar':
        return 'beer-outline';
      default:
        return 'question-mark-outline';
    }
  };

  const BackIcon = (props) => (
      <Icon {...props} name="arrow-back" />
  );

  const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
    <Layout contentContainerStyle={styles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Carregador" alignment="center" />

      <Layout>
      <View style={styles.imageContainer}>
        <Image source={chargerImage} style={styles.image} />
        <Text style={styles.chargeTitle}>{chargerInfo?.description}</Text>
      </View>



      <Text style={{ marginLeft: 25, marginTop: 20 }}>
        <Icon name="pin-outline" style={{ width: 20, height: 20, marginRight: 5, marginBottom: -3 }} fill="#000" />
        {chargerInfo?.address}
      </Text>


      <Text style={{ marginLeft: 25, marginTop: 20 }}>
        <Icon name="pin-outline" style={{ width: 20, height: 20, marginRight: 5, marginBottom: -3 }} fill="#000" />
        42 km de distância de você <Text style={styles.routerLink}> VER ROTA</Text>
      </Text>
      </Layout>


      {/*<Text style={{ fontSize: 18, marginLeft: 25, fontWeight: 'bold' }}>*/}
      {/*  Conector*/}
      {/*</Text>*/}
      <Layout style={styles.topContainer} level="1">
        <Card style={styles.chargeType} >
          <Text style={styles.chargeTitle}>{chargerInfo.connectorType}</Text>
          <Text style={styles.chargePower}>{chargerInfo.powerKw} kW</Text>
          {/*{chargerInfo?.status} == Available*/}

          <Text style={{ color: 'green' }}>Disponível </Text>
        </Card>
        <View style={styles.tariffContainer}>
          <Text style={styles.tariffTitle}>Preço por kW: {chargerInfo?.pricePerKw?.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</Text>
        </View>
      </Layout>



      {/*<Button style={styles.buttonWrapper} onPress={handleStartCharging}>*/}
      {/*  Iniciar a Recarga*/}
      {/*</Button>*/}

      <StartChargingModal visible={showModal} onConfirm={confirmStartCharging} onCancel={() => setShowModal(false)} />

      {/* Botões de Controle de Carregamento */}
      <Layout style={styles.buttonContainer}>
        <Button
            style={[styles.actionButton, { backgroundColor: '#34C759' }]}
            onPress={handleStartCharging}
        >
          Iniciar Carregamento
        </Button>
      </Layout>


      <ChargingValidationModal
          visible={isModalVisible}
          onClose={() => setModalVisible(false)}
          onAddFunds={() => {
            setModalVisible(false);
            navigation.navigate("WalletScreen"); // Redireciona para recarga de saldo
          }}
          onAddCard={() => {
            setModalVisible(false);
            navigation.navigate("AddCardScreen"); // Redireciona para cadastro de cartão
          }}
          onConfirm={() => {
            setModalVisible(false);
            navigation.navigate('CHARGING', { chargerInfo });
          }}
      />


    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',

    // backgroundColor: 'white',
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-between', margin: 16 },
  actionButton: { flex: 1, marginHorizontal: 4, borderRadius: 8 },

  topContainer: {
    // flexDirection: 'row',

    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    margin: 15,
    marginTop: 30,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
  },
  location: {
    marginTop: 8,
    fontSize: 16,
    fontStyle: 'italic',
    color: '#666',
  },
  chargeType: {
    alignItems: 'center',
    backgroundColor: '#e5eaf1',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  chargeTitle: {
    marginTop: 30,
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
  amenitiesContainer: {
    marginLeft: 25,
    marginTop: 10,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  amenityIcon: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  amenityText: {
    fontSize: 16,
  },
  tariffContainer: {
    flexDirection: 'row',
    backgroundColor: '#d4d7de',
    marginTop: -3,
    paddingLeft: 13.5,
    paddingRight: 13.5,
    padding: 10,
    alignItems: 'center',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,

  },
  tariffTitle: {
    fontSize: 12,
    // fontWeight: 'bold',
    // backgroundColor: 'red',
    color: '#666',
  },
  link: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
  bold: {
    fontWeight: 'bold',
  },
  buttonWrapper: {
    margin: 20,
  },
  routerLink: {
    color: '#1b61ed',
    fontWeight: 'bold',
  }
});

export default ChargerDetailsScreen;
