import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Image, Alert } from 'react-native';
import {
  Layout,
  Text,
  List,
  ListItem,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
  Button,
} from '@ui-kitten/components';
import BottomMenu from '../layout/BottomMenu';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';

const EditIcon = (props) => <Icon {...props} name="edit-outline" />;

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const navigation = useNavigation();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

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
    { title: 'Minhas Reservas', icon: 'calendar-outline' },
    { title: 'Minha Carteira', icon: 'credit-card-outline' },
    { title: 'Histórico', icon: 'clock-outline' },
    { title: 'Notificações', icon: 'bell-outline' },
    { title: 'Segurança', icon: 'lock-outline' },
    { title: 'Lembretes', icon: 'alert-circle-outline' },
    { title: 'Suporte', icon: 'headphones-outline' },
    { title: 'Política de Privacidade', icon: 'shield-outline' },
    { title: 'Sobre', icon: 'info-outline' },
  ];

  const renderItem = ({ item }) => (
      <ListItem
          style={styles.listItem}
          title={item.title}
          accessoryLeft={(props) => <Icon {...props} name={item.icon} />}
          accessoryRight={(props) => <Icon {...props} name="arrow-ios-forward-outline" />}
          onPress={item.onPress || (() => alert(`${item.title} não está configurado.`))}
      />
  );

  const renderHeader = () => (
      <View style={styles.headerContainer}>
        <Image
            style={styles.avatar}
            source={{ uri: user?.avatar || 'https://via.placeholder.com/100' }}
        />
        <Text category="h5" style={styles.name}>
          {user?.name || 'Usuário'}
        </Text>
        <Text category="s1" appearance="hint">
          {user?.location || 'Localização não disponível'}
        </Text>
      </View>
  );

  const renderEditAction = () => (
      <TopNavigationAction
          icon={EditIcon}
          onPress={() => navigation.navigate('EDIT_PROFILE', { email: user?.email })}
      />
  );

  return (
      <Layout style={styles.container}>
        {/* Top Navigation */}
        <TopNavigation
            title="Meu Perfil"
            alignment="center"
            accessoryRight={renderEditAction}
        />

        {/* Cartão de Perfil */}
        <Layout style={styles.card}>
          {renderHeader()}
        </Layout>

        <Divider />

        {/* Lista de Opções */}
        <List
            data={data}
            ItemSeparatorComponent={Divider}
            renderItem={renderItem}
            style={styles.list}
        />

        {/* Botão de Logout */}
        <Button
            style={styles.logoutButton}
            status="danger"
            onPress={handleLogout}
        >
          Sair
        </Button>

        {/* Menu Inferior */}
        <BottomMenu activeTab={activeTab} setActiveTab={setActiveTab} />
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  card: {
    alignItems: 'center',
    padding: 20,
    margin: 16,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  list: {
    flex: 1,
  },
  listItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  logoutButton: {
    margin: 16,
    borderRadius: 8,
  },
});

export default ProfileScreen;
