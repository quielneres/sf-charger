import React, {useState, useEffect} from 'react';
import {
  Vie,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {
  Layout,
  Text,
  List,
  ListItem,
  Divider,
  Icon,
  Button,
  Card,
  TopNavigation,
  Input,
  TopNavigationAction,
} from '@ui-kitten/components';

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
        navigation.goBack();
      } else {
        Alert.alert('Erro', 'Usuário não encontrado');
        navigation.goBack();
      }
    };
    fetchUserData();
  }, [email, navigation]);

  const handleGoBack = () => {
    navigation.goBack();
  };

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
        <Text category="h6">Junaid Ahmad</Text>
        <Text category="s1" appearance="hint">
          United Kingdom
        </Text>
      </View>

      <Divider />

      <View>
        <Input
          label="Nome"
          placeholder="Nome"
          style={[styles.input, {marginTop: 24}]}
        />

        <Input label="Sobrenome" style={[styles.input]} />

        <Input label="E-mail" style={[styles.input]} />

        <Input label="Número de Telefone" style={[styles.input]} />

        <Input label="Endereço" style={[styles.input]} />
      </View>

      <View style={styles.footerContainer}>
        <Button onPress={() => {}}>Salvar</Button>
        <Button style={{marginTop: 10}} status="basic" onPress={() => {}}>
          Trocar Senha
        </Button>
      </View>
    </Layout>

    // <View style={styles.container}>
    //   <TouchableOpacity style={styles.backButtonWrapper} onPress={handleGoBack}>
    //     <Ionicons name={"arrow-back-outline"} color={colors.primary} size={25} />
    //   </TouchableOpacity>
    //   <View style={styles.textContainer}>
    //     <Text style={styles.headingText}>Editar Perfil</Text>
    //   </View>
    //   <View style={styles.formContainer}>
    //     <View style={styles.inputContainer}>
    //       <Ionicons name={"person-outline"} size={30} color={colors.secondary} />
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder="Nome"
    //         placeholderTextColor={colors.secondary}
    //         value={name}
    //         onChangeText={setName}
    //       />
    //     </View>
    //     <View style={styles.inputContainer}>
    //       <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder="E-mail"
    //         placeholderTextColor={colors.secondary}
    //         keyboardType="email-address"
    //         value={email}
    //         editable={false}
    //       />
    //     </View>
    //     <View style={styles.inputContainer}>
    //       <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
    //       <TextInput
    //         style={styles.textInput}
    //         placeholder="Senha"
    //         placeholderTextColor={colors.secondary}
    //         secureTextEntry={true}
    //         value={password}
    //         onChangeText={setPassword}
    //       />
    //     </View>
    //     <TouchableOpacity style={styles.updateButtonWrapper} onPress={updateProfile}>
    //       <Text style={styles.updateText}>Atualizar</Text>
    //     </TouchableOpacity>
    //   </View>
    // </View>
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
  cardForm: {
    backgroundColor: '#E4E9F2', // Accepted completion
  },

  footerContainer: {
    padding: 20,
  },

  backButtonWrapper: {
    height: 40,
    width: 40,
    backgroundColor: colors.gray,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    marginVertical: 20,
  },
  headingText: {
    fontSize: 32,
    color: colors.primary,
    fontFamily: fonts.SemiBold,
  },
  formContainer: {
    marginTop: 20,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: colors.secondary,
    borderRadius: 7,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 2,
    marginVertical: 10,
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 10,
    fontFamily: fonts.Light,
  },
  updateButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 7,
    marginTop: 20,
  },
  updateText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
});
