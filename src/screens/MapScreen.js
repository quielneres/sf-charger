import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {Card, Modal, Spinner} from '@ui-kitten/components';

const MapScreen = () => {
  const [regiaoInicial, setRegiaoInicial] = useState(null);
  const [markerCoordinate, setMarkerCoordinate] = useState([]);
  const navigation = useNavigation();
  const [visible, setVisible] = React.useState(false);



  useEffect(() => {
    const carregaDadosDoMapa = async () => {
      setVisible(true);

      await new Promise(resolve => setTimeout(resolve, 500));
      setRegiaoInicial({
        latitude: -15.60084489,
        longitude: -47.6839936,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setMarkerCoordinate([
        {
          id: 2,
          name: 'Eletroposto Sol Fort',
          latitude: -15.6008448,
          longitude: -47.6839936,
          description: 'Eletroposto Sol Fort Plug Charger',
          opened: '9:00 - 23:00',
          phone: '61 9 91234567',
          address: 'Rua 204 Numero 30 Vila Brasilia',
          amenities: [
            // {
            //   name: 'Café',
            //   icon: 'coffee-outline',
            // },
            {
              name: 'Wifi',
              icon: 'wifi-outline',
            },
            // {
            //   name: 'Comida',
            //   icon: 'restaurant-outline',
            // },
            // {
            //   name: 'Conveniencia',
            //   icon: 'shopping-bag-outline',
            // },
            // {
            //   name: 'Bar',
            //   icon: 'beer-outline',
            // },
          ],
          connectors: [
            {
              id: 1,
              name: '3 pin',
            },
            {
              id: 2,
              name: 'CCS2',
            },
            {
              id: 3,
              name: 'Type 2',
            }
          ],
        }
      ]);
    };

    carregaDadosDoMapa();
  }, []);

  if (!regiaoInicial || !markerCoordinate) {
    return (
      <View style={styles.loading}>
        {/*<Text>Carregando mapa...</Text>*/}
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={() => setVisible(false)}>
          <Card disabled={true}>
            <Spinner />
          </Card>
        </Modal>
      </View>
    );
  }

  const chargerInfo = {
    id: 2,
    name: 'Eletroposto Sol Fort',
    latitude: -15.6008448,
    longitude: -47.6839936,
    description: 'Eletroposto Sol Fort Plug Charger',
  };

  const handleMarkerPress = (chargerInfo) => {
    navigation.navigate('CHARGER', { chargerInfo });
  };


  return (
    <View style={styles.container}>
      <MapView style={styles.map}
               initialRegion={regiaoInicial}
      >
        {markerCoordinate.map((charger) => (
          <Marker
          coordinate={{ latitude: charger.latitude, longitude: charger.longitude }}
          onPress={() => handleMarkerPress(charger)}

          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  markerImage: {
    width: 30,
    height: 30,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MapScreen;
