import React, { useState, useContext } from 'react';
import { View, Alert, StyleSheet } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { Input, Button, Icon, Text, CheckBox, TopNavigation, TopNavigationAction, Layout } from '@ui-kitten/components';

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

    console.log('aquiiiii');

    const newCard = { cardNumber, holderName, expirationDate, cvv };

    try {
      await firestore()
        .collection('users')
        .doc(user.email)
        .collection('cards')
        .add(newCard);

      Alert.alert('Sucesso', 'Cartão salvo com sucesso!');

        navigation.navigate('PaymentOptions', { chargerInfo });
      if (chargerInfo) {
      } else {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao salvar cartão:', error);
      Alert.alert('Erro', 'Não foi possível salvar o cartão.');
    }
  };

  const CardNumberIcon = (props) => <Icon {...props} name="credit-card-outline" />;
  const UserIcon = (props) => <Icon {...props} name="person-outline" />;
  const CalendarIcon = (props) => <Icon {...props} name="calendar-outline" />;
  const LockIcon = (props) => <Icon {...props} name="lock-outline" />;

  const BackIcon = (props) => (
    <Icon onPress={() => navigation.goBack()} {...props} name="arrow-back" />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <Layout style={styles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Adicionar Cartão" />
      <View style={styles.content}>
        <Input
          label={"Número do Cartão"}
          value={cardNumber}
          onChangeText={setCardNumber}
          placeholder="0000 0000 0000 0000"
          accessoryLeft={CardNumberIcon}
          keyboardType="numeric"
          style={styles.input}
        />
        <Input
          label={"Nome do Titular"}
          value={holderName}
          onChangeText={setHolderName}
          placeholder="Nome do Titular"
          accessoryLeft={UserIcon}
          style={styles.input}
        />
        <View style={styles.rowContainer}>
          <Input
            label={"Data de Expiração"}
            value={expirationDate}
            onChangeText={setExpirationDate}
            placeholder="MM/AAAA"
            accessoryLeft={CalendarIcon}
            keyboardType="numeric"
            style={[styles.input, styles.halfInput, { marginRight: 8 }]}
          />
          <Input
            label={"CVV"}
            value={cvv}
            onChangeText={setCvv}
            placeholder="CVV"
            accessoryLeft={LockIcon}
            keyboardType="numeric"
            style={[styles.input, styles.halfInput]}
            maxLength={3} // Limita o tamanho do CVV
          />
        </View>
        <Input
          placeholder="Apelido (para fácil identificação)"
          style={styles.input}
        />
        <View style={styles.secureCardContainer}>
          <CheckBox
            checked={secureCard}
            onChange={setSecureCard}
          >
            {/* Usando Text dentro do Checkbox */}
            <Text appearance='hint' category="c2" style={styles.secureText}> {/* Adicione estilo aqui */}
              {' '} {/* Espaçamento entre o checkbox e o texto */}
              Segure este cartão. <Text appearance='hint' category="c2" style={styles.linkText}>Por que isso é importante?</Text>
            </Text>
          </CheckBox>
        </View>
      </View>
      <Button size="large" status="primary" style={styles.button} onPress={() => saveCard()}>
        Adicionar Cartão
      </Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  input: {
    margin: 15,
    borderRadius: 7,
    backgroundColor: 'white',
  },
  rowContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  halfInput: {
    flex: 1,
  },
  button: {
    margin: 16,
  },
  secureCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
  },
  secureText:{
    marginLeft: 8
  },
  linkText:{
    textDecorationLine:'underline'
  }
});

export default AddCardScreen;
