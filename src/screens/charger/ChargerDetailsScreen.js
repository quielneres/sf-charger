import React, { useContext } from 'react';
import { View, Text, Image, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { Button, Card, Icon, Layout } from '@ui-kitten/components';
import chargerImage from '../../assets/charger.jpeg';

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
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao iniciar o carregamento. Por favor, tente novamente.',
      );
      console.error('Error starting charging:', error);
    }
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

  return (
    <Layout contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={chargerImage} style={styles.image} />
        <Text style={styles.location}>{chargerInfo.name}</Text>
      </View>

      <Text style={{ fontSize: 18, marginLeft: 25, fontWeight: 'bold' }}>
        Conectores
      </Text>
      <Layout style={styles.topContainer} level="1">
        {chargerInfo.connectors.map((connector) => (
          <Card style={styles.chargeType} key={connector.id}>
            <Text style={styles.chargeTitle}>{connector.name}</Text>
            <Text style={styles.chargePower}>22.2 kW</Text>
            <Text style={styles.chargeLabel}>Cortesia</Text>
          </Card>
        ))}
      </Layout>

      <Text style={{ marginLeft: 25 }}>
        <Text style={{ color: 'green' }}>Aberto </Text>
        {chargerInfo.opened}
      </Text>

      <Text style={{ marginLeft: 25, marginTop: 20 }}>
        <Icon name="pin-outline" style={{ width: 20, height: 20, marginRight: 5, marginBottom: -3 }} fill="#000" />
        {chargerInfo.address}
      </Text>

      <Text style={{ marginLeft: 25, marginTop: 20 }}>
        <Icon name="phone-outline" style={{ width: 20, height: 20, marginRight: 5, marginBottom: -3 }} fill="#000" />
        {chargerInfo.phone}
      </Text>

      {/*<Text style={{ fontSize: 18, marginTop: 30, marginLeft: 25, fontWeight: 'bold' }}>*/}
      {/*  Comodidades*/}
      {/*</Text>*/}
      {/*<View style={styles.amenitiesContainer}>*/}
      {/*  {chargerInfo.amenities.map((amenity, index) => (*/}
      {/*    <View key={index} style={styles.amenityItem}>*/}
      {/*      /!*<Icon name="coffee-outline" style={styles.amenityIcon} fill="#000" />*!/*/}
      {/*      <Icon name={amenity.name} style={styles.amenityIcon} fill="#000" />*/}

      {/*      <Text style={styles.amenityText}>{amenity.name}</Text>*/}
      {/*    </View>*/}
      {/*  ))}*/}
      {/*</View>*/}

      <View style={styles.tariffContainer}>
        <Text style={styles.tariffTitle}>TARIFA: R$ 2,50</Text>
        <Text style={styles.link}>
          Acesse <Text style={styles.bold}>solfort.com/br</Text>, conheça nossa linha completa de produtos e faça um test-drive!
        </Text>
      </View>

      <Button style={styles.buttonWrapper} onPress={handleStartCharging}>
        Iniciar a Recarga
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    margin: 15,
    marginTop: 2,
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
    borderRadius: 5,
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
    padding: 20,
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
  buttonWrapper: {
    margin: 20,
  },
});

export default ChargerDetailsScreen;
