import React, { useState, useEffect, useContext } from 'react';
import {View, Text, FlatList, Button, Alert, StyleSheet, TouchableOpacity} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { AuthContext } from '../../context/AuthContext';
import { commonStyles } from '../../styles/commonStyles';
import BackButton from '../../components/BackButton';

const SavedCardsScreen = ({ navigation, route }) => {
    const { chargerInfo } = route.params;
    const [savedCards, setSavedCards] = useState([]);
    const { user } = useContext(AuthContext);

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

    const handlePayment = (card) => {
        Alert.alert('Pagamento Confirmado!', `Cartão: **** **** **** ${card.cardNumber.slice(-4)}`);
        navigation.navigate('PaymentOptions', { chargerInfo });
    };

    return (
      <View style={commonStyles.container}>
          <BackButton />
          <Text style={commonStyles.title}>Escolha um Cartão Salvo:</Text>
          <FlatList
            data={savedCards}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.card}>
                  <Text>**** **** **** {item.cardNumber.slice(-4)}</Text>
                  {/*<Button title="Usar Este Cartão" onPress={() => handlePayment(item)} />*/}


                  <TouchableOpacity
                    style={commonStyles.buttonWrapper}
                    onPress={() => handlePayment(item)}>
                      <Text style={commonStyles.buttonText}>Usar Este Cartão</Text>
                  </TouchableOpacity>
              </View>
            )}
          />
      </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
});

export default SavedCardsScreen;
