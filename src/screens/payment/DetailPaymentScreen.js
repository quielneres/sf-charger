import {Alert, TouchableOpacity, View, StyleSheet} from 'react-native';
import {commonStyles} from '../../styles/commonStyles';
import React, {useContext, useEffect, useState} from 'react';
import PaymentService from '../../services/PaymentService';
import CreditCardService from '../../services/CreditCardService';
import {AuthContext} from '../../context/AuthContext';
import {useNavigation} from '@react-navigation/native';
import {
  Input,
  Button,
  Icon,
  Text,
  Modal,
  Card,
  Spinner,
  CheckBox,
  TopNavigation,
  TopNavigationAction,
  Layout,
  List,
  ListItem,
  Divider,
} from '@ui-kitten/components';

const DetailPaymentScreen = ({route}) => {
  const {detailsPayment} = route.params;
  const [paymentType, setPaymentType] = useState('');
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  const [startPayment, setStartPayment] = useState(false);

  const [visible, setVisible] = React.useState(false);

  useEffect(() => {
    setPaymentType(detailsPayment.paymentType);
    console.log('detailsPayment', detailsPayment);
  }, [detailsPayment]);

  const sendPayment = async () => {
    const request = {...detailsPayment, user};

    setStartPayment(true);

    setTimeout(() => {
      setVisible(false);
      setStartPayment(false);
      navigation.navigate('DetailSuccessful');
    }, 2000);

    // if (paymentType === 'creditCard') {
    //   const result = await CreditCardService.saveCard(request);
    //   if (result.success) {
    //     console.log('Credit card payment processed successfully');
    //     console.log('Transaction ID:', result.transactionId);
    //     console.log('Status:', result.status);
    //     console.log('Amount:', result.amount);
    //     console.log('Card:', result.card);
    //     Alert.alert('Pagamento Confirmado!');
    //     navigation.navigate('HOME');
    //   } else {
    //     console.error('Credit card payment failed:', result.error);
    //   }
    // }
    //
    // if (paymentType === 'pix') {
    //   const result = await PaymentService.processPixPayment(detailsPayment);
    //   if (result.success) {
    //     console.log('PIX payment processed successfully');
    //     navigation.navigate('HOME');
    //   } else {
    //     console.error('PIX payment failed:', result.error);
    //   }
    // }
  };

  const details = [
    {title: 'Duração', value: '1hr 30min'},
    {title: 'Energia Usada', value: '45kWh'},
    {title: 'Taxa/kWh', value: 'R$ 0,50'},
    {title: 'Valor', value: 'R$ 22,50'},
  ];

  const costsBrakdown = [
    {title: 'Energia', value: 'R$ 22,50'},
    {title: 'Taxa de Serviço', value: 'R$ 2,25'},
    {title: 'Total', value: 'R$ 24,75'},
  ];

  const BackIcon = props => (
    <Icon onPress={() => navigation.goBack()} {...props} name="arrow-back" />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  const LoadingIndicator = props => (
    <View style={[props.style, styles.indicator]}>
      <Spinner size="small" />
    </View>
  );

  const renderItem = ({item, index}) => (
    <ListItem
      style={styles.listItem}
      title={() => (
        <View style={styles.itemContainer}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemValue}>{item.value}</Text>
        </View>
      )}
    />
  );

  return (
    <Layout style={styles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Detalhes do pagamento" />

      <Divider />

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Detalhes</Text>
        <List
          data={details}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />

        <Divider />

        <Text style={styles.sectionTitle}>Custos</Text>
        <List
          data={costsBrakdown}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          size="large"
          status="primary"
          style={styles.button}
          onPress={() => setVisible(true)}>
          Finalizar
        </Button>
      </View>

      <Modal
        visible={visible}
        backdropStyle={styles.backdrop}
        onBackdropPress={() => setVisible(false)}>
        <Card disabled={true} style={styles.cardModal}>

          <Text category="h6">Billing Details</Text>

          <Text style={styles.paymentMethod}>Payment Method</Text>

          <View style={styles.paymentIconsContainer}>
            <Icon style={styles.icon} name="credit-card-outline" />
            <Icon style={styles.icon} name="credit-card-outline" />
            <Icon style={styles.icon} name="credit-card-outline" />
          </View>


          <View style={styles.detailsContainer}>
            <Text category="s1">Energy Cost</Text>
            <Text category="s1">$5.6</Text>
          </View>
          <View style={styles.detailsContainer}>
            <Text category="s1">Sub Total</Text>
            <Text category="s1">$5.6</Text>
          </View>


          {!startPayment ? (
            <>
              <Button style={styles.button} onPress={sendPayment}>
                Confirmar Pagamento
              </Button>

              <Button
                style={styles.button}
                appearance="ghost"
                onPress={() => setVisible(false)}>
                Cancelar
              </Button>
            </>
          ) : (
            <Button
              style={styles.button}
              appearance="outline"
              accessoryLeft={LoadingIndicator}>
              Carregando
            </Button>
          )}
        </Card>
      </Modal>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
    margin: 16,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  listItem: {
    backgroundColor: 'white',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemTitle: {
    fontSize: 16,
    color: '#333',
  },

  paymentIconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 10,
  },

  icon: {
    width: 32,
    height: 32,
  },
  itemValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 8,
  },
  buttonContainer: {
    padding: 16,
  },
  button: {
    margin: 16,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cardModal: {
    width: 350,
  },
});

export default DetailPaymentScreen;
