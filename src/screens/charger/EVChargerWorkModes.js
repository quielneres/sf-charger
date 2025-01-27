import React from 'react';
import { Layout, Text, Card, Button } from '@ui-kitten/components';
import { StyleSheet, View } from 'react-native';

const EVChargerWorkModes = ({ navigation }) => {
  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>EV Charger Work Modes</Text>

      <Card style={styles.card} onPress={() => navigation.navigate('FastMode')}>
        <Text category="h5">Fast Mode</Text>
        <Text>Plug & Charge</Text>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate('TimeReservation')}>
        <Text category="h5">Time Reservation</Text>
        <Text>Schedule a charging session</Text>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate('CapacityReservation')}>
        <Text category="h5">Charging Capacity Reservation</Text>
        <Text>Set target charging capacity</Text>
      </Card>

      <Card style={styles.card} onPress={() => navigation.navigate('BudgetReservation')}>
        <Text category="h5">Charging Budget Reservation</Text>
        <Text>Set target charging budget</Text>
      </Card>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    marginBottom: 16,
    textAlign: 'center',
  },
  card: {
    marginVertical: 8,
    padding: 16,
  },
});

export default EVChargerWorkModes;
