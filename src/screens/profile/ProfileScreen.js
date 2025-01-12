import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Image, Alert, TouchableOpacity } from 'react-native';
import { Layout, Text, List, ListItem, Divider, Icon, TopNavigation } from '@ui-kitten/components';
import BottomMenu from '../layout/BottomMenu';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigation = useNavigation();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

  console.log('isLoggedIn', isLoggedIn);
  console.log('user', user);

  useEffect(() => {
    if (!isLoggedIn) {
      navigation.navigate('LOGIN');
    }
  }, [isLoggedIn, navigation]);

  const handleLogout = async () => {
    try {
      await logout();
      Alert.alert('Sucesso', 'Logout realizado com sucesso');
      navigation.navigate('LOGIN');
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
      Alert.alert('Erro', 'Não foi possível fazer logout');
    }
  };

  const data = [
    { title: 'Meu carro', icon: 'car-outline' },
    { title: 'My Bookings', icon: 'calendar-outline' },
    { title: 'Minha Carteira', icon: 'credit-card-outline' },
    { title: 'Histórico', icon: 'clock-outline' },
    { title: 'Notificações', icon: 'bell-outline' },
    { title: 'Segurança', icon: 'lock-outline' },
    { title: 'Reminders', icon: 'alert-circle-outline' },
    { title: 'Suporte Customizado', icon: 'headphones-outline' },
    { title: 'Política de Privacidade', icon: 'shield-outline' },
    { title: 'Sobre', icon: 'info-outline' },
    { title: 'Sair', icon: 'log-out-outline', onPress: handleLogout },
  ];

  const renderItem = ({ item }) => (
    <ListItem
      style={styles.listItem}
      title={item.title}
      accessoryLeft={props => <Icon {...props} name={item.icon} />}
      accessoryRight={props => <Icon {...props} name="arrow-ios-forward-outline" />}
      onPress={item.onPress}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation title="Meu Perfil" />
      <TouchableOpacity
        style={styles.backButtonWrapper}
        onPress={() => navigation.navigate('EDIT_PROFILE', { email: user?.email })}>
        <View style={styles.headerContainer}>
          <Image
            style={styles.avatar}
            source={{ uri: 'https://via.placeholder.com/100' }}
          />
          <Text category="h6">{user?.name}</Text>
          <Text category="s1" appearance="hint">
            {user?.location}
          </Text>
        </View>
      </TouchableOpacity>
      <Divider />
      <List
        data={data}
        ItemSeparatorComponent={Divider}
        renderItem={renderItem}
      />
      <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listItem: {
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
});

export default ProfileScreen;
