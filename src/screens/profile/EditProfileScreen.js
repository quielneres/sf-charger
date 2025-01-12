import React, {useState, useEffect} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {Layout, Text, Input, Button, Divider, Icon, TopNavigation, TopNavigationAction} from '@ui-kitten/components';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {email} = route.params;
  const [userId, setUserId] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
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
    };
    fetchUserData();
  }, [email, navigation]);

  const updateProfile = async () => {
    try {
      await firestore()
        .collection('users')
        .doc(userId)
        .update({name, email, password});
      Alert.alert('Sucesso', 'Perfil atualizado com sucesso');
      navigation.goBack();
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      Alert.alert('Erro', 'Não foi possível atualizar o perfil');
    }
  };

  const BackIcon = props => (
    <Icon onPress={() => navigation.goBack()} {...props} name="arrow-back" />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <Layout style={styles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Editar Perfil" />

      <View style={styles.headerContainer}>
        <Image
          style={styles.avatar}
          source={{uri: 'https://via.placeholder.com/100'}}
        />
        <Text category="h6">{name}</Text>
        <Text category="s1" appearance="hint">
          {email}
        </Text>
      </View>

      <Divider />

      <View>
        <Input
          label="Nome"
          placeholder="Nome"
          style={[styles.input, {marginTop: 24}]}
          value={name}
          onChangeText={setName}
        />

        <Input
          label="Senha"
          placeholder="Senha"
          style={[styles.input]}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <View style={styles.footerContainer}>
        <Button onPress={updateProfile}>Salvar</Button>
        <Button style={{marginTop: 10}} status="basic" onPress={() => {}}>
          Trocar Senha
        </Button>
      </View>
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
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  footerContainer: {
    padding: 20,
  },
});
