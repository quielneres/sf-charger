import { Alert, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { commonStyles } from '../../styles/commonStyles';
import React, { useContext, useEffect, useState } from 'react';
import PaymentService from '../../services/PaymentService';
import CreditCardService from '../../services/CreditCardService';
import { AuthContext } from '../../context/AuthContext';
import { useNavigation } from '@react-navigation/native';

const DetailPaymentScreen = ({ route }) => {
  const { detailsPayment } = route.params;
  const [paymentType, setPaymentType] = useState('');
  const { user } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    setPaymentType(detailsPayment.paymentType);
    console.log('detailsPayment', detailsPayment);
  }, [detailsPayment]);

  const sendPayment = async () => {
    const request = { ...detailsPayment, user };

    if (paymentType === 'creditCard') {

      const result = await CreditCardService.saveCard(request);
      if (result.success) {
        console.log('Credit card payment processed successfully');
        console.log('Transaction ID:', result.transactionId);
        console.log('Status:', result.status);
        console.log('Amount:', result.amount);
        console.log('Card:', result.card);
        Alert.alert('Pagamento Confirmado!');
        navigation.navigate('HOME');
      } else {
        console.error('Credit card payment failed:', result.error);
      }
    }

    if (paymentType === 'pix') {
      const result = await PaymentService.processPixPayment(detailsPayment);
      if (result.success) {
        console.log('PIX payment processed successfully');
        navigation.navigate('HOME');
      } else {
        console.error('PIX payment failed:', result.error);
      }
    }
  };

  return (
    <View style={commonStyles.container}>
      <Text style={commonStyles.title}>Detalhes do pagamento:</Text>
      {paymentType === 'creditCard' && (
        <View style={styles.cardContainer}>
          <Text style={styles.cardNumber}>**** **** **** {detailsPayment?.card.cardNumber.slice(-4)}</Text>
          <Text style={styles.cardHolderName}>{detailsPayment?.card.holderName}</Text>
          <Text style={styles.expirationDate}>Expira em: {detailsPayment?.card.expirationDate}</Text>
        </View>
      )}

      {paymentType === 'pix' && <Text style={commonStyles.text}>PIX</Text>}

      <Text style={commonStyles.text}>Valor</Text>
      <Text style={styles.amount}>R$ {detailsPayment?.value}</Text>

      <TouchableOpacity
        style={commonStyles.buttonWrapper}
        onPress={() => sendPayment()}
      >
        <Text style={commonStyles.buttonText}>Finalizar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 5,
    alignItems: 'center',
  },
  cardNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardHolderName: {
    fontSize: 16,
    marginBottom: 10,
  },
  expirationDate: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
});

export default DetailPaymentScreen;
