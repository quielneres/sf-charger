// src/screens/HomeScreen.js
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, TextInput, Button } from 'react-native';
import { colors } from '../utils/colors';
import { fonts } from '../utils/fonts';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import BackButton from '../components/BackButton';
import { AuthContext } from '../context/AuthContext';
import BottomMenu from './layout/BottomMenu';

const HomeScreen = () => {
  const { isLoggedIn } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('map');
  const navigation = useNavigation();

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

      <View style={styles.searchBar}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput placeholder="Pesquisar" style={styles.input} />
        <TouchableOpacity>
          <Icon name="filter-outline" size={20} color="#888" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapContainer}>
        <Button
          title="Ir para o Carregador"
          onPress={() => navigation.navigate('PaymentOptions', { chargerInfo })}
        />
      </View>

      <View style={styles.footer}>
        <View style={styles.legend}>
          <View style={[styles.dot, { backgroundColor: 'green' }]} />
          <Text>Disponível</Text>
          <View style={[styles.dot, { backgroundColor: 'blue' }]} />
          <Text>Rápido</Text>
          <View style={[styles.dot, { backgroundColor: 'red' }]} />
          <Text>Em uso</Text>
          <View style={[styles.dot, { backgroundColor: 'black' }]} />
          <Text>Em Manutenção</Text>
          <View style={[styles.dot, { backgroundColor: 'gray' }]} />
          <Text>Não contactados</Text>
        </View>
      </View>

      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} handleLogin={handleLogin} />
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
