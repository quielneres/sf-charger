// layout/BottomMenu.js
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const BottomMenu = ({ activeTab, setActiveTab, handleLogin }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.bottomMenu}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('HOME')}>
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
        onPress={() => navigation.navigate('PROFILE')}>
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
  );
};

const styles = StyleSheet.create({
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

export default BottomMenu;
