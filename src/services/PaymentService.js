import CreditCardService from './CreditCardService';
import PixService from './PixService';

const PaymentService = {
  processCreditCardPayment: async (userEmail, cardData) => {
    return await CreditCardService.saveCard(userEmail, cardData);
  },

  processPixPayment: async (paymentData) => {
    return await PixService.processPayment(paymentData);
  },

  // Add other payment methods here
};

export default PaymentService;
