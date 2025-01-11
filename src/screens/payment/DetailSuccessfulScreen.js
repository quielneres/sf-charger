import {Alert, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
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

const DetailSuccessfulScreen = () => {
  const [paymentType, setPaymentType] = useState('');
  const {user} = useContext(AuthContext);
  const navigation = useNavigation();

  const [startPayment, setStartPayment] = useState(false);

  const [visible, setVisible] = React.useState(false);





  const details = [
    {title: 'ID da transação', value: '**** **** **** 1234'},
    {title: 'Hora', value: '12:00'},
    {title: 'Data', value: '12/12/2021'},
    {title: 'Método de Pagamento', value: 'Cartão de Crédito'},
    {title: 'ID da sessão', value: '123456'},
    {title: 'Valor Total', value: 'R$ 22,50'},
  ];



  const BackIcon = props => (
    <Icon onPress={() => navigation.goBack()} {...props} name="arrow-ios-back-outline" />
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

        <View style={styles.headerContainer}>
          <Image
            style={styles.avatar}
            source={{uri: 'https://socialidiomas.com.br/main/wp-content/uploads/2024/02/png-transparent-computer-icons-icon-design-business-success-miscellaneous-angle-text-thumbnail.png'}}
          />
          <Text category="h6">Pagamento bem Sucedido</Text>
          <Text category="s1" appearance="hint">
            Pagamento de: R$ 22,50
          </Text>
        </View>


        <Text style={styles.sectionTitle}>Detalhes</Text>
        <List
          data={details}
          ItemSeparatorComponent={Divider}
          renderItem={renderItem}
        />

      </View>

      <Button style={styles.button} onPress={() => navigation.navigate('HOME')}>
        Ir para a Home
      </Button>


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



  headerContainer: {
    alignItems: 'center',
    padding: 20,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
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
    // color: '#000000',
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

export default DetailSuccessfulScreen;
