import React, { useState, useEffect } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {
  Layout,
  Text,
  Input,
  Button,
  Divider,
  Icon,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { email } = route.params;
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userSnapshot = await firestore()
            .collection('users')
            .where('email', '==', email)
            .get();

        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const userData = userDoc.data();
          setUserId(userDoc.id);
          setName(userData.name);
          setPassword(userData.password);
        } else {
          Alert.alert('Erro', 'Usuário não encontrado');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
        Alert.alert('Erro', 'Não foi possível carregar os dados do usuário');
      }
    };

    fetchUserData();
  }, [email, navigation]);

  const updateProfile = async () => {
    try {
      await firestore()
          .collection('users')
          .doc(userId)
          .update({ name, email, password });
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    }
  };

  const BackIcon = (props) => (
      <Icon {...props} name="arrow-back" />
  );

  const BackAction = () => (
      <TopNavigationAction icon={BackIcon} onPress={() => navigation.goBack()} />
  );

  return (
      <Layout style={styles.container}>
        {/* Navegação Superior */}
        <TopNavigation accessoryLeft={BackAction} title="Editar Perfil" alignment="center" />

        {/* Cabeçalho */}
        <Layout style={styles.headerContainer}>
          <Image
              style={styles.avatar}
              source={{ uri: 'https://via.placeholder.com/100' }}
          />
          <Text category="h6" style={styles.name}>
            {name || 'Usuário'}
          </Text>
          <Text category="s1" appearance="hint">
            {email || 'E-mail não informado'}
          </Text>
        </Layout>

        <Divider />

        {/* Formulário */}
        <Layout style={styles.formContainer}>
          <Input
              label="Nome"
              placeholder="Digite seu nome"
              value={name}
              onChangeText={setName}
              style={styles.input}
          />
          <Input
              label="Senha"
              placeholder="Digite sua senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={styles.input}
          />
        </Layout>

        {/* Botões de Ação */}
        <Layout style={styles.footerContainer}>
          <Button style={styles.saveButton} onPress={updateProfile}>
            Salvar
          </Button>
          <Button style={styles.changePasswordButton} status="basic" onPress={() => Alert.alert('Trocar Senha')}>
            Trocar Senha
          </Button>
        </Layout>
      </Layout>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#F7F9FC',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  name: {
    marginBottom: 4,
    fontWeight: 'bold',
  },
  formContainer: {
    paddingHorizontal: 16,
    marginTop: 16,
  },
  input: {
    marginBottom: 16,
    borderRadius: 8,
  },
  footerContainer: {
    padding: 16,
    marginTop: 16,
  },
  saveButton: {
    marginBottom: 12,
    borderRadius: 8,
  },
  changePasswordButton: {
    borderRadius: 8,
  },
});
