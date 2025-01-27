import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import LoadingIndicator from '../../components/LoadingIndicator';
import {
  Layout,
  Text,
  List,
  ListItem,
  TopNavigation,
  TopNavigationAction,
  Icon,
  Divider,
  Button,
} from '@ui-kitten/components';

const PaymentOptionsScreen = ({ route }) => {
  const { chargerInfo } = route.params;
  const [hasSavedCard, setHasSavedCard] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const { isLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    const checkSavedCards = async () => {
      try {
        const savedCards = await AsyncStorage.getItem('savedCards');
        setHasSavedCard(savedCards !== null);
      } catch (error) {
        console.error('Erro ao verificar cartões salvos:', error);
      } finally {
        setLoading(false);
      }
    };
    checkSavedCards();
  }, []);

  const handleAddCard = () => {
    if (isLoggedIn) {
      navigation.navigate('AddCard', { chargerInfo });
    } else {
      navigation.navigate('LOGIN');
    }
  };

  const BackIcon = (props) => (
      <Icon {...props} name="arrow-back" onPress={() => navigation.goBack()} />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  const paymentOptions = [
    {
      title: 'Seus Cartões',
      description: 'Usados frequentemente',
      icon: (props) => <Icon {...props} name="credit-card-outline" />,
      onPress: () =>
          hasSavedCard
              ? navigation.navigate('SavedCards', { chargerInfo })
              : handleAddCard(),
    },
    {
      title: 'Adicionar Novo Cartão',
      description: 'Salve e pague com cartões',
      icon: (props) => <Icon {...props} name="plus-circle-outline" />,
      onPress: handleAddCard,
    },
    {
      title: 'PIX',
      description: 'Pagamento com PIX',
      icon: (props) => <Icon {...props} name="globe-2-outline" />,
      onPress: () => navigation.navigate('PaymentPix', { chargerInfo }),
    },
    {
      title: 'Carteiras',
      description: 'Paytm, PhonePe, Amazon Pay e mais',
      icon: (props) => <Icon {...props} name="briefcase-outline" />,
      onPress: () => {},
    },
    {
      title: 'Internet Banking',
      description: 'Selecione de uma lista de bancos',
      icon: (props) => <Icon {...props} name="globe-2-outline" />,
      onPress: () => {},
    },
  ];

  if (loading) {
    return <LoadingIndicator />;
  }

  return (
      <Layout style={styles.container}>
        <TopNavigation
            accessoryLeft={BackAction}
            title="Opções de Pagamento"
            alignment="center"
        />

        <Divider />

        {/* Cartões */}
        <View style={styles.section}>
          <Text category="h6" style={styles.sectionTitle}>
            Cartões de Débito e Crédito
          </Text>
          <List
              style={styles.list}
              data={paymentOptions.slice(0, 2)}
              ItemSeparatorComponent={Divider}
              renderItem={({ item }) => (
                  <ListItem
                      title={item.title}
                      description={item.description}
                      accessoryLeft={item.icon}
                      onPress={item.onPress}
                      style={styles.listItem}
                  />
              )}
          />
        </View>

        {/* Outras opções */}
        <View style={styles.section}>
          <Text category="h6" style={styles.sectionTitle}>
            Outras Opções de Pagamento
          </Text>
          <List
              style={styles.list}
              data={paymentOptions.slice(2)}
              ItemSeparatorComponent={Divider}
              renderItem={({ item }) => (
                  <ListItem
                      title={item.title}
                      description={item.description}
                      accessoryLeft={item.icon}
                      onPress={item.onPress}
                      style={styles.listItem}
                  />
              )}
          />
        </View>

        <Button
            style={styles.homeButton}
            onPress={() => navigation.navigate('HOME')}
        >
          Voltar para a Home
        </Button>
      </Layout>
  );
};

export default PaymentOptionsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    marginHorizontal: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  list: {
    marginHorizontal: 16,
  },
  listItem: {
    borderRadius: 8,
    marginBottom: 8,
  },
  homeButton: {
    marginHorizontal: 16,
    marginTop: 20,
    borderRadius: 8,
  },
});
