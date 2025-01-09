import React, {useEffect, useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {AuthContext} from '../../context/AuthContext';
import LoadingIndicator from '../../components/LoadingIndicator';
import {commonStyles} from '../../styles/commonStyles';

import {
  Icon,
  TopNavigation,
  TopNavigationAction,
  Text,
  Card,
  List,
  ListItem,
  Layout,
} from '@ui-kitten/components';

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
      navigation.navigate('AddCard', {chargerInfo});
    } else {
      navigation.navigate('LOGIN');
    }
  };

  const BackIcon = props => (
    <Icon onPress={() => navigation.goBack()} {...props} name="arrow-back" />
  );

  const YourCardsIcon = props => <Icon {...props} name="credit-card-outline" />;
  const AddCardIcon = props => <Icon {...props} name="plus-circle-outline" />;
  const WalletsIcon = props => <Icon {...props} name="briefcase-outline" />;
  const NetBankingIcon = props => <Icon {...props} name="globe-2-outline" />;

  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  const paymentOptions = [
    {
      title: 'Seus Cartões',
      description: 'Usados frequentemente',
      icon: YourCardsIcon,
      onPress: () =>
        hasSavedCard
          ? navigation.navigate('SavedCards', {chargerInfo})
          : handleAddCard(),
    },
    {
      title: 'Adicionar novo cartão',
      description: 'Salve e pague com cartões',
      icon: AddCardIcon,
      onPress: handleAddCard,
    },
    {
      title: 'Carteiras',
      description: 'Paytm, PhonePe, Amazon Pay e mais',
      icon: WalletsIcon,
      onPress: () => navigation.navigate('PaymentPix', {chargerInfo}), // Ajuste a navegação conforme necessário
    },
    {
      title: 'Internet Banking',
      description: 'Selecione de uma lista de bancos',
      icon: NetBankingIcon,
      onPress: () => {}, // Adicione a ação de navegação aqui
    },
  ];

  if (loading) {
    return <LoadingIndicator />;
  }

  return (

    <Layout style={styles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Opções de Pagamento" />

      <Divider />

      <View style={styles.cards}>
        <Text category="h6" style={styles.sectionTitle}>
          Cartões de débito e crédito
        </Text>
        <List
          style={styles.list}
          data={paymentOptions.slice(0, 2)}
          ItemSeparatorComponent={Divider}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              description={item.description}
              accessoryLeft={item.icon}
              onPress={item.onPress}
            />
          )}
        />
      </View>
      <View style={styles.others}>
        <Text category="h6" style={[styles.sectionTitle, {marginTop: 20}]}>
          Mais opções de pagamento
        </Text>
        <List
          style={styles.list}
          data={paymentOptions.slice(2)}
          ItemSeparatorComponent={Divider}
          renderItem={({item}) => (
            <ListItem
              title={item.title}
              description={item.description}
              accessoryLeft={item.icon}
              onPress={item.onPress}
            />
          )}
        />
      </View>
    </Layout>
  );
};

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  list: {
    marginHorizontal: 16,
  },
  divider: {
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  cards: {
    margin: 5,
  },
  others: {
    margin: 5
  },
});

export default PaymentOptionsScreen;
