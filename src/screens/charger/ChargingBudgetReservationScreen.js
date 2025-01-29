import React from 'react';
import { Layout, Text, Input, Button, Toggle } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const ChargingBudgetReservationScreen = () => {
  const [budget, setBudget] = React.useState('');
  const [isEveryday, setIsEveryday] = React.useState(false);

  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>Charging Budget Reservation</Text>
      <Input
        style={styles.input}
        placeholder="Target Budget ($)"
        value={budget}
        onChangeText={setBudget}
      />
      <Toggle
        checked={isEveryday}
        onChange={setIsEveryday}
        style={styles.toggle}>
        Enable "Every Day"
      </Toggle>
      <Button style={styles.button}>Save</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 16 },
  input: { marginBottom: 16 },
  toggle: { marginBottom: 32 },
  button: { alignSelf: 'center', width: '50%' },
});

export default ChargingBudgetReservationScreen;
