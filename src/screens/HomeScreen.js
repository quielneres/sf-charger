import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {colors} from '../utils/colors';
import {fonts} from '../utils/fonts';
import {useNavigation} from '@react-navigation/native';
// import MapScreen from "./MapScreen";

import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../components/BackButton';
import {AuthContext} from '../context/AuthContext';

const HomeScreen = () => {
  const {isLoggedIn} = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState('map'); // Estado para tab ativa
  const navigation = useNavigation();

  console.log('home isLoggedIn', isLoggedIn);

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

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <BackButton />
        <Text style={styles.logo}>Sol Fort</Text>
        <View style={styles.icons}>
          <TouchableOpacity>
            <Icon name="mail-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="refresh" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Barra de Pesquisa */}
      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Pesquisar" style={styles.input} />
        <TouchableOpacity>
          <Icon name="filter-outline" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      {/* Componente de Mapa */}
      <View style={styles.mapContainer}>
        {/*<MapScreen/>*/}

        <Button
          title="Ir para o Crrgeador"
          onPress={() => navigation.navigate('CHARGER', {chargerInfo})}
        />
      </View>

      {/* Rodapé */}
      <View style={styles.footer}>
        <View style={styles.legend}>
          <View style={[styles.dot, {backgroundColor: 'green'}]} />
          <Text>Disponível</Text>
          <View style={[styles.dot, {backgroundColor: 'blue'}]} />
          <Text>Rápido</Text>
          <View style={[styles.dot, {backgroundColor: 'red'}]} />
          <Text>Em uso</Text>
          <View style={[styles.dot, {backgroundColor: 'black'}]} />
          <Text>Em Manutenção</Text>
          <View style={[styles.dot, {backgroundColor: 'gray'}]} />
          <Text>Não contactados</Text>
        </View>
      </View>

      {/* Menu Inferior */}
      <View style={styles.bottomMenu}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setActiveTab('map')}>
          <Icon
            name="map-outline"
            size={24}
            color={activeTab === 'map' ? '#007AFF' : '#808080'}
          />
          <Text
            style={[styles.menuText, activeTab === 'map' && styles.activeText]}>
            Mapa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setActiveTab('battery')}>
          <Icon
            name="battery-charging-outline"
            size={24}
            color={activeTab === 'battery' ? '#007AFF' : '#808080'}
          />
          <Text
            style={[
              styles.menuText,
              activeTab === 'battery' && styles.activeText,
            ]}>
            Bateria
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={handleLogin}>
          <Icon
            name="person-outline"
            size={24}
            color={activeTab === 'profile' ? '#007AFF' : '#808080'}
          />
          <Text
            style={[
              styles.menuText,
              activeTab === 'profile' && styles.activeText,
            ]}>
            Perfil
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => setActiveTab('qr-code')}>
          <Icon
            name="qr-code-outline"
            size={24}
            color={activeTab === 'qr-code' ? '#007AFF' : '#808080'}
          />
          <Text
            style={[
              styles.menuText,
              activeTab === 'qr-code' && styles.activeText,
            ]}>
            QR Code
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    backgroundColor: '#eee', // Placeholder para o mapa
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
  markerImage: {
    width: 40,
    height: 40,
  },
  bottomMenu: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 70,
    borderTopWidth: 1,
    borderColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  menuItem: {
    alignItems: 'center',
  },
  menuText: {
    fontSize: 12,
    color: '#808080',
  },
  activeText: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
