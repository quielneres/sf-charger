import React, {useContext, useState, useEffect} from 'react';
import {StyleSheet, Text, View, Button} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../context/AuthContext';
import {Layout} from '@ui-kitten/components';

import MapView, {Marker} from 'react-native-maps';
import BottomMenu from './layout/BottomMenu';

const HomeScreen = () => {
  const {isLoggedIn} = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('map');
  const navigation = useNavigation();

  const [regiaoInicial, setRegiaoInicial] = useState(null);
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  useEffect(() => {
    // Simula uma busca assíncrona dos dados do mapa
    const carregaDadosDoMapa = async () => {
      // Aqui você faria uma chamada a uma API ou outra fonte de dados
      await new Promise(resolve => setTimeout(resolve, 500)); // Simula um atraso
      setRegiaoInicial({
        latitude: -23.5639,
        longitude: -46.6562,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      setMarkerCoordinate({latitude: -23.5639, longitude: -46.6562});
    };

    carregaDadosDoMapa();
  }, []);

  if (!regiaoInicial || !markerCoordinate) {
    return (
      <View style={styles.loading}>
        <Text>Carregando mapa...</Text>
      </View>
    ); // Ou um componente de carregamento mais elaborado
  }

  const chargerInfo = {
    id: 2,
    name: 'Eletroposto Sol Fort',
    latitude: -15.6008448,
    longitude: -47.6839936,
    description: 'Eletroposto Sol Fort Plug Charger',
  };

  const handleLogin = () => {
    isLoggedIn ? navigation.navigate('PROFILE') : navigation.navigate('LOGIN');
  };

  // const regiaoInicial = {
  //   latitude: -23.5639, // Latitude de São Paulo
  //   longitude: -46.6562, // Longitude de São Paulo
  //   latitudeDelta: 0.0922,
  //   longitudeDelta: 0.0421,
  // };

  return (
    // <Layout>
    <View style={styles.container}>
      <Button
        title="Ir para o Carregador"
        onPress={() => navigation.navigate('PaymentOptions', {chargerInfo})}
      />
      <MapView style={styles.map} initialRegion={regiaoInicial}>
        <Marker coordinate={markerCoordinate} />
      </MapView>

      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} handleLogin={handleLogin} />

    </View>
    // </Layout>
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  icons: {
    flexDirection: 'row',
    gap: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
    backgroundColor: '#eee',
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  legend: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default HomeScreen;
