import React, { useContext, useState } from 'react';
import { StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { Layout, Input, Button, Text, Icon, Modal, Card, Spinner } from '@ui-kitten/components';
import { AuthContext } from '../../context/AuthContext';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureEntry, setSecureEntry] = useState(true);
  const { loginContext } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setLoading(true);
    try {
      const userSnapshot = await firestore()
          .collection('users')
          .where('email', '==', email)
          .where('password', '==', password)
          .get();

      if (!userSnapshot.empty) {
        const userData = userSnapshot.docs[0].data();
        await loginContext(userData);
        setLoading(false);
        navigation.navigate('HOME');
      } else {
        setLoading(false);
        Alert.alert('Erro', 'Email ou senha incorretos');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setLoading(false);
      Alert.alert('Erro', 'Não foi possível fazer login');
    }
  };

  const loginWithGoogle = () => {
    Alert.alert('Login com Google em desenvolvimento.');
  };

  const loginWithApple = () => {
    Alert.alert('Login com Apple em desenvolvimento.');
  };

  return (
      <Layout style={styles.container}>
        {/* Logo */}
        <Layout style={styles.logoContainer}>
          <Image
              source={require('../../assets/logo-sol-fort.png')}
              style={styles.logo}
          />
        </Layout>

        {/* Formulário */}
        <Layout style={styles.formContainer}>
          <Input
              label="E-mail"
              placeholder="Digite seu e-mail"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
          />
          <Input
              label="Senha"
              placeholder="Digite sua senha"
              secureTextEntry={secureEntry}
              value={password}
              onChangeText={setPassword}
              style={styles.input}
          />

          <Button
              style={styles.loginButton}
              onPress={login}
          >
            Entrar
          </Button>

          <Button
              appearance="ghost"
              status="basic"
              style={styles.continueButton}
              onPress={() => navigation.navigate('HOME')}
          >
            Continuar sem login
          </Button>

          {/* Opções de Login com Redes Sociais */}
          <Text style={styles.orText}>ou continue com</Text>
          <Layout style={styles.socialButtons}>
            <Button
                appearance="ghost"
                accessoryLeft={(props) => <Icon {...props} name="google-outline" />}
                style={styles.socialButton}
                onPress={loginWithGoogle}
            >
              Google
            </Button>
            <Button
                appearance="ghost"
                accessoryLeft={(props) => <Icon {...props} name="car-outline" />}
                style={styles.socialButton}
                onPress={loginWithApple}
            >
              Apple
            </Button>
          </Layout>
        </Layout>

        {/* Footer */}
        <Layout style={styles.footerContainer}>
          <Text>Não tem uma conta?</Text>
          <Button appearance="ghost" onPress={() => navigation.navigate('SIGNUP')}>
            Cadastre-se
          </Button>
        </Layout>

        {/* Modal de Loading */}
        <Modal visible={loading} backdropStyle={styles.backdrop}>
          <Card disabled>
            <Spinner />
          </Card>
        </Modal>
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    // backgroundColor: '#F7F9FC',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    // backgroundColor: '#F7F9FC',
  },
  logo: {
    height: 60,
    width: 160,
  },
  formContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginVertical: 12,
  },
  continueButton: {
    marginVertical: 12,
  },
  orText: {
    textAlign: 'center',
    marginVertical: 12,
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  socialButton: {
    flex: 0.48,
  },
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default LoginScreen;
