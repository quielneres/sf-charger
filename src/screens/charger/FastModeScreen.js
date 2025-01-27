import React from 'react';
import { Layout, Text, Button } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';
import {Header} from "../../components/Header";

export const FastModeScreen = ({ navigation }) => {
  return (
      <Layout style={styles.container}>
        <Header title="Fast Mode" onBackPress={() => navigation.goBack()} />
        <Text style={styles.description}>
          Charge your car at maximum power. Ideal for when you're in a hurry!
        </Text>
        <Button style={styles.button}>Start Charging</Button>
      </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  description: { fontSize: 16, marginBottom: 32, textAlign: 'center' },
  button: { alignSelf: 'center', width: '50%' },
});
