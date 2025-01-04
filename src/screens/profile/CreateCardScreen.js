import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Alert, StyleSheet, TouchableOpacity } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import BackButton from '../../components/BackButton';
import { commonStyles } from '../../styles/commonStyles';
import { colors } from '../../utils/colors';

const CreateCardScreen = ({ route }) => {
  const { chargerInfo } = route.params;
  const [cardNumber, setCardNumber] = useState('');
  const [holderName, setHolderName] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [cvv, setCvv] = useState('');
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

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

      if (chargerInfo) {
        navigation.navigate('PaymentOptions', { chargerInfo });
      } else {
        navigation.goBack();
      }
    } catch (error) {
      console.error('Erro ao salvar cartão:', error);
      Alert.alert('Erro', 'Não foi possível salvar o cartão.');
    }
  };

  return (
    <View style={commonStyles.container}>
      <BackButton />
      <View style={commonStyles.textContainer}>
        <Text style={commonStyles.headingText}>Cadastrar Novo Cartão</Text>
      </View>
      <View style={commonStyles.formContainer}>
        <View style={commonStyles.inputContainer}>
          <TextInput
            style={commonStyles.textInput}
            placeholder="Número do Cartão"
            placeholderTextColor={colors.secondary}
            value={cardNumber}
            onChangeText={setCardNumber}
          />
        </View>
        <View style={commonStyles.inputContainer}>
          <TextInput
            style={commonStyles.textInput}
            placeholder="Nome do Titular"
            value={holderName}
            onChangeText={setHolderName}
          />
        </View>
        <View style={commonStyles.inputContainer}>
          <TextInput
            style={commonStyles.textInput}
            placeholder="MM/AA"
            value={expirationDate}
            onChangeText={setExpirationDate}
          />
        </View>
        <View style={commonStyles.inputContainer}>
          <TextInput
            style={commonStyles.textInput}
            placeholder="CVV"
            keyboardType="numeric"
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
        <TouchableOpacity
          style={commonStyles.buttonWrapper}
          onPress={saveCard}>
          <Text style={commonStyles.buttonText}>Salvar Cartão</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CreateCardScreen;
