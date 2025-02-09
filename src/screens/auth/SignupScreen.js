import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {
  Icon,
  Layout,
  TopNavigation,
  TopNavigationAction,
  Input, Button, Modal, Card,
  Spinner,
} from '@ui-kitten/components';

import { register } from '../../services/AuthService';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const [visible, setVisible] = React.useState(false);
  // const [loading, setLoading] = useState(false);



  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleLogin = () => {
    navigation.navigate('LOGIN');
  };

  const signup = async () => {
    setVisible(true);
    try {

      const response = await register(name, email, cpf, password);
      setVisible(false);



      if (response.error) {
        Alert.alert("Erro", response.error); // 🔴 Mostra o erro específico
      } else {
        // Alert.alert("Deu bom", response.error); // 🔴 Mostra o erro específico

          Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
          navigation.navigate('LOGIN');
      }


      // const usersCollection = firestore().collection('users');
      // const userSnapshot = await usersCollection
      //   .where('email', '==', email)
      //   .get();
      //
      // if (!userSnapshot.empty) {
      //   setVisible(false);
      //   Alert.alert('Erro', 'Usuário já cadastrado');
      // } else {
      //   await usersCollection.add({name, email, password});
      //   setVisible(false);
      //   Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
      //   navigation.navigate('LOGIN');
      // }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      setVisible(false);
      Alert.alert('Erro', 'Não foi possível cadastrar o usuário');
    }
  };

  const BackIcon = props => (
    <Icon onPress={() => navigation.goBack()} {...props} name="arrow-back" />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <Layout style={styles.container}>
      <TopNavigation
        alignment={'center'}
        accessoryLeft={BackAction} title="Vamos Começar" />

      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Criar uma conta</Text>

        <Input
          label={'Nome Completo'}
          placeholder="Entre com seu nome completo"
          style={styles.input}
          placeholderTextColor={colors.secondary}
          value={name}
          onChangeText={setName}
        />

        <Input
            label="E-mail"
            placeholder="Entre com seu e-mail"
            value={email}
            keyboardType={'email-address'}
            style={[styles.input]}
            onChangeText={setEmail}
        />

        <Input
            label="CPF"
            placeholder="Entre com seu CPF"
            value={cpf}
            // keyboardType={'email-address'}
            style={[styles.input]}
            onChangeText={setCpf}
        />

        <Input
            label="Telefone"
            placeholder="Entre com seu número de telefone"
            value={phone}
            // keyboardType={'email-address'}
            style={[styles.input]}
            onChangeText={setPhone}
        />

        {/*<Input*/}
        {/*  label="Sobrenome"*/}
        {/*  placeholder="Entre com seu Sobrenome"*/}
        {/*  style={styles.input}*/}
        {/*  placeholderTextColor={colors.secondary}*/}
        {/*  value={lastname}*/}
        {/*  onChangeText={setLastname}*/}
        {/*/>*/}

        <Input
          label="Senha"
          placeholder="Entre com a senha"
          style={[styles.input]}
          secureTextEntry={secureEntry}
          value={password}
          onChangeText={setPassword}
        />
        <Input
          label="Confirme a senha"
          secureTextEntry={secureEntry}
          placeholder="Entre com a confirmação"
          style={[styles.input]}
        />

        <Button
          style={styles.button}
          onPress={signup}
        >
          Cadastrar
        </Button>

        {/*<View style={styles.inputContainer}>*/}
        {/*  <Ionicons name={'mail-outline'} size={30} color={colors.secondary} />*/}
        {/*  <TextInput*/}
        {/*    style={styles.textInput}*/}
        {/*    placeholder="Entre com seu e-mail"*/}
        {/*    placeholderTextColor={colors.secondary}*/}
        {/*    keyboardType="email-address"*/}
        {/*    value={email}*/}
        {/*    onChangeText={setEmail}*/}
        {/*  />*/}
        {/*</View>*/}
        {/*<View style={styles.inputContainer}>*/}
        {/*  <SimpleLineIcons name={'lock'} size={30} color={colors.secondary} />*/}
        {/*  <TextInput*/}
        {/*    style={styles.textInput}*/}
        {/*    placeholder="Entre com sua senha"*/}
        {/*    placeholderTextColor={colors.secondary}*/}
        {/*    secureTextEntry={secureEntry}*/}
        {/*    value={password}*/}
        {/*    onChangeText={setPassword}*/}
        {/*  />*/}
        {/*  <TouchableOpacity onPress={() => setSecureEntry(!secureEntry)}>*/}
        {/*    <SimpleLineIcons name={'eye'} size={20} color={colors.secondary} />*/}
        {/*  </TouchableOpacity>*/}
        {/*</View>*/}
        {/*<TouchableOpacity style={styles.signupButtonWrapper} onPress={signup}>*/}
        {/*  <Text style={styles.signupText}>Cadastrar</Text>*/}
        {/*</TouchableOpacity>*/}
        {/*<Text style={styles.continueText}>ou continue com</Text>*/}
        {/*<TouchableOpacity style={styles.googleButtonContainer}>*/}
        {/*  <Text style={styles.googleText}>Google</Text>*/}
        {/*</TouchableOpacity>*/}
        <View style={styles.footerContainer}>
          <Text style={styles.accountText}>Já tem uma conta?</Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.loginText}>Entrar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}
      >
        <Card disabled={true}>
          <Spinner />

        </Card>
      </Modal>

    </Layout>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  formTitle: {
    fontSize: 25,
    color: colors.primary,
    fontWeight: 'bold',
    margin:20
  },
  input: {
    marginBottom: 16,
    backgroundColor: 'white',
    marginTop: 10,
    borderRadius: 5,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    margin:20
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
  signupButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 7,
    marginTop: 20,
  },
  signupText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.SemiBold,
    textAlign: 'center',
    padding: 10,
  },
  continueText: {
    textAlign: 'center',
    marginVertical: 20,
    fontSize: 14,
    fontFamily: fonts.Regular,
    color: colors.primary,
  },
  googleButtonContainer: {
    flexDirection: 'row',
    borderWidth: 2,
    borderColor: colors.primary,
    borderRadius: 7,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    gap: 10,
  },
  googleText: {
    fontSize: 20,
    fontFamily: fonts.SemiBold,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
    gap: 5,
  },
  accountText: {
    color: colors.primary,
    fontFamily: fonts.Regular,
  },
  loginText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
  },
});
