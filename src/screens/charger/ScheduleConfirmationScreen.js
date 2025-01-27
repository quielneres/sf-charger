import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const ScheduleConfirmationScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>Schedule Confirmation</Text>
      <Text style={styles.description}>Your charging schedule has been confirmed successfully.</Text>
      <Button style={styles.button}>Done</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 16 },
  description: { textAlign: 'center', marginBottom: 32 },
  button: { alignSelf: 'center', width: '50%' },
});

export default ScheduleConfirmationScreen;
