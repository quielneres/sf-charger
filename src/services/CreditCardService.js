import axios from 'axios';
import {Alert} from 'react-native';
import {Buffer} from 'buffer';

global.Buffer = global.Buffer || Buffer;

const CreditCardService = {
  saveCard: async detailsPayment => {
    const expirationDate = detailsPayment.card.expirationDate;
    const [expMonth, expYear] = expirationDate.split('/');

    const data = {
      items: [
        {
          amount: 2550,
          description: 'Recarga veicular',
          quantity: 1,
        },
      ],
      customer: {
        name: 'Ezequiel Neres',
        email: detailsPayment.user.email,
      },
      payments: [
        {
          payment_method: 'credit_card',
          credit_card: {
            recurrence_cycle: 'first',
            installments: 1,
            statement_descriptor: 'SOL FORT',
            card: {
              number: '4000000000000010',
              holder_name: detailsPayment.card.holderName,
              exp_month: expMonth,
              exp_year: expYear,
              cvv: detailsPayment.card.cvv,
              billing_address: {
                line_1: '10880, Malibu Point, Malibu Central',
                zip_code: '90265',
                city: 'Malibu',
                state: 'CA',
                country: 'US',
              },
            },
          },
        },
      ],
    };
    try {
      const apiKey = 'sk_test_f47318ced13b44b1a987f089ea10ee63';
      const response = await axios.post(
        'https://api.pagar.me/core/v5/orders',
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization:
              'Basic ' + Buffer.from(`${apiKey}:`).toString('base64'),
          },
        },
      );

      const transaction = response.data.charges[0].last_transaction;
      return {
        success: true,
        transactionId: transaction.id,
        status: transaction.status,
        amount: transaction.amount,
        card: transaction.card,
      };
    } catch (error) {
      console.error('Erro ao criar pagamento:', error);
      Alert.alert('Erro', 'Não foi possível criar o pagamento.');
      return {success: false, error};
    }
  },
};

export default CreditCardService;
