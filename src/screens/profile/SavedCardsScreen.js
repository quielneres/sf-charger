import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../../context/AuthContext';
import {commonStyles} from '../../styles/commonStyles';
import BackButton from '../../components/BackButton';
import {
  Input,
  Button,
  Icon,
  Text,
  CheckBox,
  TopNavigation,
  TopNavigationAction,
  Layout,
} from '@ui-kitten/components';

const SavedCardsScreen = ({navigation, route}) => {
  const {chargerInfo} = route.params;
  const [savedCards, setSavedCards] = useState([]);
  const {user} = useContext(AuthContext);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const cardsSnapshot = await firestore()
          .collection('users')
          .doc(user.email)
          .collection('cards')
          .get();

        const cards = cardsSnapshot.docs.map(doc => doc.data());
        setSavedCards(cards);
      } catch (error) {
        console.error('Error fetching saved cards:', error);
      }
    };
    fetchCards();
  }, [user.email]);

  const handlePayment = card => {
    // Alert.alert('Pagamento Confirmado!', `Cartão: **** **** **** ${card.cardNumber.slice(-4)}`);
    const detailsPayment = {...chargerInfo, paymentType: 'creditCard', card};
    navigation.navigate('DetailPayment', {detailsPayment});
  };

  const BackIcon = props => (
    <Icon onPress={() => navigation.goBack()} {...props} name="arrow-back" />
  );
  const BackAction = () => <TopNavigationAction icon={BackIcon} />;

  return (
    <Layout style={commonStyles.container}>
      <TopNavigation accessoryLeft={BackAction} title="Cartões Salvos:" />

      <View style={styles.block}>
      <FlatList
        data={savedCards}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View style={styles.card}>
            <Text>**** **** **** {item.cardNumber.slice(-4)}</Text>

            <Button size="large" status="primary" style={styles.button} onPress={() => handlePayment(item)}>
              Usar Este Cartão
            </Button>

          </View>
        )}
      />

      </View>

    </Layout>
  );
};

const styles = StyleSheet.create({
  block: {
    margin: 16
  },
  card: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
});

export default SavedCardsScreen;
