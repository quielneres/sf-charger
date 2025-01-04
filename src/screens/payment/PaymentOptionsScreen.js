import React, {useEffect, useState, useContext} from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import BackButton from '../../components/BackButton';
import LoadingIndicator from '../../components/LoadingIndicator';
import {commonStyles} from '../../styles/commonStyles';

const PaymentOptionsScreen = ({route}) => {
  const {chargerInfo} = route.params;
  const [hasSavedCard, setHasSavedCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const {isLoggedIn} = useContext(AuthContext);

  useEffect(() => {
    const checkSavedCards = async () => {
      try {
        const savedCards = await AsyncStorage.getItem('savedCards');
        setHasSavedCard(savedCards !== null);
      } catch (error) {
        console.error('Error checking saved cards:', error);
      } finally {
        setLoading(false);
      }
    };
    checkSavedCards();
  }, []);

  const handleAddCard = () => {
    if (isLoggedIn) {
      navigation.navigate('CreateCard', {chargerInfo});
    } else {
      navigation.navigate('LOGIN');
    }
  };

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
    <View style={commonStyles.container}>
      <BackButton />
      <Text style={commonStyles.title}>Escolha o método de pagamento:</Text>

      <TouchableOpacity
        style={commonStyles.buttonWrapper}
        onPress={() => navigation.navigate('PaymentPix', {chargerInfo})}>
        <Text style={commonStyles.buttonText}>Pagar com PIX</Text>
      </TouchableOpacity>

      {hasSavedCard && (

        <TouchableOpacity
          style={commonStyles.buttonWrapper}
          onPress={() => navigation.navigate('SavedCards', { chargerInfo })}>
          <Text style={commonStyles.buttonText}>Pagar com Cartão Salvo</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={commonStyles.buttonWrapper}
        onPress={handleAddCard}>
        <Text style={commonStyles.buttonText}>Cadastrar Novo Cartão</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PaymentOptionsScreen;
