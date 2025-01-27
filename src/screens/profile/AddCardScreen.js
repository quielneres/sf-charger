import React, { useState, useContext } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {
  Input,
  Button,
  Icon,
  Text,
  CheckBox,
  TopNavigation,
  TopNavigationAction,
  Layout,
  Divider,
} from '@ui-kitten/components';
import { AuthContext } from '../../context/AuthContext';

const AddCardScreen = ({ route }) => {
  const { chargerInfo } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();
  const [secureCard, setSecureCard] = useState(false);

  const saveCard = async () => {
    if (!cardNumber || !holderName || !expirationDate || !cvv) {
      Alert.alert('Erro', 'Todos os campos são obrigatórios.');
      return;
    }

    const newCard = { cardNumber, holderName, expirationDate, cvv };

    try {
      await firestore()
          .collection('users')
          .doc(user.email)
          .collection('cards')
          .add(newCard);

      Alert.alert('Sucesso', 'Cartão salvo com sucesso!');
      navigation.navigate('PaymentOptions', { chargerInfo });
    } catch (error) {
      console.error('Erro ao salvar cartão:', error);
      Alert.alert('Erro', 'Não foi possível salvar o cartão.');
    }
  };

  const BackIcon = (props) => (
      <Icon {...props} name="arrow-back" onPress={() => navigation.goBack()} />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  const CardNumberIcon = (props) => <Icon {...props} name="credit-card-outline" />;
  const UserIcon = (props) => <Icon {...props} name="person-outline" />;
  const CalendarIcon = (props) => <Icon {...props} name="calendar-outline" />;
  const LockIcon = (props) => <Icon {...props} name="lock-outline" />;

  return (
      <Layout style={styles.container}>
        <TopNavigation accessoryLeft={BackAction} title="Adicionar Cartão" alignment="center" />
        <Divider />
        <Layout style={styles.content}>
          <Input
              label="Número do Cartão"
              value={cardNumber}
              onChangeText={setCardNumber}
              placeholder="0000 0000 0000 0000"
              accessoryLeft={CardNumberIcon}
              keyboardType="numeric"
              style={styles.input}
          />
          <Input
              label="Nome do Titular"
              value={holderName}
              onChangeText={setHolderName}
              placeholder="Nome do Titular"
              accessoryLeft={UserIcon}
              style={styles.input}
          />
          <View style={styles.rowContainer}>
            <Input
                label="Data de Expiração"
                value={expirationDate}
                onChangeText={setExpirationDate}
                placeholder="MM/AAAA"
                accessoryLeft={CalendarIcon}
                keyboardType="numeric"
                style={[styles.input, styles.halfInput, { marginRight: 8 }]}
            />
            <Input
                label="CVV"
                value={cvv}
                onChangeText={setCvv}
                placeholder="CVV"
                accessoryLeft={LockIcon}
                keyboardType="numeric"
                style={[styles.input, styles.halfInput]}
                maxLength={3}
            />
          </View>
          <Input
              label="Apelido"
              placeholder="Ex: Cartão Pessoal"
              style={styles.input}
          />
          <View style={styles.checkboxContainer}>
            <CheckBox checked={secureCard} onChange={setSecureCard}>
              Guardar este cartão. <Text style={styles.linkText}>Por que isso?</Text>
            </CheckBox>
          </View>
        </Layout>
        <Button size="large" style={styles.button} onPress={saveCard}>
          Adicionar Cartão
        </Button>
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  input: {
    marginBottom: 16,
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    flex: 1,
  },
  checkboxContainer: {
    marginTop: 16,
    paddingHorizontal: 8,
  },
  button: {
    margin: 16,
    borderRadius: 8,
  },
  linkText: {
    textDecorationLine: 'underline',
    color: '#3366FF',
  },
});

export default AddCardScreen;
