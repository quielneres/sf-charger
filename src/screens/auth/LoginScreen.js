import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {colors} from '../../utils/colors';
import {fonts} from '../../utils/fonts';
import {
  Layout,
  TopNavigation,
  Input,
  Button,
  Icon,
  TopNavigationAction,
  Modal,
  Card,
  Spinner,
} from '@ui-kitten/components';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const { isLoggedIn, user, loginContext } = useContext(AuthContext);
  const [visible, setVisible] = React.useState(false);

  const handleSignup = () => {
    navigation.navigate('SIGNUP');
  };

  const login = async () => {
    setVisible(true);
    try {
      const usersCollection = firestore().collection('users');
      const userSnapshot = await usersCollection
        .where('email', '==', email)
        .where('password', '==', password)
        .get();

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        await loginContext(userData); // Pass userData to loginContext
        setVisible(false);

        navigation.navigate('HOME');
      } else {
        setVisible(false);

        Alert.alert('Erro', 'Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setVisible(false);
      Alert.alert('Erro', 'Não foi possível fazer login');
    }
  };

  const BackIcon = (props) => (
    <Icon onPress={() => navigation.goBack()} {...props} name="arrow-back" />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;


  return (
    <Layout style={styles.container}>

      <TopNavigation
        // accessoryLeft={BackAction}
        title="Bem-vindo de volta!"
        alignment="center"
        style={{ fontWeight: 'bold' }}
      />

      <View style={styles.formContainer}>
        <Input
          label={'E-mail'}
          placeholder="Entre  com seu e-mail"
          placeholderTextColor={colors.secondary}
          keyboardType="email-address"
          style={{marginBottom: 30}}
          value={email}
          onChangeText={setEmail}
        />
        <Input
          label={'Senha'}
          placeholder="Entre com sua senha"
          placeholderTextColor={colors.secondary}
          secureTextEntry={secureEntry}
          style={{marginBottom: 5}}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Esqueceu a Senha?</Text>
        </TouchableOpacity>

        <Button
          size="large"
          status="primary"
          style={{marginTop: 20}}
          onPress={login}>
          Entrar
        </Button>

        <Button
          style={[styles.button, {marginTop: 20}]}
          appearance="ghost"
          status="basic"
          onPress={() => navigation.navigate("HOME")}
        >
          Continuar sem login
        </Button>
      </View>

      <View style={styles.footerContainer}>
        <Text style={styles.accountText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={handleSignup}>
          <Text style={styles.signupText}>Cadastre-se</Text>
        </TouchableOpacity>
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

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    flex: 1,
    padding: 16,
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
    padding: 20,
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
  forgotPasswordText: {
    textAlign: 'right',
    color: colors.primary,
    fontFamily: fonts.SemiBold,
    marginVertical: 10,
  },
  loginButtonWrapper: {
    backgroundColor: colors.primary,
    borderRadius: 7,
    marginTop: 20,
  },
  loginText: {
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
  signupText: {
    color: colors.primary,
    fontFamily: fonts.Bold,
  },
});
