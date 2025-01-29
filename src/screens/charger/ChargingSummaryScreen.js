import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';

const ChargingSummaryScreen = () => {
  return (
    <Layout style={styles.container}>
      <Text category="h1" style={styles.title}>Charging Summary</Text>
      <Text style={styles.description}>Session completed. Check your usage and costs.</Text>
      <Button style={styles.button}>View Summary</Button>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  title: { textAlign: 'center', marginBottom: 16 },
  description: { textAlign: 'center', marginBottom: 32 },
  button: { alignSelf: 'center', width: '50%' },
});

export default ChargingSummaryScreen;
